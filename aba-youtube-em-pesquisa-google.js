// ==UserScript==
// @name         Aba Youtube em pesquisa google
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Substitui a aba de 'Vídeos' por 'Youtube' em pesquisas google
// @author       Yuri Alves de Almeida
// @match        https://www.google.com/search?*
// @include      https://www.google.com.br/search?*
// @grant        none
// ==/UserScript==

window.addEventListener('load', function trocarAbaVideos() {
    let searchValue = document.querySelector('.gsfi').value;
    [...document.querySelectorAll('a.q.qs')].map(aba => {
        if (aba.innerText == 'Vídeos') {
		  aba.innerText = 'Youtube'
		  aba.href = "https://www.youtube.com/results?search_query=" + searchValue;
		}
	  return aba;
    });
});
