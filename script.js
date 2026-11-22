const strings={
en:{navStays:"Our stays",navRio:"Explore Rio",navAbout:"About",bookNav:"Find your stay ↗",heroKicker:"YOUR RIO STORY STARTS HERE",heroTitle:"Stay a little.<br><em>Feel a lot.</em>",heroText:"Sun-soaked days, vibrant streets, and a space to call your own. Find your perfect Rio de Janeiro escape.",heroButton:"Explore our apartments ↗",heroFoot:"Book securely through Airbnb",scroll:"SCROLL TO EXPLORE ↓",introKicker:"WELCOME TO RIO",introTitle:"A city to fall for.<br><em>A stay to remember.</em>",introText:"From sun-drenched beach days to lively evenings, Rio is yours to explore. Meet our two apartments and make your reservation directly on Airbnb.",introLink:"Discover our stays ↗",staysKicker:"YOUR HOME AWAY FROM HOME",staysTitle:"Two spaces.<br><em>One unforgettable city.</em>",staysText:"Find a space that feels like yours and make Rio your own.",firstText:"Discover this Rio apartment, with full details, availability and guest reviews on Airbnb.",secondText:"Explore this second Rio stay and check its photos, pricing and availability on Airbnb.",checkAirbnb:"See location and amenities on Airbnb",viewAirbnb:"View on Airbnb ↗",placeholder:"Preview: apartment images are illustrative placeholders, not photographs of these properties. Replace before publishing.",rioKicker:"THE RIO STATE OF MIND",rioTitle:"Come for the views.<br><em>Stay for the feeling.</em>",rioText:"Beach mornings, incredible food, colorful streets and golden sunsets. Rio invites you to explore a little further every day.",rioLink:"Find your Rio home ↗",stepsKicker:"SIMPLE & SECURE",stepsTitle:"Your trip, made easy.",step1Title:"Explore",step1Text:"Discover our apartments and choose your favorite.",step2Title:"Book on Airbnb",step2Text:"Book securely on Airbnb with up-to-date prices and availability.",step3Title:"Enjoy Rio",step3Text:"Make yourself at home and enjoy the city.",ctaKicker:"YOUR NEXT CHAPTER",ctaTitle:"Rio is calling.<br><em>Will you answer?</em>",ctaButton:"Find your stay ↗",footerText:"Made for memorable days in Rio de Janeiro."},
pt:{navStays:"Apartamentos",navRio:"Descubra o Rio",navAbout:"Sobre",bookNav:"Encontre seu lugar ↗",heroKicker:"SUA HISTÓRIA NO RIO COMEÇA AQUI",heroTitle:"Fique um pouco.<br><em>Sinta muito.</em>",heroText:"Dias de sol, ruas cheias de vida e um cantinho para chamar de seu. Encontre seu lugar no Rio de Janeiro.",heroButton:"Conheça nossos apartamentos ↗",heroFoot:"Reserve com segurança pelo Airbnb",scroll:"ROLE PARA EXPLORAR ↓",introKicker:"BEM-VINDO AO RIO",introTitle:"Uma cidade para amar.<br><em>Uma estadia para lembrar.</em>",introText:"Dos dias de praia às noites animadas, o Rio é seu para explorar. Conheça nossos apartamentos e reserve diretamente pelo Airbnb.",introLink:"Conheça nossos espaços ↗",staysKicker:"SUA CASA LONGE DE CASA",staysTitle:"Dois espaços.<br><em>Uma cidade inesquecível.</em>",staysText:"Encontre seu cantinho e viva o melhor do Rio.",firstText:"Conheça este apartamento e veja detalhes, disponibilidade e avaliações no Airbnb.",secondText:"Conheça nosso segundo apartamento e confira fotos, preços e disponibilidade no Airbnb.",checkAirbnb:"Veja localização e comodidades no Airbnb",viewAirbnb:"Ver no Airbnb ↗",placeholder:"Prévia: as imagens dos apartamentos são ilustrativas e não representam os imóveis. Substitua antes da publicação.",rioKicker:"O JEITO CARIOCA DE VIVER",rioTitle:"Venha pelas paisagens.<br><em>Fique pela energia.</em>",rioText:"Praias, gastronomia, ruas coloridas e pôr do sol inesquecível. O Rio convida você a descobrir algo novo a cada dia.",rioLink:"Encontre seu lugar no Rio ↗",stepsKicker:"SIMPLES E SEGURO",stepsTitle:"Sua viagem, sem complicação.",step1Title:"Explore",step1Text:"Conheça os apartamentos e escolha seu favorito.",step2Title:"Reserve pelo Airbnb",step2Text:"Reserve pelo Airbnb com preços e disponibilidade atualizados.",step3Title:"Aproveite o Rio",step3Text:"Sinta-se em casa e curta a cidade.",ctaKicker:"SUA PRÓXIMA AVENTURA",ctaTitle:"O Rio está chamando.<br><em>Vamos?</em>",ctaButton:"Encontre seu lugar ↗",footerText:"Feito para dias inesquecíveis no Rio de Janeiro."}};
const languageButton=document.querySelector("#language");let current="en";
function applyLanguage(lang){current=lang==="pt"?"pt":"en";document.documentElement.lang=current==="pt"?"pt-BR":"en";for(const node of document.querySelectorAll("[data-t]")){const value=strings[current][node.dataset.t];if(value)node.textContent=value;}for(const node of document.querySelectorAll("[data-html]")){const value=strings[current][node.dataset.html];if(value)node.innerHTML=value;}document.querySelector("#language-label").textContent=current==="pt"?"EN":"PT";languageButton.setAttribute("aria-label",current==="pt"?"Switch to English":"Mudar para português");document.title=current==="pt"?"Rio Stays — Apartamentos por temporada no Rio de Janeiro":"Rio Stays — Your place in Rio de Janeiro";try{localStorage.setItem("rioLanguage",current)}catch{}}
languageButton.addEventListener("click",()=>applyLanguage(current==="en"?"pt":"en"));document.querySelector("#year").textContent=new Date().getFullYear();let lang="en";try{lang=localStorage.getItem("rioLanguage")||(navigator.language.toLowerCase().startsWith("pt")?"pt":"en")}catch{lang=navigator.language.toLowerCase().startsWith("pt")?"pt":"en"}applyLanguage(lang);

