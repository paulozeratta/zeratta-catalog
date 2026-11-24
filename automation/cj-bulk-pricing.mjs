// Zeratta CJ batch pricing pilot. Node.js 20+. Read-only: never lists or orders products.
import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import assert from 'node:assert/strict';
const BASE='https://developers.cjdropshipping.com/api2.0/v1';
export const defaults=Object.freeze({cpa:20,stripePct:5.99,stripeFixed:0,taxPct:0,reserve:0,targetProfit:12,shippingCharged:6.99,freeShippingThreshold:119,ending:0.99,maxDays:11,maxPrice:49.99});
const round=n=>Math.round((n+Number.EPSILON)*100)/100;
function numeric(n,name){if(n===null||n===undefined||n===''||!Number.isFinite(Number(n))||Number(n)<0)throw Error('Invalid '+name);return Number(n)}
export function price(productCost, freight, settings={}){
 const s={...defaults,...settings};
 for(const k of Object.keys(defaults))s[k]=numeric(s[k],k);
 if(s.ending>=1||s.freeShippingThreshold<=0||s.maxDays<=0)throw Error('Invalid pricing policy');
 const cost=numeric(productCost,'product cost')+numeric(freight,'freight');
 const rate=1-(s.stripePct+s.taxPct)/100;
 if(rate<=0)throw Error('Percentage charges must total less than 100%');
 const raw=(cost+s.cpa+s.stripeFixed+s.reserve+s.targetProfit)/rate;
 const up=x=>round(Math.max(s.ending,Math.ceil(x-s.ending-1e-9)+s.ending));
 let shippingCharged=s.shippingCharged, sale=up(raw-shippingCharged);
 if(sale>=s.freeShippingThreshold){shippingCharged=0;sale=up(raw)}
 const revenue=sale+shippingCharged;
 const profit=revenue*rate-cost-s.cpa-s.stripeFixed-s.reserve;
 return {sale,shippingCharged,cost:round(cost),profit:round(profit),marginPct:round(profit/revenue*100),review:sale>s.maxPrice?'ABOVE_PRICE_RANGE':null};
}
export function parseProducts(text){
 const map=new Map();
 const rx=/https?:\/\/(?:www\.)?cjdropshipping\.com\/product\/[^\s"',<>]+?-p-([a-z\d-]+)\.html/gi;
 for(const m of text.matchAll(rx)){const pid=m[1].toUpperCase();if(!map.has(pid))map.set(pid,{pid,url:m[0]})}
 return [...map.values()];
}
function maxDays(s){const m=String(s??'').trim().match(/^(\d+)(?:\s*[-–~]\s*(\d+))?\s*(?:days?)?$/i);return m?Math.max(Number(m[1]),Number(m[2]??m[1])):Infinity}
export function selectFreight(quotes,settings={}){
 const s={...defaults,...settings};
 const candidates=[];
 for(const q of quotes??[]){
  if(!q.logisticName||maxDays(q.logisticAging)>s.maxDays)continue;
  try{
   const freight=q.totalPostageFee==null?numeric(q.logisticPrice,'freight')+numeric(q.taxesFee??0,'taxes fee')+numeric(q.clearanceOperationFee??0,'clearance fee'):numeric(q.totalPostageFee,'total postage');
   candidates.push({method:q.logisticName,days:q.logisticAging,freight:round(freight),tracking:'UNVERIFIED'});
  }catch{continue}
 }
 candidates.sort((a,b)=>Number(/yun\s*express/i.test(b.method))-Number(/yun\s*express/i.test(a.method))||a.freight-b.freight);
 return candidates[0]??null;
}
class CJ {
 constructor(){this.last=0;this.token=process.env.CJ_ACCESS_TOKEN}
 async request(path,{body,auth=true}={}){
  const delay=Math.max(0,1100-(Date.now()-this.last));if(delay)await new Promise(r=>setTimeout(r,delay));
  this.last=Date.now();
  const headers={'Content-Type':'application/json'};
  if(auth){if(!this.token)throw Error('CJ access token missing');headers['CJ-Access-Token']=this.token}
  const response=await fetch(BASE+path,{method:body===undefined?'GET':'POST',headers,body:body===undefined?undefined:JSON.stringify(body),signal:AbortSignal.timeout(30000)});
  if(!response.ok)throw Error('CJ HTTP '+response.status);
  const data=await response.json();if(data.code!==200||data.result===false)throw Error('CJ API '+String(data.code)+' requestId '+String(data.requestId??''));
  return data.data;
 }
 async authenticate(){
  if(this.token)return;
  if(!process.env.CJ_API_KEY)throw Error('Configure CJ_API_KEY securely in the execution environment');
  const data=await this.request('/authentication/getAccessToken',{auth:false,body:{apiKey:process.env.CJ_API_KEY}});
  if(!data?.accessToken)throw Error('CJ authentication did not return an access token');this.token=data.accessToken;
 }
 async variants(pid){return this.request('/product/variant/query?pid='+encodeURIComponent(pid))}
 async freight(vid,zip){return this.request('/logistic/freightCalculate',{body:{startCountryCode:'CN',endCountryCode:'US',...(zip?{zip}:{}),products:[{vid,quantity:1}]}})}
}
async function run(){
 if(process.argv.includes('--self-test')){
  assert.equal(price(2.60,5.24).sale,35.99);
  assert.equal(price(2.60,5.24).profit,12.57);
  assert.equal(price(120,0).shippingCharged,0);
  assert.throws(()=>price(null,5));
  assert.equal(selectFreight([{logisticName:'Slow',logisticAging:'5-15',logisticPrice:1}]),null);
  assert.equal(selectFreight([{logisticName:'LuWei',logisticAging:'5-11',logisticPrice:5.24}]).freight,5.24);
  assert.equal(parseProducts('https://www.cjdropshipping.com/product/test-p-123.html https://www.cjdropshipping.com/product/copy-p-123.html').length,1);
  console.log('Local pricing self-tests passed');return;
 }
 const file=process.argv[2];if(!file)throw Error('Usage: node cj-bulk-pricing.mjs links.txt [limit] (or --self-test)');
 const limit=Number(process.argv[3]??5);if(!Number.isInteger(limit)||limit<1)throw Error('Invalid batch limit');
 const products=parseProducts(await readFile(file,'utf8')).slice(0,limit);
 if(!products.length)throw Error('No CJ product URLs found');
 const cj=new CJ();await cj.authenticate();
 const results=[];
 for(const p of products){
  const result={...p,status:'REVIEW_REQUIRED',variants:[]};
  try{
   const variants=await cj.variants(p.pid);
   if(!Array.isArray(variants)||!variants.length)throw Error('No variants returned');
   for(const v of variants){
    const row={vid:v.vid,sku:v.variantSku,option:v.variantKey};
    try{
     if(!v.vid||!v.variantSku)throw Error('Missing variant identity');
     row.productCost=numeric(v.variantSellPrice,'CJ variant cost');
     row.shipping=selectFreight(await cj.freight(v.vid,process.env.CJ_US_ZIP));
     if(!row.shipping)throw Error('No eligible shipping quote');
     row.pricing=price(row.productCost,row.shipping.freight);
    }catch(e){row.error=e.message}
    result.variants.push(row);
   }
  }catch(e){result.error=e.message}
  results.push(result);
 }
 console.log(JSON.stringify({mode:'READ_ONLY',quotedAt:new Date().toISOString(),settings:defaults,products:results},null,2));
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href)run().catch(e=>{console.error(e.message);process.exitCode=1});
