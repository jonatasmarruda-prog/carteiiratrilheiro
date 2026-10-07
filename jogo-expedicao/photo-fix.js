(()=>{
  const css=document.createElement('style');
  css.textContent=`
    .photoOv{overflow:hidden!important;padding:6px!important;align-items:center!important;justify-items:center!important;-webkit-overflow-scrolling:touch}
    .photoCard{max-height:calc(100dvh - 12px)!important;overflow:hidden!important;width:min(620px,96vw)!important;padding:10px 12px 12px!important}
    .photoCard img{width:58px!important;height:58px!important}
    .photoView{height:min(170px,32dvh)!important;min-height:100px!important;margin:6px 0!important;font-size:54px!important;padding:10px!important}
    .photoMeta strong{font-size:16px!important}.photoMeta small{font-size:12px!important}
    #closePhoto{display:block!important;width:100%!important;position:relative!important;z-index:5!important;margin-top:8px!important;min-height:48px!important}
    .photoOv.on:after{content:'Toque em qualquer lugar para continuar';position:absolute;left:50%;bottom:8px;transform:translateX(-50%);font-size:10px;font-weight:900;color:#dff57d;background:#07110bcc;border:1px solid #ffffff22;border-radius:999px;padding:5px 9px;pointer-events:none;white-space:nowrap}
    @media (orientation:landscape) and (max-height:520px){
      .photoOv{place-items:center!important}
      .photoCard{display:grid!important;grid-template-columns:54px minmax(0,1fr) 118px!important;grid-template-rows:auto auto!important;gap:6px 10px!important;align-items:center!important;text-align:left!important;max-height:94dvh!important}
      .photoCard>img{grid-column:1;grid-row:1;width:46px!important;height:46px!important}
      .photoView{grid-column:2;grid-row:1 / span 2;width:100%!important;height:min(230px,58dvh)!important;min-height:105px!important;margin:0!important}
      .photoMeta{grid-column:1;grid-row:2!important;text-align:left!important;align-self:start!important}
      #closePhoto{grid-column:3;grid-row:1 / span 2!important;position:static!important;width:118px!important;min-height:54px!important;margin:0!important;padding:10px!important}
      .photoOv.on:after{bottom:3px;font-size:9px}
    }
  `;
  document.head.appendChild(css);

  const photo=document.getElementById('photo');
  const close=document.getElementById('closePhoto');
  let autoTimer=0;
  const closePhoto=()=>{
    if(autoTimer){clearTimeout(autoTimer);autoTimer=0;}
    if(photo) photo.classList.remove('on');
  };
  const scheduleAutoClose=()=>{
    if(autoTimer) clearTimeout(autoTimer);
    autoTimer=setTimeout(closePhoto,2200);
  };

  if(close){
    ['pointerdown','click','touchend'].forEach(ev=>close.addEventListener(ev,e=>{
      e.preventDefault();
      e.stopPropagation();
      closePhoto();
    },{passive:false}));
  }
  if(photo){
    ['pointerdown','click','touchend'].forEach(ev=>photo.addEventListener(ev,e=>{
      e.preventDefault();
      closePhoto();
    },{passive:false}));
    const obs=new MutationObserver(()=>{
      if(photo.classList.contains('on')) scheduleAutoClose();
      else if(autoTimer){clearTimeout(autoTimer);autoTimer=0;}
    });
    obs.observe(photo,{attributes:true,attributeFilter:['class']});
  }
  addEventListener('keydown',e=>{if(e.key==='Escape')closePhoto();});
})();
