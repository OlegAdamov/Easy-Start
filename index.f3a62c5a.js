!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},o={},n=e.parcelRequired7c6;null==n&&((n=function(e){if(e in t)return t[e].exports;if(e in o){var n=o[e];delete o[e];var i={id:e,exports:{}};return t[e]=i,n.call(i.exports,i,i.exports),i.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){o[e]=t},e.parcelRequired7c6=n),n("fnlMC");var i={save:(e,t)=>{try{const o=JSON.stringify(t);localStorage.setItem(e,o)}catch(e){console.error("Set state error: ",e.message)}},load:e=>{try{const t=localStorage.getItem(e);return null===t?void 0:JSON.parse(t)}catch(e){console.error("Get state error: ",e.message)}}},a=n("hVKDR");const r={galleryRef:document.querySelector(".gallery"),closeBtn:document.querySelector(".modal-close-btn"),backdrop:document.querySelector(".backdrop"),modalContainer:document.querySelector(".modal-container")};r.galleryRef.addEventListener("click",(function(e){e.preventDefault();const t=e.target.closest(".gallery__item");if(!t)return;r.galleryRef.addEventListener("keydown",(e=>{"Escape"===e.key&&r.backdrop.classList.add("is-hidden")})),o=t.id,async function(e){const t=await fetch(`https://api.themoviedb.org/3/movie/${e}?api_key=ba12bbb2efd4020faab2c5dd14dc19c0&language=en-US`);return await t.json()}(o).then((e=>{r.modalContainer.innerHTML=`\n    \n    <div class="modal-img">\n    <img src="https://image.tmdb.org/t/p/w500${e.poster_path}" alt="${e.title} ${e.name}" class="image" />\n  </div>\n  <div class="modal-rest">\n  <h3 class="modal-title">${e.title}</h3>\n      <div class="modal-info">\n        <div class="modal-description">\n          <p class="info-item">Vote / Votes</p>\n          <p class="info-item">Popularity</p>\n          <p class="info-item">Original Title</p>\n          <p class="info-item">Genre</p>\n        </div>\n        <div class="modal-count">\n          <p class="count" id="vote">${e.vote_average}</p>\n          <p class="count">${e.popularity}</p>\n          <p class="count">${e.original_title}</p>\n          <p class="count" id="genre">Western</p>\n        </div>\n        </div>\n        <p class="about">About</p>\n        <p class="about-info">${e.overview}\n        </p>\n        </div>`,l=e.title,u=e.vote_average,s=e.poster_path;const t=[];e.genres.forEach((e=>{t.push(e.name)})),c=t.join(", "),d=e.release_date.split("-")[0]})),r.backdrop.classList.remove("is-hidden");var o}));let l=null,s=null,d=null,c=null,u=null;window.addEventListener("click",(e=>{e.target===r.backdrop&&r.backdrop.classList.add("is-hidden")})),r.closeBtn.addEventListener("click",(()=>{r.backdrop.classList.add("is-hidden")}));const f=document.querySelector(".add-to-watch"),p=document.querySelector(".add-to-queue"),m=(document.querySelector(".modal-title"),document.querySelector("#genre"),document.querySelector(".image"),document.querySelector("#vote"),"watched-films-list"),v="queued-films-list";f.addEventListener("click",(()=>{const e={title:l,poster:s,date:d,genre:c,vote:u};if(!i.load(m))return i.save(m,[e]),void a.Notify.info("Added to Watched");const t=i.load(m);for(const o of t)if(JSON.stringify(o)===JSON.stringify(e))return void a.Notify.info("Film is already in Watched");t.push(e),i.save(m,t),a.Notify.info("Added to Watched")})),p.addEventListener("click",(()=>{const e={title:l,poster:s,date:d,genre:c,vote:u};if(!i.load(v))return i.save(v,[e]),void a.Notify.info("Added to Queue");const t=i.load(v);for(const o of t)if(JSON.stringify(o)===JSON.stringify(e))return void a.Notify.info("Film is already in Queue");t.push(e),i.save(v,t),a.Notify.info("Added to Queue")}))}();
//# sourceMappingURL=index.f3a62c5a.js.map
