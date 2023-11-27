const Router = require('express');
const {
  registerValidation,
  loginValidation
} = require('../validations');
const checkAuth = require('../middleware/checkAuth');
const handleValidationErrors = require('../middleware/handleValidationErrors');

const UserController = require('../controllers/UserController');
const router = new Router();

router.post('/register', registerValidation, handleValidationErrors, UserController.register);
router.post('/login', loginValidation, handleValidationErrors, UserController.login);
router.get('/me', checkAuth, UserController.getMe);


module.exports = router;