const http = require('http');
const app = require('./app');
const port = process.env.PORT || 5012;
const server = http.createServer(app);

app.set('PORT_NUMBER', port);

//  Start the app on the specific interface (and port).
server.listen(port, () => {
  console.log(`Design Server started on port ${port} at Date ${new Date()}`);
});

process.on('SIGTERM', () => {
  server.close(() => {
    process.exit(0);
  });
});

module.exports = server;
