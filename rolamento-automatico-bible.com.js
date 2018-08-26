// ==UserScript==
// @name         Rolamento automatico na página com controle de velocidade
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Acrescenta um range input na pagina para controlar o rolamento automatico
// @author       Yuri Alves de ALmeida
// @match        https://my.bible.com/*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var posMax = () => document.body.scrollHeight - window.innerHeight;
    var getY   = () => document.body.scrollTop;
    var setY   = pos => document.body.scrollTop = pos;

    var range = document.createElement('input');
    range.type = 'range';
    range.min = 0;
    range.max = 200;
    // range.max = posMax()
    // range.oninput = () => setY(Number(range.value));
    document.querySelector('.reader-header.horizontal-center').prepend(range);

    var speed = range.value = range.max;
    range.oninput = () => console.log(speed = Number(range.value));

    var iniciar = () => setTimeout(() => {
        if (speed != range.max) setY(getY()+1);
        iniciar();
    }, speed);

    range.style.transform = 'rotate(180deg)';
    iniciar();

    var estilo = document.createElement('style');
    document.body.append(estilo);

    estilo.innerHTML = `
.yv-sticky-header-content.yv-sticky-header-fixed, .reader-header.horizontal-center, .footer-container {
	background: #333 !important;
}
input, input[type=search], .search{
	background: #444;
	color: #fff;
}
svg.searchicon-container {
	background: #444 !important;
}
#react-app-Bible >div {
	background: #222 !important;
	color: #888;
}
div[dir=left], div[dir=right] {
	background: #333;
}
`;
})();
