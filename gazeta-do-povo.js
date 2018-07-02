// ==UserScript==
// @name         Gazeta do povo
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Permite leitura no site gazeta do povo sem assinatura
// @author       Yuri Alves
// @match        https://www.gazetadopovo.com.br/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    fetch(location.href)
        .then(r => r.text())
        .then(response => {
        var h = document.createElement('html');
        h.innerHTML = response;
        window.addEventListener('load', () => {
            var scroll = () => {
                var article = document.querySelector('#article-text'),
                    article2 = h.querySelector('#article-text');
                article.innerHTML = article2.innerHTML;
            };
            window.onscroll = scroll;
            scroll();
        });
    })

})();
