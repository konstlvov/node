let router = require('express').Router()

router.post('/stubapi/newclient', function (rq, rs) {
  // body of HTTP request contains string {"clientRef": "1", "login": "иван", "passwd": "муля", "eventId": "123"}
  // here it is already parsed into JS [object Object], so we use JSON.stringify to show it as
  // string again
  console.log('Requested endpoint /stubapi/newclient, request body: ' + JSON.stringify(rq.body));
  //console.log('clientRef: ' + rq.body.clientRef); // this is how to access current field
  var jsonAnswer = {"status": "ok", "answer_from": "/stubapi/newclient"};
  rs.status(200).send(jsonAnswer); // status 200 OK
  //rs.status(404).send('Sorry, something went wrong...'); // this is how to send 404 answer
});

router.post('/stubapi/updateclient', function (rq, rs) {
  console.log('Requested endpoint /stubapi/updateclient, request body: ' + JSON.stringify(rq.body));
  var jsonAnswer = {"status": "ok", "answer_from": "/stubapi/updateclient"};
  rs.status(200).send(jsonAnswer);
});

router.post('/stubapi/deactivateclient', function (rq, rs) {
  console.log('Requested endpoint /stubapi/deactivateclient, request body: ' + JSON.stringify(rq.body));
  var jsonAnswer = {"status": "ok"};
  rs.status(200).send(jsonAnswer);
});

router.post('/stubapi/passchange', function (rq, rs) {
  console.log('Requested endpoint /stubapi/passchange, request body: ' + JSON.stringify(rq.body));
  var jsonAnswer = {"status": "ok"};
  rs.status(200).send(jsonAnswer);
});

router.put('/stubapi/selfblock', function (rq, rs) {
  console.log('Requested endpoint /stubapi/selfblock, request body: ' + JSON.stringify(rq.body));
  //var jsonAnswer = {"status": "ok"};
  //rs.status(200).send(jsonAnswer);
  rs.status(200).send('');
});

router.post('/stubapi/kcblock', function (rq, rs) {
  console.log('Requested endpoint /stubapi/kcblock, request body: ' + JSON.stringify(rq.body));
  var jsonAnswer = {"status": "ok"};
  rs.status(200).send(jsonAnswer);
});

router.post('/stubapi/kcunblock', function (rq, rs) {
  console.log('Requested endpoint /stubapi/kcunblock, request body: ' + JSON.stringify(rq.body));
  var jsonAnswer = {"status": "ok"};
  rs.status(200).send(jsonAnswer);
});

router.post('/stubapi/kcunblockandpasschange', function (rq, rs) {
  console.log('Requested endpoint /stubapi/kcunblockandpasschange, request body: ' + JSON.stringify(rq.body));
  var jsonAnswer = {"status": "ok"};
  rs.status(200).send(jsonAnswer);
});

module.exports = router;
