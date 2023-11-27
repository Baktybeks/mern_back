const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}` +
      `@mern.vol7r9w.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    );
    console.log('DB connected');
  } catch (err) {
    console.error('DB connection error:', err);
  }

};



module.exports = connectDB;
