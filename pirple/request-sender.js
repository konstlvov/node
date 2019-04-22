/*
Скрипт для отправки запросов в сервер (например, для разработки на nodejs)

Запустить Firefox, пойти на localhost:3000 и открыть простой редактор Javascript через Shift-F4.
Потом можно посылать запросы в сервер, нажимая Ctrl-R
*/
async function sendRequest() {
  let promiseSync = await fetch('sample', {"method": "post", body: "This is the body we are sending"});
  let response = await promiseSync.text(); // will not work without "await" word
  console.log(response);
};
sendRequest();
