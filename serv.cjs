/*
const http = require('http');

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain')
  res.end("<h1>Something!!!<h1>");
});

server.listen(82, '127.0.0.1',()=>{console.log('start')});
*/

/*import http from 'node:http';
const server = http.createServer();

server.on('request', (request, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    data: 'Мои данные',
  }));
  console.log(res)
});

server.listen(82, '127.0.0.1', () => { console.log('start') });*/


const http = require('http');
const server = http.createServer((req, res) => {
  // Собираем информацию о запросе
  const requestInfo = {
    method: req.method,
    url: req.url,
    httpVersion: req.httpVersion,
    headers: req.headers
  };

  // Формируем HTML-ответ
  let html = `
    <html>
    <head><title>HTTP Headers Explorer</title></head>
    <body>
      <h1>Полученный HTTP-запрос</h1>
      <div style="margin: 20px 0;">
        <strong>Метод:</strong> ${requestInfo.method}<br>
        <strong>URL:</strong> ${requestInfo.url}<br>
        <strong>HTTP-версия:</strong> HTTP/${requestInfo.httpVersion}
      </div>

      <h2>Заголовки запроса:</h2>
      <table border="1" cellpadding="5">
        <tr><th>Заголовок</th><th>Значение</th></tr>`;

  // Добавляем все заголовки в таблицу
  for (const [key, value] of Object.entries(requestInfo.headers)) {
    html += `<tr><td>${key}</td><td>${value}</td></tr>`;
  }

  html += `
      </table>

      <h2>Экспериментируйте!</h2>
      <p>Попробуйте отправить запрос с разными заголовками (например, через curl или браузер).</p>
      <p><strong>Пример curl:</strong></p>
      <pre>curl -H "X-Custom-Header: test" -H "User-Agent: MyClient" http://127.0.0.1:82</pre>
    </body>
    </html>`;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('X-Custom-Header', 'test');
  res.end(html);
});

server.listen(82,
   '127.0.0.1', 
   () => { console.log('start') });
