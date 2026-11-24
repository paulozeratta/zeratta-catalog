// Commercial price ladder for accessories; no live data or credentials.
import {calculatePricing} from './engine.mjs';
export const ACCESSORY_TIERS=Object.freeze([24.99,29.99,34.99,39.99,44.99,49.99,54.99,59.99,64.99,69.99,74.99,79.99]);
export function commercialPrice(p,{threshold=120,charge=6.99,tiers=ACCESSORY_TIERS,ceiling,stressCPA=27}={}) {
  if(!Number.isFinite(ceiling)||ceiling<=0) throw Error('Validated commercial ceiling required');
  if(!Number.isFinite(threshold)||threshold<=0||!Number.isFinite(charge)||charge<0||!Number.isFinite(stressCPA)||stressCPA<0) throw Error('Invalid policy');
  for(const sale of [...new Set(tiers)].sort((a,b)=>a-b)){
    if(!Number.isFinite(sale)||sale<=0||sale>ceiling) continue;
    const shippingCharged=sale<threshold?charge:0;
    const base=calculatePricing({...p,sale,shippingCharged});
    if(base.profit+1e-8<p.goal) continue;
    const adverse=calculatePricing({...p,cpa:stressCPA,sale,shippingCharged});
    const free=calculatePricing({...p,sale,shippingCharged:0});
    return {status:adverse.profit<0?'REVIEW_CPA':'PRICE_PROPOSED',sale,base,adverse,free,shippingCharged};
  }
  return {status:'NO_VIABLE_TIER',sale:null};
}
export function quoteCandidates(rows,{handlingDays=2,maxDays=9,confirmedBusinessDays=false}={}){
  if(!Array.isArray(rows)||!Number.isInteger(handlingDays)||handlingDays<0||!Number.isInteger(maxDays)||maxDays<handlingDays)throw Error('Invalid logistics parameters');
  return rows.flatMap(q=>{
    const m=String(q.logisticAging??'').trim().match(/^(\d+)\s*(?:[-–]\s*(\d+))?$/);
    const values=[q.logisticPrice,q.taxesFee??0,q.clearanceOperationFee??0];
    if(!m||!q.logisticName||values.some(v=>v===null||v===''||!Number.isFinite(Number(v))||Number(v)<0))return [];
    const sum=values.reduce((a,v)=>a+Number(v),0);
    const total=q.totalPostageFee==null?sum:Math.max(sum,Number(q.totalPostageFee));
    if(!Number.isFinite(total)||total<0||Number(m[2]??m[1])<Number(m[1]))return [];
    const end=Number(m[2]??m[1])+handlingDays;
    return [{carrier:q.logisticName,cost:total,transit:q.logisticAging,estimatedMaxDays:end,status:end>maxDays?'SLOW':confirmedBusinessDays?'CANDIDATE':'REVIEW_TRANSIT_UNIT'}];
  }).sort((a,b)=>a.cost-b.cost);
}
