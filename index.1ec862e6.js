var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},t={},i=e.parcelRequired7c6;null==i&&((i=function(e){if(e in n)return n[e].exports;if(e in t){var i=t[e];delete t[e];var o={id:e,exports:{}};return n[e]=o,i.call(o.exports,o,o.exports),o.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,n){t[e]=n},e.parcelRequired7c6=i);var o=i("d6GLQ"),a=i("2nhTy");const r=document.querySelector(".watched"),l=document.querySelector(".queued"),c=document.querySelector(".gallery"),s=document.querySelector(".slider-wrapper"),u=document.querySelector("#btn_watched"),d=document.querySelector("#btn_queue"),g=document.querySelector("#activ-homeJs"),p=document.querySelector("#activ-libraryJs"),m=(document.querySelector("gallery__item"),()=>JSON.parse(localStorage.getItem("watched-films-list"))),y=()=>JSON.parse(localStorage.getItem("queued-films-list")),f=()=>null!==document.querySelector(".watched");function v(e){const n=e.map((e=>(0,o.default)(e))).join("");f()?(r.innerHTML=n,l.innerHTML=null):(r.innerHTML=null,l.innerHTML=n),c.innerHTML=null,a.pagination._offByEventName("afterMove","getResponseMovie"),a.pagination.on("afterMove",L)}u.addEventListener("click",(()=>{c.innerHTML=null,s.innerHTML=null,a.pagination.reset(m().length),v(_(m(),a.pagination._options.itemsPerPage,1)),d.classList.remove("btn_library_active"),u.classList.add("btn_library_active")})),d.addEventListener("click",(()=>{c.innerHTML=null,s.innerHTML=null,a.pagination.reset(y().length),v(_(y(),a.pagination._options.itemsPerPage,1)),u.classList.remove("btn_library_active"),d.classList.add("btn_library_active")})),g.addEventListener("click",(()=>{location.reload()})),p.addEventListener("click",(()=>{u.classList.add("btn_library_active"),d.classList.remove("btn_library_active"),c.innerHTML=null,s.innerHTML=null,a.pagination.reset(m().length),v(_(m(),a.pagination._options.itemsPerPage,1))}));const _=(e,n,t)=>e.slice((t-1)*n,t*n);function L(e){try{let e;e=f()?m():y();const n=_(e,a.pagination._options.itemsPerPage,a.pagination.getCurrentPage());e.length!==a.pagination._options.totalItems&&(console.log("getNextPage ~ pagination.reset",a.pagination.reset),a.pagination.reset(e.length)),console.log("getNextPage ~ pagination",a.pagination),console.log("getNextPage ~ currentStorage",e),v(n,f())}catch(e){console.log(e),Notify.failure(e.name)}window.scrollTo(0,0)}
//# sourceMappingURL=index.1ec862e6.js.map