/* Keep the preview functional while prepared photo assets are being uploaded. */
document.querySelectorAll("img[data-image-fallback]").forEach((img)=>{
  img.addEventListener("error",()=>{
    const fallback=img.dataset.imageFallback;
    if(fallback && img.src!==fallback){
      img.removeAttribute("data-image-fallback");
      img.src=fallback;
      img.alt="Temporary illustrative image; actual property photo is awaiting upload";
    }
  });
});


/* Accessible full-size apartment photo galleries for both properties. */
const lightbox=document.querySelector("#photo-lightbox");
const fullImage=document.querySelector("#lightbox-image");
const lightboxCaption=document.querySelector("#lightbox-caption");
const lightboxCounter=document.querySelector("#lightbox-counter");
let activeGallery=[];
let activePhoto=0;
let priorFocus=null;
function showPhoto(index){
  if(!activeGallery.length)return;
  activePhoto=(index+activeGallery.length)%activeGallery.length;
  const source=activeGallery[activePhoto];
  fullImage.src=source.currentSrc||source.src;
  fullImage.alt=source.alt;
  lightboxCaption.textContent=source.closest("figure").querySelector("figcaption")?.textContent||source.alt;
  lightboxCounter.textContent=`${activePhoto+1} / ${activeGallery.length}`;
}
function openPhoto(gallery,index){
  priorFocus=document.activeElement;
  activeGallery=gallery;
  showPhoto(index);
  if(typeof lightbox.showModal==="function"){lightbox.showModal();}
  else{lightbox.setAttribute("open","");}
  lightbox.querySelector(".lightbox-close").focus();
}
function closePhoto(){
  if(typeof lightbox.close==="function")lightbox.close();
  else lightbox.removeAttribute("open");
  if(priorFocus && typeof priorFocus.focus==="function")priorFocus.focus();
}
document.querySelectorAll(".apartment-gallery").forEach(gallery=>{
  const images=[...gallery.querySelectorAll("img")];
  images.forEach((img,index)=>{
    const fig=img.closest("figure");
    fig.setAttribute("tabindex","0");
    fig.setAttribute("role","button");
    fig.setAttribute("aria-label",`Open photo ${index+1} of ${images.length}: ${img.alt}`);
    fig.addEventListener("click",()=>openPhoto(images,index));
    fig.addEventListener("keydown",event=>{
      if(event.key==="Enter"||event.key===" "){event.preventDefault();openPhoto(images,index);}
    });
  });
});
lightbox.querySelector(".lightbox-close").addEventListener("click",closePhoto);
lightbox.querySelector(".lightbox-prev").addEventListener("click",()=>showPhoto(activePhoto-1));
lightbox.querySelector(".lightbox-next").addEventListener("click",()=>showPhoto(activePhoto+1));
lightbox.addEventListener("click",event=>{if(event.target===lightbox)closePhoto();});
lightbox.addEventListener("keydown",event=>{
  if(event.key==="ArrowRight"){event.preventDefault();showPhoto(activePhoto+1);}
  if(event.key==="ArrowLeft"){event.preventDefault();showPhoto(activePhoto-1);}
});
