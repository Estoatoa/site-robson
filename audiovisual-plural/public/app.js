const $ = s => document.querySelector(s);
const categories = {vocacionada:'Empresa vocacionada',regional:'Empresa regional',trabalhador:'Trabalhador do audiovisual ou MEI',entidade:'Entidade apoiadora'};
const preview = !document.querySelector('meta[name=servico-local]');
const groups = [
 ['Distribuição regional dos investimentos · 2025','%',[['Sudeste',66.3],['Nordeste',11.5],['Sul',11.1],['Centro-Oeste',8.5],['Norte',2.6]],'MinC. Participação regional divulgada para 2025. Etapa financeira não especificada.'],
 ['Reservas para vocacionadas · plano original de 2024','R$ milhões',[['Produção cinematográfica seletiva',40],['Comercialização seletiva',15],['Produção seletiva TV/VoD',40]],'ANCINE. Previsão original calculada em R$ 95 milhões. Revisões posteriores devem ser examinadas separadamente.'],
 ['Planos de ação · orçamento previsto','R$ bilhões',[['2024',1.21],['2026',1.4]],'ANCINE e MinC. Valores nominais dos planos, sem correção monetária.'],
 ['Remuneração média · 2025','R$',[['Audiovisual',6468],['Brasil',3783]],'Referência indicada: Anuário Estatístico do Audiovisual Brasileiro 2025. Consulte a ficha de verificação.'],
 ['Impacto econômico total · 2024','R$ bilhões',[['Impacto estimado',70.2]],'Estudo de contribuição econômica de 2024. Estimativa de impacto na economia.'],
 ['Empregos associados · 2024','empregos',[['Empregos associados',608970]],'Estudo de contribuição econômica de 2024. Empregos associados ao impacto estimado.'],
 ['Empregos formais · 2025','vínculos',[['Audiovisual',78434]],'Anuário Estatístico do Audiovisual Brasileiro 2025. Universo de emprego formal.'],
 ['Estabelecimentos empregadores · 2025','estabelecimentos',[['Audiovisual',4554]],'Anuário Estatístico do Audiovisual Brasileiro 2025. Estabelecimentos com empregados.']
];
function el(tag, str){const node=document.createElement(tag);node.textContent=str;return node}
groups.forEach(([name],i)=>$('#indicator').add(new Option(name,i)));
function draw(){const [title,unit,values,note]=groups[Number($('#indicator').value)],chart=$('#chart');chart.replaceChildren(el('h3',title));const max=Math.max(...values.map(v=>v[1]));values.forEach(([label,value])=>{const row=el('article',''),line=el('div',''),track=el('div',''),bar=el('i','');row.className='row';line.append(el('span',label),el('strong',unit.startsWith('R$') ? 'R$ '+value.toLocaleString('pt-BR')+unit.slice(2) : value.toLocaleString('pt-BR')+(unit==='%'?'%':' '+unit)));track.className='track';bar.style.width=(value/(unit==='%'?100:max)*100)+'%';track.append(bar);row.append(line,track);chart.append(row)});chart.append(el('p',note));
const urls = [
'https://www.gov.br/cultura/pt-br/assuntos/noticias/minc-aprova-plano-de-r-1-4-bilhao-para-o-audiovisual-e-avanca-na-reestruturacao-do-fsa/',
'https://www.gov.br/ancine/pt-br/assuntos/noticias/comite-gestor-do-fsa-aprova-plano-de-acao-2024/',
'https://www.gov.br/cultura/pt-br/assuntos/noticias/minc-aprova-plano-de-r-1-4-bilhao-para-o-audiovisual-e-avanca-na-reestruturacao-do-fsa/',
'https://www.gov.br/ancine/pt-br/assuntos/noticias/anuario-estatistico-do-audiovisual-brasileiro-2025',
'https://fica.org.br/wp-content/uploads/2026/01/A-CONTRIBUICAO-ECONOMICA-DA-INDUSTRIA-AUDIOVISUAL-NO-BRASIL-EM-2024.pdf'];
const refs=[[0],[1],[1,2],[3],[4],[4],[3],[3]][Number($('#indicator').value)];
for(const index of refs){const a=el('a',index===1?'Plano de 2024':index===2?'Plano de 2026':'Consultar fonte');a.href=urls[index];chart.append(a,' ')}}
$('#indicator').onchange=draw;draw();
for(const [value,label] of Object.entries(categories)){let l=el('label',''),c=el('input','');c.type='checkbox';c.value=value;c.name='categoria';l.append(c,' '+label);$('#cats').append(l)}
document.querySelectorAll('[name=uf]').forEach(s=>{s.add(new Option('Selecione',''));for(const uf of 'AC AL AP AM BA CE DF ES GO MA MT MS MG PA PB PR PE PI RJ RN RS RO RR SC SP SE TO'.split(' '))s.add(new Option(uf,uf))});
for(const section of document.querySelectorAll('main section[id]')){let h=section.querySelector('h2,h1');if(!h)continue;let a=el('a',section.id==='inicio'?'Início':h.textContent);a.href='#'+section.id;a.onclick=()=>$('#menu').open=false;$('#sections').append(a)}
const fileData=f=>new Promise((resolve,reject)=>{const r=new FileReader();r.onload=()=>resolve(r.result);r.onerror=reject;r.readAsDataURL(f)});
async function submit(e){e.preventDefault();let f=e.target,btn=f.querySelector('button'),out=f.querySelector('output'),join=f.id==='join',d=new FormData(f),data=Object.fromEntries(d);btn.disabled=true;
try{if(join){data.categorias=d.getAll('categoria');delete data.categoria;if(!data.categorias.length)throw Error('Selecione pelo menos um enquadramento.');if((data.categorias.includes('vocacionada')||data.categorias.includes('regional'))&&!data.cnpj.trim())throw Error('Informe o CNPJ da empresa.');data.versao='minuta-2026-11-25';for(const k of ['aceite','publicar','publicar_logo'])data[k]=d.has(k);let file=$('#logo').files[0];if(file&&!data.publicar_logo)throw Error('Autorize a publicação do logotipo ou remova o arquivo.');if(data.publicar_logo&&(!file||!data.publicar))throw Error('Para publicar o logotipo, inclua a imagem e autorize a divulgação no mural.');if(file){if(file.size>500000||!['image/png','image/jpeg'].includes(file.type))throw Error('Escolha PNG ou JPEG de até 500 KB.');data.logo=await fileData(file)}}else{data.ano=Number(data.ano);data.consentimento=d.has('consentimento');for(const k of ['empregos','receita'])if(data[k]==='')delete data[k];else data[k]=Number(data[k]);if(data.empregos===undefined&&data.receita===undefined)throw Error('Informe pelo menos um valor econômico.')}
if(preview){out.textContent='Simulação concluída neste navegador. Nenhum dado foi enviado ou armazenado.'}else{const res=await fetch('api/'+(join?'adesoes':'pesquisa'),{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});if(!res.headers.get('Content-Type')?.includes('application/json'))throw Error('Serviço de registro indisponível.');const j=await res.json();if(!res.ok)throw Error(j.erro||'Falha ao registrar.');out.textContent=j.mensagem}f.reset()
}catch(err){out.textContent=err.message}finally{btn.disabled=false}}
$('#join').onsubmit=submit;$('#survey').onsubmit=submit;
async function mural(){let wall=$('#wall');if(preview){wall.textContent='Nenhuma adesão publicada nesta edição demonstrativa.';return}try{const res=await fetch('api/mural');if(!res.ok)throw Error();let d=await res.json();wall.replaceChildren(el('p',d.total+' adesões verificadas com publicação autorizada.'));for(const item of d.signatarios){let p=el('p',item.nome+' · '+item.uf+' · '+item.categorias.map(c=>categories[c]).join(', '));if(item.logo){let img=document.createElement('img');img.src=item.logo;img.alt='Logotipo autorizado de '+item.nome;img.width=60;p.prepend(img)}wall.append(p)}}catch{wall.textContent='Consulta ao mural indisponível nesta visualização.'}}mural();

if(!preview)document.querySelector('[href="carta-coletiva.pdf"]').href='api/carta.pdf';
