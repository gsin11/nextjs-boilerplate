const express = require('express');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Custom handler which will redirect you to /[country]
  server.get('/custom/:country', (req, res) => {
    const { country } = req.params;
    return app.render(req, res, '/', { country });
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if(err) {
      throw err;
    }

    console.log("Server is ready on", port , "port");
  })
})