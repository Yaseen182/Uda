const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const path = require('path');
const cheerio = require('cheerio');
const axios = require('axios');

const app = express();
const PORT = 8081;

// Middleware لتحليل البيانات
app.use(bodyParser.json());

// تقديم الملفات الثابتة
app.use(express.static(path.join(__dirname, 'dist')));

// رابط API الخاص بـ NLP
const NLP_API_URL = 'https://kooye7u703.execute-api.us-east-1.amazonaws.com/NLPAnalyzer';

// استخراج النص من رابط URL
const scrapeText = async (url) => {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const text = $('body').text().slice(0, 200); // فقط أول 200 حرف
    return text;
  } catch (error) {
    console.error('خطأ في استخراج النص:', error);
    throw error;
  }
};

// نقطة النهاية لمعالجة الطلبات
app.post('/process-url', async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'يرجى إدخال رابط URL' });
  }

  try {
    const extractedText = await scrapeText(url);

    const response = await fetch(NLP_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: extractedText }),
    });

    const apiData = await response.json();

    // إرسال النتيجة إلى الواجهة الأمامية
    res.json({
      sentiment: apiData.sentiment,
      contentType: apiData.contentType,
      textPreview: extractedText,
    });

  } catch (error) {
    console.error('حدث خطأ أثناء المعالجة:', error);
    res.status(500).json({ error: 'حدث خطأ في المعالجة' });
  }
});

// تشغيل السيرفر
app.listen(PORT, () => {
  console.log(`السيرفر يعمل على الرابط: http://localhost:${PORT}`);
});
