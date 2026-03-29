const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const app = express();

const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => cb(null, Date.now() + '.jpg')
});
const upload = multer({ storage });

app.post('/upload', upload.single('frame'), (req, res) => {
  console.log('GOT PICTURE:', req.file.filename);
  res.send('OK');
});

app.get('/', (req, res) => res.send('Server OK'));

app.listen(3000, () => console.log('Render server on 3000'));
