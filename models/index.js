const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: {type: String, required: true},
  avatarUrl: String
}, {timestamps: true});

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, required: true, unique: true },
  tags: {type: Array, default: []},
  viewsCount: { type: Number, default: 0 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User',  required: true,},
  imageUrl: String
}, {timestamps: true});

module.exports = {
  UserModel: mongoose.model('User', UserSchema),
  PostModel: mongoose.model('Post', PostSchema)
};