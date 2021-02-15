// const { fileSizes } = require('../config/keys');
const httpStatus = require('http-status');
const otherHelper = require('./others.helper');
const multer = require('multer');
const maxFileSize = 1024 * 1024 * 2
const uploaderHelper = {}

uploaderHelper.uploadFiles = (destinationPath, uploadTYpe, fieldData) => {
  const temp = maxFileSize / (1024 * 1024)
  var storage = multer.diskStorage(
    {
      destination: destinationPath,
      filename: async (req, file, cb) => {
        const randomString = await otherHelper.generateRandomHexString(15);
        cb(null, randomString + '-' + file.originalname);
      },
    }
  );
  const uploader = multer({
    storage: storage,
    limits: { fileSize: maxFileSize }
  });

  if (uploadTYpe === 'array') {
    var upload = uploader.array(fieldData[0], fieldData[1])
  } else if (uploadTYpe === 'fields') {
    var upload = uploader.fields(fieldData)
  } else if (uploadTYpe === 'single') {
    var upload = uploader.single(fieldData)
  } else if (uploadTYpe === 'any') {
    var upload = uploader.any(fieldData)
  }

  return fileUpload = (req, res, next) => {
    upload(req, res, function (error) {
      if (error) { //instanceof multer.MulterError
        if (error.code == 'LIMIT_FILE_SIZE') {
          return otherHelper.sendResponse(res, httpStatus.NOT_ACCEPTABLE, false, error, null, `FileSize must be greater than ${temp}MB`, null);
        } else {
          return otherHelper.sendResponse(res, httpStatus.NOT_ACCEPTABLE, false, error, null, `error type: ${error.code} at filed: ${error.field}`, null);
        }
      } else {
        next()
      }
    })
  };
}


module.exports = uploaderHelper



// const fileUploadHelper = filePath => {
//   const multer = require('multer');
//   const path = require('path');
//   const mkdirp = require('mkdirp');
//   const hashHelper = require('./others.helper');

//   const storage = multer.diskStorage({
//     destination: async (req, file, cb) => {
//       const uploadPath = path.resolve(filePath);
//       try {
//         const folderStat = await ensureFolderExists(uploadPath, 484);
//         if (folderStat) {
//           cb(null, uploadPath);
//         } else {
//           cb(null, '');
//         }
//       } catch (err) {
//         cb(err);
//       }
//     },
//     filename: async (req, file, cb) => {
//       const randomString = await hashHelper.generateRandomHexString(15);
//       cb(null, randomString + '-' + file.originalname);
//     },
//     onFileUploadStart: file => {
//       recentFile = file;
//       recentFile.finished = false;
//     },
//     onFileUploadComplete: file => {
//       recentFile.finished = true;
//     },
//   });
//   const ensureFolderExists = (path, mask) => {
//     return new Promise((resolve, reject) => {
//       mkdirp(path, err => {
//         if (err) {
//           reject(err); // something else went wrong
//         } else {
//           resolve(true); // successfully created folder
//         }
//       });
//     });
//   };
//   return {
//     uploader: multer({
//       storage: storage,
//       fileFilter: (req, file, cb) => {
//         if (!file.mimetype.includes('jpeg') && !file.mimetype.includes('jpg') && !file.mimetype.includes('png') && !file.mimetype.includes('gif') && !file.mimetype.includes('pdf')) {
//           return cb(null, false, new Error('Only images are allowed'));
//         }
//         cb(null, true);
//       },
//     }),
//   };
// };

// module.exports = fileUploadHelper;