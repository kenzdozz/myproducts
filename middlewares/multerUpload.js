
import multer from 'multer';
import path from 'path';

const multerUpload = (field, required = true) => async (request, response, next) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images')
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now().toString()}${path.extname(file.originalname)}`);
    }
  });

  const fileFilter = (req, file, cb) => {
    const filetypes = ['image/png', 'image/jpeg'];
    const mimetype = filetypes.includes(file.mimetype);
    if (mimetype) return cb(null, true);
    if (required) req.body[file.fieldname] = 'invalid';
    return cb(null, false);
  };

  const upload = multer({ storage, fileFilter }).single(field);
  upload(request, response, (err) => {
    if (err) {
      if (required) request.body[field] = 'invalid';
    } else {
      const filePath = request.file && request.file.path ? request.file.path.split('public')[1] : 'invalid';
      if (required || filePath !== 'invalid') request.body[field] = filePath;
    }
    return next();
  });
};

export default multerUpload;
