// ==UserScript==
// @name         Feedly mark as read
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  marcar posts de feeds como lidos ao subir acima do topo da tela no feedly
// @author       Yuri Alves de Almeida
// @match        https://feedly.com/*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var itemsSelector = '.entry.unread.u5.density-29';
    var items = document.querySelectorAll(itemsSelector);
    var removidos = []

    window.onscroll = (event)  => {
        clearTimeout(window.timeout);
        window.timeout = setTimeout(() => {
            items = document.querySelectorAll(itemsSelector);
            items.forEach(item => {
                if (item.getBoundingClientRect().y < 0 && !removidos.includes(item)) {
                    item.querySelector('.mark-as-read').click();
                    console.log(item.children[1].children[0].innerText);
                    removidos.push(item);
                }
            });
        }, 500);
    }
})();
