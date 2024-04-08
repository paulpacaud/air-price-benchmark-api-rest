const cors = require('cors');
const express = require('express');
const router = require('./router');
const errorMiddleware = require('./common/middleware/error.middleware');
const http = require('http');

const app = express();

app.use(express.json());

app.use(cors());

app.use('/v1', router);

app.use(errorMiddleware);

const port = 8080;

const server = http.createServer(app);

server.listen(port, () => {
  console.info(`Server is listening on port ${port}`);
});
