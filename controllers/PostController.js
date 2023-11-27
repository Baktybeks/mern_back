const { PostModel } = require('../models');
const create = async(req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      tags: req.body.tags,
      imageUrl: req.body.imageUrl,
      user: req.userId
    });

    const post = await doc.save();
    res.json(post);

  } catch(err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось создать статью'
    });
  }
};

const getAll = async(req, res) => {
  try {
    const posts = await PostModel.find().populate('user').exec();
    res.json(posts);
  } catch(err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить статьи'
    });
  }
};
const getOne = async(req, res) => {
  try {
    const postId = req.params.id;
    const doc = await PostModel.findOneAndUpdate(
      { _id: postId },
      { $inc: { viewsCount: 1 } },
      { returnDocument: 'after' }
    ).populate('user').exec();
    if (!doc) {
      return res.status(404).json({ message: 'Статья не найдена' });
    }
    res.json(doc);
  } catch(err) {
    console.error(err);
    res.status(500).json({
      message: 'Не удалось получить статью'
    });
  }
};
const remove = async(req, res) => {
  try {
    const postId = req.params.id;
    const deletedDoc = await PostModel.findByIdAndDelete({ _id: postId });
    if (!deletedDoc) {
      return res.status(404).json({ message: 'Статья не найдена' });
    }
    res.json({ success: true });
  } catch(err) {
    console.error(err);
    res.status(500).json({
      message: 'Не удалось удалить статью'
    });
  }
};

const update = async(req, res) => {
  try {
    const postId = req.params.id;
    await PostModel.updateOne({
      _id: postId,
    }, {
      title: req.body.title,
      text: req.body.text,
      tags: req.body.tags,
      imageUrl: req.body.imageUrl,
      user: req.userId
    });
    res.json({ success: true });
  } catch(err) {
    console.error(err);
    res.status(500).json({
      message: 'Не удалось обновить статью'
    });
  }
};


module.exports = {
  create,
  getAll,
  getOne,
  remove,
  update
};