require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Подключение к MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Успешно подключено к базе данных MongoDB'))
  .catch((err) => console.error('Ошибка подключения к базе данных:', err));

// Обновленная схема
const LinkSchema = new mongoose.Schema({
  category: { type: String, required: true },
  tooltip: { type: String },
  links: [
    {
      text: { type: String, required: true },
      url: { type: String }, // Убрали required
      description: { type: String },
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

// Маршрут для получения всех ссылок
app.get('/api/links', async (req, res) => {
  try {
    const links = await Link.find({});
    res.json(links);
  } catch (err) {
    console.error('Ошибка получения ссылок:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Маршрут для получения данных колонки по категории
app.get('/api/columns/:category', async (req, res) => {
  try {
    const category = decodeURIComponent(req.params.category);
    const column = await Link.findOne({ category });
    if (!column) {
      return res.status(404).json({ error: 'Колонка не найдена' });
    }
    res.json(column);
  } catch (err) {
    console.error('Ошибка получения колонки:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});