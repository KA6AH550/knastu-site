require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:8080', 'https://prof-guit.netlify.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(express.json());
app.use(bodyParser.json());

// Подключение к MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Успешно подключено к базе данных MongoDB'))
  .catch((err) => console.error('Ошибка подключения к базе данных:', err));

// Схема
const LinkSchema = new mongoose.Schema({
  category: { type: String, required: true },
  tooltip: { type: String },
  links: [
    {
      text: { type: String, required: true },
      url: { type: String },
      description: { type: String },
      additionalLinks: [{ text: String, url: String }],
    },
  ],
});

const Link = mongoose.model('Link', LinkSchema);

// Получение всех ссылок
app.get('/api/links', async (req, res) => {
  try {
    const links = await Link.find({});
    res.json(links);
  } catch (err) {
    console.error('Ошибка получения ссылок:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Получение колонки по категории
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

// Добавление новой колонки
app.post('/api/links', async (req, res) => {
  try {
    const { category, tooltip } = req.body;
    if (!category) {
      return res.status(400).json({ error: 'Категория обязательна' });
    }
    const newColumn = new Link({ category, tooltip, links: [] });
    await newColumn.save();
    res.status(201).json(newColumn);
  } catch (err) {
    console.error('Ошибка добавления колонки:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Обновление колонки
app.put('/api/links/:columnId', async (req, res) => {
  try {
    console.log('Полученные данные для обновления колонки:', req.body); // Для отладки
    const { category, tooltip, links } = req.body;
    const column = await Link.findById(req.params.columnId);
    if (!column) {
      return res.status(404).json({ error: 'Колонка не найдена' });
    }
    if (category) column.category = category;
    if (tooltip) column.tooltip = tooltip;
    if (links) column.links = links; // Обновляем links, если переданы
    await column.save();
    res.json(column);
  } catch (err) {
    console.error('Ошибка обновления колонки:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});



// Добавление ссылки в колонку
app.post('/api/links/:columnId/links', async (req, res) => {
  try {
    const { text, url, description, additionalLinks } = req.body;
    const column = await Link.findById(req.params.columnId);
    if (!column) {
      return res.status(404).json({ error: 'Колонка не найдена' });
    }
    column.links.push({ text, url, description, additionalLinks });
    await column.save();
    res.json(column);
  } catch (err) {
    console.error('Ошибка добавления ссылки:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Редактирование ссылки
app.put('/api/links/:columnId/links/:linkIndex', async (req, res) => {
  try {
    const { text, url, description, additionalLinks } = req.body;
    console.log('Данные для редактирования:', req.body); // Для отладки
    const column = await Link.findById(req.params.columnId);
    if (!column) {
      return res.status(404).json({ error: 'Колонка не найдена' });
    }

    const linkIndex = parseInt(req.params.linkIndex);
    if (isNaN(linkIndex) || linkIndex >= column.links.length) {
      return res.status(404).json({ error: 'Ссылка не найдена' });
    }

    // Проверяем, что текст обязателен
    if (!text) {
      return res.status(400).json({ error: 'Текст ссылки обязателен' });
    }

    // Проверяем дополнительные ссылки
    if (additionalLinks && Array.isArray(additionalLinks)) {
      for (const link of additionalLinks) {
        if (!link.text || !link.url) {
          return res.status(400).json({ error: 'Текст и URL обязательны для дополнительных ссылок' });
        }
      }
    }

    // Обновляем ссылку
    column.links[linkIndex] = {
      text: text,
      url: url || '', // Если url не передан, используем пустую строку
      description: description || '', // Если description не передан, используем пустую строку
      additionalLinks: additionalLinks || [] // Используем переданные additionalLinks или пустой массив
    };

    await column.save();
    res.json(column);
  } catch (err) {
    console.error('Ошибка редактирования ссылки:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Удаление колонки
app.delete('/api/links/:columnId', async (req, res) => {
  try {
    const column = await Link.findByIdAndDelete(req.params.columnId);
    if (!column) {
      return res.status(404).json({ error: 'Колонка не найдена' });
    }
    res.json({ message: 'Колонка удалена' });
  } catch (err) {
    console.error('Ошибка удаления колонки:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Удаление ссылки
app.delete('/api/links/:columnId/links/:linkIndex', async (req, res) => {
  try {
    const column = await Link.findById(req.params.columnId);
    if (!column) {
      return res.status(404).json({ error: 'Колонка не найдена' });
    }
    const linkIndex = req.params.linkIndex;
    if (linkIndex >= column.links.length) {
      return res.status(404).json({ error: 'Ссылка не найдена' });
    }
    column.links.splice(linkIndex, 1);
    await column.save();
    res.json(column);
  } catch (err) {
    console.error('Ошибка удаления ссылки:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});