const multer = require("multer");
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/uploads/');
  },
  filename: async (req, file, callback) => {
    let fullFileName = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
    // await SomeModel.create('public/uploads/' + fullFileName, req.params.userId, req.params.patientId);
    callback(null, fullFileName);
  }
});

const upload = multer({ 
  storage: storage, 
  limits: {fileSize: 10000000}/* ,
  fileFilter: (req, file, cb) => {
    // filter file types etc...
  }  */
}).array('images', 10);

exports.upload = upload;
