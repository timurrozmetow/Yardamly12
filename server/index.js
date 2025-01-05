const express = require('express');
const mysql = require('mysql2/promise'); // Используем promise API
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

const uploadsDir = path.join(__dirname, 'uploads');

[uploadsDir].forEach((dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

// const dbConfig = {
//     host: 'localhost',
//     user: 'root',    
//     password: 'new_password', 
//     database: 'yardamly'  
// };

const dbConfig = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

let db;

const connectDB = async () => {
    try {
        db = await mysql.createConnection(dbConfig);
        console.log('Connected to the database');
    } catch (err) {
        console.error('Database connection error:', err);
        process.exit(1);
    }
};

// Добавить FAQ
app.post("/api/faqs", async (req, res) => {
  const {
    question_ru,
    question_tm,
    question_tr,
    question_en,
    answer_ru,
    answer_tm,
    answer_tr,
    answer_en,
  } = req.body;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [result] = await connection.execute(
      `INSERT INTO faqs (question_ru, question_tm, question_tr, question_en, 
                          answer_ru, answer_tm, answer_tr, answer_en)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        question_ru,
        question_tm,
        question_tr,
        question_en,
        answer_ru,
        answer_tm,
        answer_tr,
        answer_en,
      ]
    );
    connection.end();
    res
      .status(200)
      .send({ success: true, message: "Часто задаваемый вопрос успешно добавлен!" });
  } catch (error) {
    console.error("Ошибка добавления FAQ:", error);
    res.status(500).send({ success: false, message: "Ошибка добавления FAQ." });
  }
});

// Получить все FAQ
app.get("/api/faqs", async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute("SELECT * FROM faqs");
    connection.end();
    res.status(200).json(rows);
  } catch (error) {
    console.error("Ошибка получения FAQ:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

// Удалить FAQ
app.delete("/api/faqs/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [result] = await connection.execute("DELETE FROM faqs WHERE id = ?", [id]);
    connection.end();
    if (result.affectedRows > 0) {
      res
        .status(200)
        .send({ success: true, message: "Часто задаваемый вопрос успешно удален!" });
    } else {
      res.status(404).send({ success: false, message: "FAQ не найден." });
    }
  } catch (error) {
    console.error("Ошибка удаления FAQ:", error);
    res.status(500).send({ success: false, message: "Ошибка удаления FAQ." });
  }
});

// Обновить FAQ
app.put("/api/faqs/:id", async (req, res) => {
  const { id } = req.params;
  const {
    question_ru,
    question_tm,
    question_tr,
    question_en,
    answer_ru,
    answer_tm,
    answer_tr,
    answer_en,
  } = req.body;

  try {
    const connection = await mysql.createConnection(dbConfig);
    const [result] = await connection.execute(
      `UPDATE faqs 
       SET question_ru = ?, question_tm = ?, question_tr = ?, question_en = ?,
           answer_ru = ?, answer_tm = ?, answer_tr = ?, answer_en = ?
       WHERE id = ?`,
      [
        question_ru,
        question_tm,
        question_tr,
        question_en,
        answer_ru,
        answer_tm,
        answer_tr,
        answer_en,
        id,
      ]
    );
    connection.end();
    if (result.affectedRows > 0) {
      res
        .status(200)
        .send({ success: true, message: "Часто задаваемый вопрос обновлен!" });
    } else {
      res.status(404).send({ success: false, message: "FAQ не найден." });
    }
  } catch (error) {
    console.error("Ошибка обновления FAQ:", error);
    res.status(500).send({ success: false, message: "Ошибка обновления FAQ." });
  }
});

// Маршрут для получения данных формы
app.post("/api/contact", async (req, res) => {
  const { name, phone, message } = req.body;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [result] = await connection.execute(
      "INSERT INTO contact_form (name, phone, message) VALUES (?, ?, ?)",
      [name, phone, message]
    );
    connection.end();
    res.status(200).send({ success: true, message: "Данные успешно сохранены!" });
  } catch (error) {
    console.error("Ошибка сохранения данных формы:", error);
    res.status(500).send({ success: false, message: "Ошибка сохранения данных." });
  }
});

app.get('/api/contact', async (req, res) => {
  try {
      const [rows] = await db.query('SELECT * FROM contact_form'); // db - это ваш клиент базы данных
      res.json(rows); // Отправляем только данные, игнорируем метаданные
  } catch (error) {
      console.error('Ошибка при получении контактов:', error);
      res.status(500).json({ error: 'Ошибка сервера' });
  }
});


// Настройка хранения файлов
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/"); // Папка для сохранения изображений
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + path.extname(file.originalname)); // Уникальное имя файла
    },
  });
  
  const upload = multer({ storage });


  app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === '12345678') {
      res.json({ success: true });
    } else {
      res.status(401).json({ success: false, message: 'Неверные данные для входа' });
    }
  });
  


app.get('/api/news/lang/:lang', async (req, res) => {
    const { lang } = req.params;
    const validLanguages = ['ru', 'tm', 'tr', 'en'];

    if (!validLanguages.includes(lang)) {
        return res.status(400).json({ error: 'Недопустимый язык' });
    }

    try {
        const query = `SELECT id, title_${lang} AS title, description_${lang} AS description, image_url, created_at 
                       FROM news ORDER BY created_at DESC`;
        const [rows] = await db.query(query);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка при получении новостей' });
    }
});


// Получение всех новостей
app.get('/api/news', async (req, res) => {
    
    try {
        const [rows] = await db.query('SELECT * FROM news ORDER BY created_at DESC');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка при получении новостей' });
    }
});

// Получение новости по ID
app.get('/api/news/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM news WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Новость не найдена' });
        }
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка при получении новости' });
    }
});

// Маршрут для добавления новости
app.post("/api/news", upload.single("image"), async (req, res) => {
  const {
    title_ru,
    title_tm,
    title_tr,
    title_en,
    description_ru,
    description_tm,
    description_tr,
    description_en,
    content_ru,
    content_tm,
    content_tr,
    content_en,
  } = req.body;

  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const [result] = await db.query(
      `INSERT INTO news 
      (title_ru, title_tm, title_tr, title_en, 
      description_ru, description_tm, description_tr, description_en, 
      content_ru, content_tm, content_tr, content_en, image_url) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title_ru,
        title_tm,
        title_tr,
        title_en,
        description_ru,
        description_tm,
        description_tr,
        description_en,
        content_ru,
        content_tm,
        content_tr,
        content_en,
        imageUrl,
      ]
    );
    res.status(201).json({ id: result.insertId, message: "Новость успешно добавлена" });
  } catch (err) {
    console.error("Ошибка при добавлении новости:", err);
    res.status(500).json({ error: "Ошибка при добавлении новости" });
  }
});

