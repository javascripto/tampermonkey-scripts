// ==UserScript==
// @name         Youtube Funções
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Acrescenta Botões de funções em vídeos do Youtube
// @author       Yuri Alves de Almeida
// @match        https://www.youtube.com/watch?*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
  var el = (el, html) => {
	el = document.createElement(el);
	el.innerHTML = html;
	return el;
  };
  var estilo = '.meubtn{background: #1a1a1a; color:#fff; border-color:#111;} .meubtn:focus{outline: none}';
  estilo = el('style', estilo);
  var btnDownload  = el('button', '⇓');
  var btnDownAudio = el('button', '♪');
  var btnThumbnail = el('button', 'Thumbnails');
  var btnKeywords  = el('button', 'Keywords');
  var btnEmbed     = el('button', '⇳');

  btnDownload.onclick  = () => window.open(location.href.split('&')[0].replace('tube', 'tubepp'));
  btnDownAudio.onclick = () => window.open('https://y2mate.com/pt/youtube-to-mp3/'+location.href.split('&')[0].split('?v=')[1]);
  btnThumbnail.onclick = () => {
	['maxresdefault', 'hqdefault']
	  .forEach(size => window.open(`https://img.youtube.com/vi/url/${size}.jpg`
								   .replace('url', location.href.split('&')[0].split('/')[3].split('=')[1])));
  };
  btnKeywords.onclick = () => alert(ytplayer.config.args.keywords.split(',').join('\n'));
  btnEmbed.onclick = () => {
	document.querySelector('video').pause();
	var buscar = (chave) => {
	  if (location.search.indexOf(chave) == -1) return '';
	  return location.search.replace('?', '')
		.split('&')
		.map(i=>i.split('='))
		.filter(i => i[0] == chave)[0][1];
	};
	var list = buscar('list');
	list = list ? '?list='+list : '';
	window.open(`https://youtube.com/embed/${buscar('v')}/${list}`);
  };

  var acrescentarBotoes = () => {
	var botoes = document.querySelector('#menu.style-scope.ytd-video-primary-info-renderer').children[0];
	document.body.append(estilo);
	[btnDownload, btnDownAudio, btnEmbed, btnThumbnail, btnKeywords].forEach(botao => {
	  botao.className = 'meubtn';
	  botoes.append(botao);
	});
  };
  window.addEventListener('load', acrescentarBotoes);
  setTimeout(acrescentarBotoes, 3000);
})();
