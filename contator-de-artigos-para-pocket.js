// ==UserScript==
// @name         Contador de artigos no pocket
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Adiciona Contador de artigos no pocket
// @author       Yuri Alves de Almeida
// @match        https://getpocket.com/a/queue*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var titulos = [...document.querySelectorAll('.queue_title.queue_title_main.queue_title_queue')];
    var contar = () => {
        var artigos = document.querySelectorAll('.item_link');
        titulos.map( titulo => titulo.innerText = `Minha Lista - ${artigos.length} artigos`);
    };
    setInterval(contar, 3000);
    window.addEventListener('load', contar);
})();
