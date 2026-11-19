'use strict';
/* Importação da aba Página1 da planilha CJ: colunas A, C, E, G, I, K.
   A planilha original está privada: importação manual CSV é o modo seguro.
   Consulta pública é apenas opcional e nunca necessária para abrir o catálogo. */
const CJ_SHEET_ID='1VK3Q6wIYbjOpqsS1RhyD7mqwmraLlegehcPAQKDg_RA';
const CJ_COLS=[0,2,4,6,8,10];
// Itens removidos por decisão da ZERATTA; não reimportar da planilha CJ.
const CJ_EXCLUDED_IDS=new Set(['cj-1447860782342737920','cj-2611090929201605000']);
let cjPendingProducts=null;
function cjCsvParse(raw){
 const text=String(raw||'').replace(/^\uFEFF/,'');
 const rows=[];let row=[],cell='',quoted=false;
 for(let i=0;i<text.length;i++){
  const c=text[i];
  if(quoted){if(c==='"'&&text[i+1]==='"'){cell+='"';i++}else if(c==='"')quoted=false;else cell+=c}
  else if(c==='"')quoted=true;
  else if(c===','){row.push(cell);cell=''}
  else if(c==='\n'||c==='\r'){if(c==='\r'&&text[i+1]==='\n')i++;row.push(cell);if(row.some(x=>x.trim()))rows.push(row);row=[];cell=''}
  else cell+=c;
 }
 row.push(cell);if(row.some(x=>x.trim()))rows.push(row);
 return rows;
}
function cjUrlToItem(url,category,number){
 if(!validSupplierUrl(url))throw Error('URL não é de produto CJ: '+url);
 const path=new URL(url).pathname;
 const m=path.match(/^\/product\/(.+)-p-([a-z0-9-]+)\.html$/i);
 if(!m)throw Error('Formato de URL CJ inválido: '+url);
 const id='cj-'+m[2].toLowerCase(),old=byId.get(id);
 const fromSlug=m[1].replace(/-/g,' ').replace(/\bmens\b/ig,"Men's").replace(/\bpu\b/ig,'PU')
  .replace(/\s+/g,' ').trim().replace(/\b[a-z]/g,x=>x.toUpperCase()).replace(/Men'S/g,"Men's");
 return {id,number,shopTitle:old?.shopTitle||fromSlug,before:old?.before||fromSlug,
  shopHandle:old?.shopHandle||'',storeUrl:old?.storeUrl||'',adminUrl:old?.adminUrl||'',sourceUrl:url,image:old?.image||'',
  status:old?.status||'MINERADO',category,origin:'Novo',date:'2026-11-19',
  price:null,priceMax:null,cost:null,variants:old?.variants??null,sourceOriginalNumbers:[],
  supplierNumber:null,confidence:'cj_link',issues:[],freight:null,
  notes:'',supplierSKU:'',unitCostWorstVariant:null,
  shopifyPublishedPrice:null,shopifyPublishedCompareAt:null,
  originalShopifyPrice:null,recommendedSale:null,
  shopifyPriceSource:'Planilha CJ · custos e preços não informados',shopifyLinkedAt:old?.shopifyLinkedAt||null,imageSource:old?.imageSource||null};
}
function cjReadSheetRows(rows){
 if(!Array.isArray(rows)||rows.length<2)throw Error('Planilha vazia');
 const categories=CJ_COLS.map(i=>String(rows[0]?.[i]||'').replace(/\s*\(\d+\)\s*$/,'').trim());
 if(categories.some(x=>!x))throw Error('CSV incompatível: use a aba Página1 com categorias nas colunas A, C, E, G, I e K');
 const products=[],seen=new Set();
 for(let i=0;i<CJ_COLS.length;i++){
  const col=CJ_COLS[i];
  for(const row of rows.slice(1)){
   const url=String(row[col]||'').trim();if(!url)continue;
   const item=cjUrlToItem(url,categories[i],products.length+1);
   if(CJ_EXCLUDED_IDS.has(item.id))continue;
   if(seen.has(item.id))continue;
   seen.add(item.id);products.push(item);
  }
 }
 if(products.length===0)throw Error('Não há links de produto CJ na aba');
 return products;
}
function cjApplyCatalog(next,message){
 const oldKey=PRODUCTS.map(p=>p.id+'|'+p.category+'|'+p.sourceUrl).join('\n');
 const newKey=next.map(p=>p.id+'|'+p.category+'|'+p.sourceUrl).join('\n');
 if(oldKey===newKey)return false;
 PRODUCTS.splice(0,PRODUCTS.length,...next);
 byId.clear();for(const p of PRODUCTS)byId.set(p.id,p);
 for(const id of Object.keys(state.saved))if(!byId.has(id))delete state.saved[id];
 for(const name of ['dirty','linkDirty','pricingDirty']){
  for(const id of Object.keys(cloud[name]))if(!byId.has(id))delete cloud[name][id];
 }
 cloudPersistDirty();persist();
 state.search='';state.category='';state.origin='';state.audit='';
 $('search').value='';$('origin').value='';$('audit').value='';
 const category=$('category');
 category.innerHTML='<option value="">Todas as categorias</option>';
 for(const name of [...new Set(PRODUCTS.map(p=>p.category))]){
  const opt=document.createElement('option');opt.value=name;
  opt.textContent=name+' ('+PRODUCTS.filter(p=>p.category===name).length+')';category.append(opt);
 }
 $('count-all').textContent=PRODUCTS.length;
 $('count-new').textContent=PRODUCTS.length;
 $('count-old').textContent=new Set(PRODUCTS.map(p=>p.category)).size;
 $('count-links').textContent=PRODUCTS.filter(p=>validSupplierUrl(p.sourceUrl)).length;
 $('count-freight').textContent=PRODUCTS.filter(p=>p.freight==null).length;
 $('visible-total').textContent=' / '+PRODUCTS.length;
 render();
 $('sheet-sync-status').textContent=message+' · '+PRODUCTS.length+' produtos, '+new Set(PRODUCTS.map(p=>p.category)).size+' categorias. Fretes individuais mantidos sem preenchimento.';
 return true;
}
$('sheet-csv-btn').addEventListener('click',()=>$('sheet-csv-file').click());
$('sheet-csv-file').addEventListener('change',async e=>{
 const file=e.target.files[0];if(!file)return;
 try{
  const next=cjReadSheetRows(cjCsvParse(await file.text()));
  cjApplyCatalog(next,'CSV carregado no catálogo');
  cjPendingProducts=next;
  $('sheet-publish-btn').disabled=false;
  $('sheet-sync-status').textContent='CSV importado: '+next.length+' itens. Clique Publicar catálogo no GitHub para atualizar a versão compartilhada. Frete permanece vazio na base importada.';
  toast('Nova versão carregada; clique Publicar no GitHub para sincronizar.');
 }catch(err){alert('Falha na importação: '+err.message)}
 finally{e.target.value=''}
});
$('sheet-publish-btn').addEventListener('click',async()=>{
 if(!cjPendingProducts)return;
 if(!cloud.token){alert('Conecte primeiro seu token GitHub com Contents Read/Write na seção de sincronização.');return}
 if(!confirm('Substituir a lista pública de produtos por '+cjPendingProducts.length+' itens deste CSV?'))return;
 const button=$('sheet-publish-btn');button.disabled=true;
 try{
  const url='https://api.github.com/repos/'+CLOUD_REPO+'/contents/data/products.js';
  const headers={'Authorization':'Bearer '+cloud.token,'Accept':'application/vnd.github+json',
   'X-GitHub-Api-Version':'2022-11-28'};
  const lookup=await fetch(url+'?ref=main',{headers,cache:'no-store'});
  if(!lookup.ok)throw Error('Leitura GitHub HTTP '+lookup.status);
  const meta=await lookup.json();
  const content='window.ZERATTA_PRODUCTS='+JSON.stringify(cjPendingProducts)+';\n';
  const write=await fetch(url,{method:'PUT',headers:{...headers,'Content-Type':'application/json'},
   body:JSON.stringify({message:'sync: atualizar catálogo CJ a partir da planilha CSV',
     content:cloudEncode(content),sha:meta.sha,branch:'main'})});
  if(!write.ok)throw Error('Gravação GitHub HTTP '+write.status);
  $('sheet-sync-status').textContent='Atualização enviada ao GitHub: '+cjPendingProducts.length+' produtos. A publicação do site é acionada pelo commit.';
  cjPendingProducts=null;toast('Lista publicada no GitHub.');
 }catch(err){alert('Não foi possível publicar: '+err.message);button.disabled=false}
});
async function cjAttemptOnline(){
 // A planilha pode ser privada. Sem autorização de leitura externa, preservar snapshot.
 const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),4500);
 try{
  const url='https://docs.google.com/spreadsheets/d/'+CJ_SHEET_ID+'/gviz/tq?tqx=out:csv&gid=0';
  const response=await fetch(url,{signal:controller.signal,cache:'no-store'});
  if(!response.ok)throw Error('HTTP '+response.status);
  const next=cjReadSheetRows(cjCsvParse(await response.text()));
  if(cjApplyCatalog(next,'Atualização lida da planilha (prévia deste navegador)')){
   cjPendingProducts=next;$('sheet-publish-btn').disabled=false;
  }else $('sheet-sync-status').textContent='Catálogo sincronizado com a versão consultável da planilha: '+PRODUCTS.length+' produtos.';
 }catch(_){
  $('sheet-sync-status').textContent='Base CJ publicada: '+PRODUCTS.length+' produtos. Planilha privada: para novas alterações, importe um CSV da aba Página1 e publique no GitHub.';
 }finally{clearTimeout(timer)}
}
cjAttemptOnline();
