require('dotenv').config();
const http = require('http');
const app = require('./app');
const port = process.env.PORT;
const live = process.env.LIVE_URL;
const app_name = process.env.APP_NAME;
const server = http.createServer(app);

app.set('PORT_NUMBER', port);

server.listen(port, () => {
  const current_date = new Date();
  console.table([{ 'Application Name': app_name, PORT: port, 'Started At': current_date, 'Local Link': 'http://localhost:' + port, 'Live Link': live }]);
});

process.on('SIGTERM', () => {
  server.close(() => {
    process.exit(0);
  });
});

module.exports = server;
