// Zeratta: pure pricing and shipping helpers. No credentials.
export function money(v) {
  if ((typeof v !== "number" && typeof v !== "string") || String(v).trim() === "" || !Number.isFinite(Number(v)) || Number(v)<0) throw Error("Invalid monetary value");
  return Number(v);
}

export function price(cost, p) {
  const c=money(cost), cpa=money(p.cpa), fixed=money(p.fixed), reserve=money(p.reserve), goal=money(p.goal), fee=money(p.feePct)/100, tax=money(p.taxPct)/100, shipping=money(p.shippingCharged), threshold=money(p.freeShippingThreshold);
  const rate=1-fee-tax;
  if(rate<=0||threshold<=0) throw Error("Invalid pricing policy");
  const round=x=>Math.max(99,Math.ceil(x-0.99-1e-9)*100+99)/100;
  const required=(c+cpa+fixed+reserve+goal)/rate;
  let sale=round(Math.max(0,required-shipping));
  if(sale>=threshold) sale=round(Math.max(threshold,required));
  const shippingRevenue=sale>=threshold?0:shipping, revenue=sale+shippingRevenue, profit=revenue*rate-c-fixed-reserve-cpa;
  if(profit+1e-7<goal) throw Error("Target profit not met");
  return {sale,shippingRevenue,profit:Number(profit.toFixed(2)),marginPct:Number((100*profit/revenue).toFixed(2)),cost:c,rawRequiredRevenue:required};
}

export function pidFromLink(link) {
  const m=String(link).trim().match(/^https:\/\/(?:www\.)?cjdropshipping\.com\/product\/[^?#]+-p-(\d+|[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})\.html(?:[?#].*)?$/i);
  if(!m) throw Error("CJ product ID not found"); return m[1].toUpperCase();
}

export function freightAmount(q) {
  const base=money(q.logisticPrice);
  const extra=(q.taxesFee==null?0:money(q.taxesFee))+(q.clearanceOperationFee==null?0:money(q.clearanceOperationFee));
  return Math.max(base+extra,q.totalPostageFee==null?0:money(q.totalPostageFee));
}

export function commonQuotes(sets, policy) {
  const eligible=sets.map(s=>s.flatMap(q=>{
    try { const m=String(q.logisticAging).trim().match(/^(\d+)(?:\s*[-–]\s*(\d+))?(?:\s*days?)?$/i);
      if(!m||Number(m[2]||m[1])>policy.maxDays||!policy.approvedCarriers.includes(q.logisticName))return [];
      return [{name:q.logisticName,days:q.logisticAging,amount:freightAmount(q)}];
    }catch{return [];}
  }));
  const choices=[...new Set(eligible[0]?.map(q=>q.name)||[])].flatMap(name=>{
    const quotes=eligible.map(s=>s.filter(q=>q.name===name).sort((a,b)=>b.amount-a.amount)[0]);
    return quotes.every(Boolean)?[{name,quotes,max:Math.max(...quotes.map(q=>q.amount))}]:[];
  });
  return choices.sort((a,b)=>a.max-b.max)[0]||null;
}
