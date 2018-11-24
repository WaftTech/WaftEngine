'use strict';

const http = require('http');
const app = require('./app');
const port = process.env.PORT || 5002;
const server = http.createServer(app);

app.set('PORT_NUMBER', port);

//  Start the app on the specific interface (and port).
server.listen(port, () => {
  console.log(app._router.stack);
  console.log(`API Docs Server application started on port ${port} at Date ${new Date()}`);
});

process.on('SIGTERM', () => {
  server.close(() => {
    process.exit(0);
  });
});

module.exports = server;
