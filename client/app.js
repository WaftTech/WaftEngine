const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');

app.use('/', express.static(path.join(__dirname, './build')));
const outputPath = path.resolve(process.cwd(), 'build');
app.use((req, res, next) => {
  res.sendFile(path.resolve(outputPath, 'index.html'));
});

module.exports = app;
