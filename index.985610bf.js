const e=document.querySelector("#back-top");e.addEventListener("click",(function(){let e=Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight);window.scrollBy({top:-e,behavior:"smooth"})})),window.onscroll=function(){document.body.scrollTop>400||document.documentElement.scrollTop>400?e.style.display="block":e.style.display="none"};
//# sourceMappingURL=index.985610bf.js.map
