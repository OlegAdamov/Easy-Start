!function(){var e=document.querySelector(".gallery"),l=document.querySelector("#btn_watched"),t=document.querySelector("#btn_queue"),n=JSON.parse(localStorage.getItem("watched-films-list")),i=JSON.parse(localStorage.getItem("queued-films-list"));l.addEventListener("click",(function(){e.innerHTML=null,e.insertAdjacentHTML("beforeend",void n.map((function(e){var l=e.poster,t=e.title;' <li id ="" class="gallery__item">\n        <a href="/" class="gallery__link">\n            <img src="https://image.tmdb.org/t/p/w500'.concat(l,'" alt="" class="gallery__img">\n\n           <h2 class="gallery__title">').concat(t,'</h2>\n            <div class ="discription"><p class="gallery__discription">$</p>\n            </div>\n        </a>\n    </li>')})))})),t.addEventListener("click",(function(){e.innerHTML=null,e.insertAdjacentHTML("beforeend",void i.map((function(e){var l=e.poster,t=e.title;' <li id ="" class="gallery__item">\n        <a href="/" class="gallery__link">\n            <img src="https://image.tmdb.org/t/p/w500'.concat(l,'" alt="" class="gallery__img">\n\n           <h2 class="gallery__title">').concat(t,'</h2>\n            <div class ="discription"><p class="gallery__discription">$</p>\n            </div>\n        </a>\n    </li>')})))}))}();
//# sourceMappingURL=index.77e46cd6.js.map
