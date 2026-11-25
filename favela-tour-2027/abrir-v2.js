'use strict';
const form=document.getElementById('acesso');
const passwordField=document.getElementById('senha');
const button=document.getElementById('entrar');
const status=document.getElementById('status');
const decode=s=>Uint8Array.from(atob(s),c=>c.charCodeAt(0));
form.addEventListener('submit',async event=>{
  event.preventDefault();
  if(button.disabled)return;
  button.disabled=true;
  status.textContent='Abrindo apresentação…';
  let stage='download';
  try{
    if(!globalThis.crypto?.subtle)throw new Error('unsupported');
    const response=await fetch('conteudo.json?revision=013b205',{cache:'no-store',credentials:'omit'});
    if(!response.ok)throw new Error('download');
    const payload=await response.json();
    if(payload.version!==1||payload.kdf!=='PBKDF2-SHA256'||payload.iterations!==600000)throw new Error('format');
    stage='decrypt';
    const material=await crypto.subtle.importKey('raw',new TextEncoder().encode(passwordField.value),'PBKDF2',false,['deriveKey']);
    passwordField.value='';
    const key=await crypto.subtle.deriveKey({name:'PBKDF2',salt:decode(payload.salt),iterations:payload.iterations,hash:'SHA-256'},material,{name:'AES-GCM',length:256},false,['decrypt']);
    const clear=await crypto.subtle.decrypt({name:'AES-GCM',iv:decode(payload.iv)},key,decode(payload.ciphertext));
    const html=new TextDecoder().decode(clear);
    document.open();document.write(html);document.close();
    window.scrollTo(0,0);
  }catch(error){
    status.textContent=stage==='decrypt'?'Senha incorreta ou conteúdo inválido. Tente novamente.':'Não foi possível abrir. Verifique a conexão e use um navegador atualizado com HTTPS.';
    button.disabled=false;
    passwordField.focus();
  }
});
