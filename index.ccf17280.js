function e(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},l={},t={},a=n.parcelRequired7c6;null==a&&((a=function(e){if(e in l)return l[e].exports;if(e in t){var n=t[e];delete t[e];var a={id:e,exports:{}};return l[e]=a,n.call(a.exports,a,a.exports),a.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,n){t[e]=n},n.parcelRequired7c6=a);var i=e(a("amrNH")).template({compiler:[8,">= 4.3.0"],main:function(e,n,l,t,a){var i,o=null!=n?n:e.nullContext||{},r=e.hooks.helperMissing,s="function",c=e.escapeExpression,u=e.lookupProperty||function(e,n){if(Object.prototype.hasOwnProperty.call(e,n))return e[n]};return"<li id='"+c(typeof(i=null!=(i=u(l,"id")||(null!=n?u(n,"id"):n))?i:r)===s?i.call(o,{name:"id",hash:{},data:a,loc:{start:{line:1,column:8},end:{line:1,column:14}}}):i)+'\' class=\'gallery__item\'>\n    <div class="overflowHidden">\n        <img class="gallery__img" src="https://image.tmdb.org/t/p/w500'+c(typeof(i=null!=(i=u(l,"poster_path")||(null!=n?u(n,"poster_path"):n))?i:r)===s?i.call(o,{name:"poster_path",hash:{},data:a,loc:{start:{line:3,column:70},end:{line:3,column:85}}}):i)+'" alt="'+c(typeof(i=null!=(i=u(l,"title")||(null!=n?u(n,"title"):n))?i:r)===s?i.call(o,{name:"title",hash:{},data:a,loc:{start:{line:3,column:92},end:{line:3,column:101}}}):i)+" "+c(typeof(i=null!=(i=u(l,"name")||(null!=n?u(n,"name"):n))?i:r)===s?i.call(o,{name:"name",hash:{},data:a,loc:{start:{line:3,column:102},end:{line:3,column:110}}}):i)+'"\n            id="'+c(typeof(i=null!=(i=u(l,"id")||(null!=n?u(n,"id"):n))?i:r)===s?i.call(o,{name:"id",hash:{},data:a,loc:{start:{line:4,column:16},end:{line:4,column:22}}}):i)+"\"\n            onerror=\"this.onerror=null;this.src='https://ik.imagekit.io/dqs5dhaf3/onerror_xia2bwu8M.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1664537019915';\" />\n    </div>\n    <div class='meta'>\n        <h2 class='gallery__title'>"+c(typeof(i=null!=(i=u(l,"title")||(null!=n?u(n,"title"):n))?i:r)===s?i.call(o,{name:"title",hash:{},data:a,loc:{start:{line:8,column:35},end:{line:8,column:44}}}):i)+"</h2>\n        <div class='discription'>\n            <p class='gallery__discription'>"+c(typeof(i=null!=(i=u(l,"genresName")||(null!=n?u(n,"genresName"):n))?i:r)===s?i.call(o,{name:"genresName",hash:{},data:a,loc:{start:{line:10,column:44},end:{line:10,column:58}}}):i)+"\n                |\n                "+c(typeof(i=null!=(i=u(l,"release_date")||(null!=n?u(n,"release_date"):n))?i:r)===s?i.call(o,{name:"release_date",hash:{},data:a,loc:{start:{line:12,column:16},end:{line:12,column:32}}}):i)+'<span class="gallery__vote">'+c(typeof(i=null!=(i=u(l,"vote_average")||(null!=n?u(n,"vote_average"):n))?i:r)===s?i.call(o,{name:"vote_average",hash:{},data:a,loc:{start:{line:12,column:60},end:{line:13,column:2}}}):i)+"</span></p>\n        </div>\n</li>"},useData:!0}),o=a("2nhTy");const r=document.querySelector(".watched"),s=document.querySelector(".queued"),c=document.querySelector(".gallery"),u=document.querySelector(".slider-wrapper"),d=document.querySelector("#btn_watched"),p=document.querySelector("#btn_queue"),m=document.querySelector("#activ-homeJs"),g=document.querySelector("#activ-libraryJs"),h=()=>JSON.parse(localStorage.getItem("watched-films-list")),_=()=>JSON.parse(localStorage.getItem("queued-films-list")),f=()=>null!==document.querySelector(".watched");function y(e){const n=e.map((e=>i(e))).join("");f()?(r.innerHTML=n,s.innerHTML=null):(r.innerHTML=null,s.innerHTML=n),c.innerHTML=null,o.pagination._offByEventName("afterMove","getResponseMovie"),o.pagination.on("afterMove",b)}d.addEventListener("click",(()=>{c.innerHTML=null,u.innerHTML=null,o.pagination.reset(h().length),y(v(h(),o.pagination._options.itemsPerPage,1)),p.classList.remove("btn_library_active"),d.classList.add("btn_library_active")})),p.addEventListener("click",(()=>{c.innerHTML=null,u.innerHTML=null,o.pagination.reset(_().length),y(v(_(),o.pagination._options.itemsPerPage,1)),d.classList.remove("btn_library_active"),p.classList.add("btn_library_active")})),m.addEventListener("click",(()=>{location.reload()})),g.addEventListener("click",(()=>{d.classList.add("btn_library_active"),p.classList.remove("btn_library_active"),c.innerHTML=null,u.innerHTML=null,o.pagination.reset(h().length),y(v(h(),o.pagination._options.itemsPerPage,1))}));const v=(e,n,l)=>e.slice((l-1)*n,l*n);function b(e){try{let e;e=f()?h():_();const n=v(e,o.pagination._options.itemsPerPage,o.pagination.getCurrentPage());e.length!==o.pagination._options.totalItems&&(console.log("getNextPage ~ pagination.reset",o.pagination.reset),o.pagination.reset(e.length)),console.log("getNextPage ~ pagination",o.pagination),console.log("getNextPage ~ currentStorage",e),y(n,f())}catch(e){console.log(e),Notify.failure(e.name)}window.scrollTo(0,0)}
//# sourceMappingURL=index.ccf17280.js.map
