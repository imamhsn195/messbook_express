const express = require('express');

const multer  = require('multer');

const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const path = 'public/uploads/users/'
        fs.mkdirSync(path, { recursive: true })
      cb(null, path)
    },
    filename: function (req, file, cb) {
      const profile_picture = Date.now() + '-' + file.originalname;
      cb(null, profile_picture )
    }
  })

const upload = multer({ storage: storage });

const router = express.Router();

const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers );

router.get('/:id', userController.getUserById );

router.post('/create', upload.single('profile_picture'), userController.createUser );

router.put('/:id', userController.updateUser );

router.delete('/:id', userController.deleteUser )

module.exports = router;
