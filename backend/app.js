require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const limiter = require('./utils/limiter');
const router = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, DB_PATH = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const app = express();

app.use(helmet());
app.use(limiter);

app.use(cors({ origin: ['https://projectmestorus.nomoredomainsmonster.ru', 'http://projectmestorus.nomoredomainsmonster.ru', 'http://localhost:3000'] }));

mongoose.connect(DB_PATH, {
  useNewUrlParser: true,
})
  .then(() => console.log('Server is working'))
  .catch(() => console.log('No connection to server'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(router);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
