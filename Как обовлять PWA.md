# Где прописаны версии

В файле **index.html** есть 

	<div class="version">v1</div>

В манифесте **manifest.json**

    "name": "Timer & Stopwatch 1",

И в **sw.js**

	const cacheName = 'timer-v001'

Для обновления PWA на устройствах надо изменить имя кеша.