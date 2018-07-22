// ==UserScript==
// @name         Rolamento automatico na página com controle de velocidade
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Acrescenta um range input na pagina para controlar o rolamento automatico
// @author       Yuri Alves de ALmeida
// @match        https://www.bible.com/*/*
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
    document.querySelector('.reader-header.horizontal-center').prepend(range);

    var speed = range.value = range.max;
    range.oninput = () => console.log(speed = Number(range.value));

    var iniciar = () => setTimeout(() => {
        if (speed != range.max) setY(getY()+1);
        iniciar();
    }, speed);

    range.style.transform = 'rotate(180deg)';
    iniciar();
})();
