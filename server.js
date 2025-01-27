require('dotenv').config(); // Загружаем переменные окружения из .env файла

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Для парсинга application/json

// Строка подключения к MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Успешно подключено к базе данных MongoDB');
  })
  .catch((err) => {
    console.error('Ошибка подключения к базе данных:', err);
  });

// Схема и модель для ссылок
const LinkSchema = new mongoose.Schema({
  category: String,
  links: [
    {
      text: String,
      url: String,
      description: String,
      additionalLinks: [
        {
          text: String,
          url: String,
        },
      ],
    },
  ],
});
const Link = mongoose.model('Link', LinkSchema);

// Маршрут для получения ссылок
app.get('/api/links', async (req, res) => {
  try {
    const links = await Link.find({});
    res.json(links);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
