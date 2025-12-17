const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Merhaba! Jenkins ile Kubernetes’e başarıyla deploy edildi.');
});

app.listen(port, () => {
  console.log(`Uygulama http://localhost:${port} adresinde çalışıyor`);
});