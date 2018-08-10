const jsonServer = require('json-server');
const dbfile = require('./db');
const route = require('./route')
const server = jsonServer.create();
const router = jsonServer.router(dbfile);
const middlewares = jsonServer.defaults();

server.use(middlewares)
server.use(jsonServer.bodyParser)

//ajax post
// server.post('/ver1.0.0/file', function (req, res) {
//     res.jsonp({username: 'file', token: '6666'})
// })
server.use(function (req, res, next) {
  if (req.method === 'POST') {
    console.log('​body=>', req.body);
    req.method = 'GET';
    req.query = req.body;
  }
  next();
})

server.use(jsonServer.rewriter(route));
server.use(router);
server.listen(3003, function () {
  console.log('JSON Server is running');
})