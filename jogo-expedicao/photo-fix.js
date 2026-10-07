(()=>{
  const css=document.createElement('style');
  css.textContent=`
    .photoOv{overflow:auto!important;padding:6px!important;align-items:center!important;justify-items:center!important;-webkit-overflow-scrolling:touch}
    .photoCard{max-height:calc(100dvh - 12px)!important;overflow:auto!important;width:min(620px,96vw)!important;padding:10px 12px 12px!important}
    .photoCard img{width:58px!important;height:58px!important}
    .photoView{height:min(170px,32dvh)!important;min-height:105px!important;margin:6px 0!important;font-size:54px!important;padding:10px!important}
    .photoMeta strong{font-size:16px!important}.photoMeta small{font-size:12px!important}
    #closePhoto{display:block!important;width:100%!important;position:sticky!important;bottom:0!important;z-index:5!important;margin-top:8px!important;box-shadow:0 -8px 18px #0a1710}
    @media (orientation:landscape) and (max-height:520px){
      .photoOv{place-items:center!important}
      .photoCard{display:grid!important;grid-template-columns:64px 1fr auto!important;grid-template-rows:auto auto!important;gap:6px 10px!important;align-items:center!important;text-align:left!important}
      .photoCard>img{grid-column:1;grid-row:1;width:52px!important;height:52px!important}
      .photoView{grid-column:2;grid-row:1 / span 2;width:100%!important;height:min(250px,62dvh)!important;margin:0!important}
      .photoMeta{grid-column:1;grid-row:2!important;text-align:left!important;align-self:start!important}
      #closePhoto{grid-column:3;grid-row:1 / span 2!important;position:static!important;width:118px!important;min-height:54px!important;margin:0!important;padding:10px!important}
    }
  `;
  document.head.appendChild(css);

  const photo=document.getElementById('photo');
  const close=document.getElementById('closePhoto');
  const closePhoto=()=>photo&&photo.classList.remove('on');
  if(close){
    close.addEventListener('pointerup',e=>{e.preventDefault();e.stopPropagation();closePhoto();});
  }
  if(photo){
    photo.addEventListener('pointerup',e=>{if(e.target===photo)closePhoto();});
  }
  addEventListener('keydown',e=>{if(e.key==='Escape')closePhoto();});
})();
