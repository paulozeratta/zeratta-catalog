// Shared USD pricing engine. No secrets, no network calls.
export function calculatePricing(p) {
  const keys=['cost','cpa','feePct','taxPct','fixed','reserve','goal','shippingCharged'];
  for(const k of keys) if(typeof p[k]!=='number'||!Number.isFinite(p[k])||p[k]<0) throw Error('Invalid '+k);
  const rate=1-(p.feePct+p.taxPct)/100;
  if(!(rate>0)) throw Error('Combined rates must be below 100%');
  const raw=Math.max(0,(p.cost+p.cpa+p.fixed+p.reserve+p.goal)/rate-p.shippingCharged);
  const suggested=Math.round(Math.max(.99,Math.ceil(raw-.99-1e-9)+.99)*100)/100;
  const sale=p.sale===undefined?suggested:p.sale;
  if(!Number.isFinite(sale)||sale<=0||sale>1e8||suggested>1e8) throw Error('Invalid price');
  const revenue=sale+p.shippingCharged, processor=revenue*p.feePct/100+p.fixed, taxes=revenue*p.taxPct/100;
  const profit=revenue-p.cost-p.cpa-processor-taxes-p.reserve;
  return {raw,suggested,sale,revenue,processor,taxes,profit,margin:profit/revenue*100,breakEvenCPA:profit+p.cpa};
}

export function priceWithShippingPolicy(p, policy) {
  const {threshold,charge}=policy;
  if(!Number.isFinite(threshold)||threshold<=0||!Number.isFinite(charge)||charge<0) throw Error('Invalid shipping policy');
  const paid=calculatePricing({...p,shippingCharged:charge});
  const chosen=paid.suggested<threshold?paid:calculatePricing({...p,shippingCharged:0});
  if(chosen.suggested>=threshold && chosen.revenue!==chosen.sale) throw Error('Shipping policy mismatch');
  return {...chosen,shippingCharged:chosen.revenue-chosen.sale,
    freeShippingScenario:calculatePricing({...p,shippingCharged:0,sale:chosen.sale})};
}
