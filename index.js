require('dotenv').config();
const express = require('express');
const router = require('./routes/index');
const connectDB = require('./db');
const multer = require('multer');
const checkAuth = require('./middleware/checkAuth');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer ({storage})

app.use(express.json());
app.use(cors())
app.use('/api', router);
app.use('/uploads', express.static('uploads'));

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  console.log(req);
  res.json({
    url: `/uploads/${req.file.originalname}`
  })
})

app.get('/', (req, res) => {
  res.status(200).json({ message: 'WORKING' });
});

const start = async() => {
  try {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch(err) {
    console.log(err);
  }
};
connectDB();
start();