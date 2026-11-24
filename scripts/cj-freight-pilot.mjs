import {commercialPrice,quoteCandidates} from '../precificacao/accessories.mjs';
const base='https://developers.cjdropshipping.com/api2.0/v1/';
const key=process.env.CJ_API_KEY;
if(!key)throw Error('CJ secret missing');
let token;
async function call(path,body){
  await new Promise(r=>setTimeout(r,1300));
  const response=await fetch(base+path,{method:body?'POST':'GET',headers:{'Content-Type':'application/json',...(token?{'CJ-Access-Token':token}:{})},...(body?{body:JSON.stringify(body)}:{})});
  if(!response.ok)throw Error('CJ HTTP '+response.status);
  const j=await response.json();
  if(![0,200].includes(j.code)||!(j.result===true||j.success===true))throw Error('CJ API code '+(Number.isInteger(j.code)?j.code:'unknown'));
  return j.data;
}
const auth=await call('authentication/getAccessToken',{apiKey:key});
token=auth?.accessToken;
if(typeof token!=='string'||!token)throw Error('No access token');
const p={cpa:17,feePct:5.99,taxPct:0,fixed:0,reserve:0,goal:12};
const samples=[['Sunglasses','2602260806241600400',49.99],['Wallets','2608120902321638500',49.99],['Belts','2611191254221614200',59.99]];
let errors=0;
for(const [category,pid,ceiling] of samples){
  try{
    const product=await call('product/query?pid='+encodeURIComponent(pid));
    if(String(product?.pid)!==pid||!Array.isArray(product.variants)||!product.variants.length)throw Error('Product/variants not verified');
    const v=product.variants[0];
    if(!v.vid||v.variantSellPrice==null||v.variantSellPrice===''||!Number.isFinite(Number(v.variantSellPrice))||Number(v.variantSellPrice)<=0)throw Error('Variant cost missing');
    const quotes=await call('logistic/freightCalculate',{startCountryCode:'CN',endCountryCode:'US',zip:'10001',products:[{vid:String(v.vid),quantity:1}]});
    const options=quoteCandidates(quotes);
    const provisional=options.find(q=>q.status==='REVIEW_TRANSIT_UNIT'||q.status==='CANDIDATE');
    if(provisional)commercialPrice({...p,cost:Number(v.variantSellPrice)+provisional.cost},{ceiling});
    console.log(category+': product and quote request OK; returned options='+quotes.length+'; parsed options='+options.length+'; provisional time candidates='+options.filter(q=>q.status==='REVIEW_TRANSIT_UNIT').length);
  }catch(e){errors++;console.log(category+': check failed ('+String(e.message).replace(/[^a-zA-Z0-9 /._()-]/g,'').slice(0,120)+')');}
}
console.log('Read-only pilot; single variant and ZIP per category. No financial data or credentials in public logs. No listings created.');
if(errors)process.exitCode=1;
