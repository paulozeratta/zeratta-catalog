// Node 22+, server-side only. Never run inside GitHub Pages.
import { readFile, writeFile } from "node:fs/promises";
import { price, money, pidFromLink, commonQuotes } from "./pricing.mjs";
const BASE="https://developers.cjdropshipping.com/api2.0/v1";
const pause=ms=>new Promise(r=>setTimeout(r,ms));
export class CJ {
  constructor({apiKey=process.env.CJ_API_KEY,token=process.env.CJ_ACCESS_TOKEN}={}) {
    this.key=apiKey; this.token=token; this.last=0;
    if(!this.key&&!this.token) throw Error("Missing CJ_API_KEY or CJ_ACCESS_TOKEN");
  }
  async call(path, body, auth=true) {
    if(auth&&!this.token) await this.authenticate();
    await pause(Math.max(0,1100-(Date.now()-this.last))); this.last=Date.now();
    const response=await fetch(BASE+path,{method:body===undefined?"GET":"POST",headers:{"Content-Type":"application/json",...(auth?{"CJ-Access-Token":this.token}:{})},...(body===undefined?{}:{body:JSON.stringify(body)}),signal:AbortSignal.timeout(30000),redirect:"error"});
    let result; try {result=await response.json();} catch {throw Error("CJ HTTP "+response.status);}
    if(!response.ok||result.code!==200||result.success===false||result.result===false){
      const e=Error("CJ error "+String(result.code||response.status)+" (request "+String(result.requestId||"unknown")+")");e.code=result.code;throw e;
    }
    return result.data;
  }
  async authenticate(){
    if(!this.key)throw Error("Missing CJ_API_KEY");
    const data=await this.call("/authentication/getAccessToken",{apiKey:this.key},false);
    if(!data?.accessToken)throw Error("CJ returned no token");
    this.token=data.accessToken;
  }
  async shops(){return this.call("/shop/getShops");}
  async detail(pid){return this.call("/product/productDetail/query",{id:pid});}
  async freight(vid,zip){return this.call("/logistic/freightCalculate",{startCountryCode:"CN",endCountryCode:"US",...(zip?{zip}:{}),products:[{quantity:1,vid}]});}
}
const categories=["Sunglasses","Wallets","Belts","Caps"];
export function sheetProducts(rows){
  const columns=(rows[0]||[]).map((v,i)=>({i,category:categories.find(c=>c.toUpperCase()===String(v).trim().toUpperCase())})).filter(c=>c.category);
  if(!columns.length)throw Error("No accessory headers found");
  const seen=new Set(),items=[];
  for(const row of rows.slice(1))for(const {i,category} of columns){
    if(!row[i])continue;const url=String(row[i]).trim(),pid=pidFromLink(url);
    if(seen.has(pid))continue;seen.add(pid);items.push({pid,url,category});
  }
  return items;
}
export async function googleRows(){
  const token=process.env.GOOGLE_ACCESS_TOKEN,id=process.env.GOOGLE_SHEET_ID;
  if(!token||!id)throw Error("Google Sheets access token and sheet ID required for direct reading; alternatively use a local rows.json");
  const range=encodeURIComponent("Accs!A1:ZZ");
  const r=await fetch("https://sheets.googleapis.com/v4/spreadsheets/"+encodeURIComponent(id)+"/values/"+range,{headers:{Authorization:"Bearer "+token},signal:AbortSignal.timeout(30000),redirect:"error"});
  if(!r.ok)throw Error("Google Sheets HTTP "+r.status);
  return (await r.json()).values;
}
export async function quoteProduct(cj,item,policy){
  const d=await cj.detail(item.pid);
  if(String(d?.id).toUpperCase()!==item.pid||String(d.saleStatus)!=="3")throw Error("Product not confirmed on sale");
  if(d.currency && d.currency!=="USD")throw Error("Currency not USD");
  const v=d.stanProducts;
  if(!Array.isArray(v)||!v.length||v.length>100)throw Error("Unsupported variant count");
  if(new Set(v.map(x=>String(x.id))).size!==v.length||new Set(v.map(x=>x.sku)).size!==v.length)throw Error("Duplicate variants or SKUs");
  const candidates=[];
  for(const x of v){
    if(!x.id||!x.sku)throw Error("Missing variant identifiers");
    const inventories=d.variantInventory?.find(i=>String(i.vid)===String(x.id))?.inventory;
    if(!inventories?.some(i=>i.countryCode==="CN"&&Number(i.totalInventory)>0))throw Error("CN stock not confirmed: "+x.sku);
    const cost=money(x.sellprice);
    const quotes=await cj.freight(String(x.id),policy.zip);
    if(!Array.isArray(quotes)||!quotes.length)throw Error("No quote: "+x.sku);
    candidates.push({variantId:String(x.id),sku:x.sku,cost,quotes});
  }
  const choice=commonQuotes(candidates.map(x=>x.quotes),policy);
  if(!choice)throw Error("No approved common shipping method");
  const variants=candidates.map((x,i)=>({variantId:x.variantId,sku:x.sku,productCost:x.cost,shippingCost:choice.quotes[i].amount,days:choice.quotes[i].days,...price(x.cost+choice.quotes[i].amount,policy)}));
  return {...item,title:d.nameen,quotedAt:new Date().toISOString(),logisticsWay:choice.name,variants,status:variants.some(x=>x.sale>policy.maxAccessoryPrice)?"REVIEW_PRICE":"QUOTED"};
}
export async function preview(cj,items,policy,limit=5){
  const rows=[];
  for(const item of items.slice(0,limit)){
    try{rows.push(await quoteProduct(cj,item,policy));}catch(e){rows.push({...item,status:"REVIEW",reason:e.message});}
  }
  return rows;
}
// Publishing is intentionally separate from the quote run. Only approved, recent quotes are accepted.
export async function publishApproved(cj,row,config){
  if(row.status!=="QUOTED"||row.approved!==true)throw Error("Quote has not been approved");
  const age=Date.now()-Date.parse(row.quotedAt);
  if(!Number.isFinite(age)||age<0||age>3600000)throw Error("Requote before listing");
  const shops=await cj.shops();
  const shop=shops.find(s=>String(s.id)===String(config.shopId)&&Number(s.status)===1&&String(s.type).toLowerCase()==="shopify");
  if(!shop)throw Error("Configured Shopify shop not verified");
  const listingConfig=config.categories?.[row.category];
  if(!listingConfig?.collectionIds?.length||!config.deliveryProfileId||!config.locationIds?.length||typeof config.taxable!=="boolean")throw Error("Shopify mapping not validated");
  if(!row.approvedTitle||!row.approvedDescription)throw Error("Approved product copy required");
  // Requote immediately and ensure costs, carrier and recommended prices did not change.
  const fresh=await quoteProduct(cj,row,config.policy);
  if(fresh.status!=="QUOTED"||fresh.logisticsWay!==row.logisticsWay||JSON.stringify(fresh.variants)!==JSON.stringify(row.variants))throw Error("Quote changed; review again");
  await cj.call("/listed/queryShopInfo",{shopId:String(shop.id),productId:row.pid});
  const listedId=await cj.call("/listed/publishAsync",{shopId:String(shop.id),productId:row.pid,productTitle:row.approvedTitle,productDescription:row.approvedDescription,categoryId:row.category,platformBrandId:"Zeratta",collectionIds:listingConfig.collectionIds,deliveryProfileId:config.deliveryProfileId,locationIds:config.locationIds,taxable:config.taxable,publishPriceCurrency:"USD",enableLogisticsFee:true,defaultAreaId:"1",sourceCountryCode:"CN",targetCountryCode:"US",logisticsWay:row.logisticsWay,variants:row.variants.map(v=>({variantId:v.variantId,sku:v.sku,price:v.sale,shippingCost:v.shippingCost}))});
  if(!listedId)throw Error("CJ returned no listing ID; reconcile before resubmitting");
  return {pid:row.pid,listedId:String(listedId),status:"SUBMITTED"};
}
export async function listingStatus(cj,listedId){
  return cj.call("/listed/queryPublishStatus",{listedId:String(listedId)});
}
async function main(){
  const [cmd,configPath,rowsPath,outputPath,limitArg]=process.argv.slice(2);
  if(cmd==="shops"){const shops=await new CJ().shops();console.log(JSON.stringify(shops.map(({id,name,type,status})=>({id,name,type,status}))));return;}
  if(cmd!=="preview"||!configPath||!outputPath)throw Error("Usage: node batch.mjs preview config.json rows.json|- report.json [limit] OR shops");
  const cfg=JSON.parse(await readFile(configPath,"utf8"));
  const rows=rowsPath==="-"?await googleRows():JSON.parse(await readFile(rowsPath,"utf8"));
  const items=sheetProducts(rows);
  const limit=limitArg==="all"?items.length:Number(limitArg||5);
  if(!Number.isInteger(limit)||limit<1)throw Error("Invalid limit");
  const result=await preview(new CJ(),items,cfg.policy,limit);
  await writeFile(outputPath,JSON.stringify(result,null,2),{mode:0o600,flag:"wx"});
  console.log("Preview complete: "+result.length+" products. No store writes.");
}
if(process.argv[1]&&import.meta.url===new URL("file://"+process.argv[1]).href)main().catch(e=>{console.error(e.message);process.exitCode=1;});
