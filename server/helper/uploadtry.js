const propertyConfig = require('./../modules/Property/propertyConfig');
const { fileSizes } = require('../config/keys');
const httpStatus = require('http-status');
const otherHelper = require('./others.helper');
const multer = require('multer');

const uploaderHelper = {}

uploaderHelper.filesUpload = (destination, uploadType, field) => {


      var storage = multer.diskStorage(
            {
                  destination: destination,
                  filename: async (req, file, cb) => {
                        const randomString = await otherHelper.generateRandomHexString(15);
                        cb(null, randomString + '-' + file.originalname);
                  },
            }
      );
      const uploader = multer({
            storage: storage,
            fileFilter: (req, file, cb) => {
                  if (!file.mimetype.includes('jpeg') && !file.mimetype.includes('jpg') && !file.mimetype.includes('png') && !file.mimetype.includes('gif') && !file.mimetype.includes('pdf')) {
                        return cb(null, false, new Error('Only images are allowed'));
                  }
                  cb(null, true);
            },
            limits: { fileSize: fileSizes }
      });
      if (uploadType == 'array') {
            const upload = uploader.array(field)
      } else if (uploadType == 'single') {
            const upload = uploader.single(field)
      } else if (uploadType == 'fields') {
            const upload = uploader.fields(field)
      } else {
            next()
      }

      return fileUpload = (req, res, next) => {
            upload(req, res, function (error) {
                  if (error) { //instanceof multer.MulterError
                        if (error.code == 'LIMIT_FILE_SIZE') {
                              return otherHelper.sendResponse(res, httpStatus.NOT_ACCEPTABLE, false, error, null, propertyConfig.errorIn.fileSizeLimitExceed, null);
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