// ==UserScript==
// @name         Youtube tempo total playlist
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Contador de tempo da Playlist Youtube
// @author       Yuri Alves de Almeida
// @match        https://www.youtube.com/playlist?list=*
// @grant        none
// ==/UserScript==

function copyLinks() {
  let links = [...document.querySelectorAll('#content > a')].map(i=>i.href).join('\n');
  let textarea = document.createElement('textarea');
  document.body.append(textarea);
  textarea.value = links;
  textarea.select();
  document.execCommand("Copy");
  textarea.remove();
  console.log(links);
}

var btnCopy = document.createElement('button');
btnCopy.onclick = copyLinks;
// btnCopy.innerText = '📋 Copiar Links';
btnCopy.innerHTML = '<img src="https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_content_copy_white_24px.svg">';
btnCopy.style.background = '#1a1a1a';
btnCopy.style.color = '#fff';
btnCopy.style.border = 'none';
window.addEventListener('load', () => {
  document.querySelector('#menu > ytd-menu-renderer').append(btnCopy);
});

var str2sec = (str) => {
    var t = str.split(':').map(i=>parseInt(i));
    return (t.length==2) ? t[0]*60 + t[1] : t[0]*3600 + t[1]*60+t[2];
};
var resto = (a,b) => Math.round(b*(a/b-parseInt(a/b))); /*Correção para scripts de url inline que não aceita caracteres especiais como '%' */
var sec2str = (seg)=>{
    var addZero = (n)=>(n<10) ? '0'+n : ''+n;
    seg = Math.abs(seg);
    return 	(seg<60) ? `00:${addZero(seg)}` : (seg<3600) ? `${addZero(parseInt(seg/60))}:${addZero(seg%60)}` : `${addZero(parseInt(seg/3600))}:${sec2str(seg%3600)}`;
};

var segundosDaPlaylist = function(seletor) {
    var playlist = document.querySelectorAll(seletor);
    return [].slice.call(playlist)
        .map(i=>i.innerText)
        .map(str2sec)
        .reduce((a,b)=>a+b, 0);
};

var seletor = '.ytd-thumbnail-overlay-time-status-renderer';

setInterval(function(){
    document.querySelector('.style-scope.ytd-thumbnail-overlay-side-panel-renderer').innerText = sec2str(segundosDaPlaylist(seletor));
}, 1000);

// Limpar URL's da playlist
setTimeout(() => [].slice.call(document.querySelectorAll('a.ytd-playlist-video-renderer.style-scope')).map(i=>(i.href = i.href.split('&')[0])), 3000);