// Маршрут для доступа к изображениям
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Удаление новости
app.delete('/api/news/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM news WHERE id = ?', [id]);
        res.status(200).json({ message: 'Новость удалена' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка при удалении новости' });
    }
});

// Получить все фотографии
app.get("/api/gallery", async (req, res) => {
  try {
      const [photos] = await db.query("SELECT * FROM photo_gallery ORDER BY created_at DESC");
      res.json(photos);
  } catch (err) {
      console.error("Ошибка получения фотографий:", err);
      res.status(500).json({ error: "Не удалось загрузить галерею" });
  }
});

// Добавить новую фотографию
app.post("/api/gallery", upload.single("image"), async (req, res) => {
  const { title_ru, title_tm, title_tr, title_en } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  if (!imageUrl) {
      return res.status(400).json({ error: "Изображение обязательно" });
  }

  try {
      await db.query(
          "INSERT INTO photo_gallery (title_ru, title_tm, title_tr, title_en, image_url) VALUES (?, ?, ?, ?, ?)",
          [title_ru, title_tm, title_tr, title_en, imageUrl]
      );
      res.status(201).json({ message: "Фотография добавлена" });
  } catch (err) {
      console.error("Ошибка добавления фотографии:", err);
      res.status(500).json({ error: "Не удалось добавить фотографию" });
  }
});

// Удалить фотографию
app.delete("/api/gallery/:id", async (req, res) => {
  const { id } = req.params;

  try {
      await db.query("DELETE FROM photo_gallery WHERE id = ?", [id]);
      res.json({ message: "Фотография удалена" });
  } catch (err) {
      console.error("Ошибка удаления фотографии:", err);
      res.status(500).json({ error: "Не удалось удалить фотографию" });
  }
});


connectDB().then(() => {
        app.listen(port, () => {
            console.log(`Сервер запущен на http://127.0.0.1:${port}`);
        });
    });