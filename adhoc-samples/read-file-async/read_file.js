// сначала полностью читает файл data.txt в память, потом начинает передавать его клиенту
const http = require('http')
const fs = require('fs')
const server = http.createServer(function (req, res) {
  fs.readFile(__dirname + '/data.txt', (err, data) => {
    res.end(data)
  })
})
server.listen(3000)