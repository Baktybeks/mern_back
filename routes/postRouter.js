const Router = require('express');
const {
  postCreateValidation
} = require('../validations');
const checkAuth = require('../middleware/checkAuth');
const handleValidationErrors = require('../middleware/handleValidationErrors');

const PostController = require('../controllers/PostController');
const router = new Router();

router.get('/', PostController.getAll);
router.get('/:id', PostController.getOne);
router.post('/', checkAuth, postCreateValidation, handleValidationErrors,  PostController.create);
router.delete('/:id', checkAuth, PostController.remove);
router.patch('/:id', handleValidationErrors, checkAuth, PostController.update)

module.exports = router;