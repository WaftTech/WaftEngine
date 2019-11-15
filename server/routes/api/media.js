const express = require('express');
const router = express.Router();
const fileUpload = require('../../helper/upload.helper')('public/media/');
const uploader = fileUpload.uploader;

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
const dModule = require('../../modules/media/mediaController');
const { authentication, authorization } = require('../../middleware/authentication.middleware');

// router.get('/:page', authorization, dModule.GetMedia);
router.get('/', authorization, authentication, dModule.GetMediaPagination);
router.post('/single/:type', authorization, authentication, uploader.single('file'), dModule.SaveMedia);
router.post('/multiple/:type', authorization, authentication, uploader.any('file'), dModule.SaveMultipleMedia);
router.get('/:id', dModule.GetMediaDetail);
router.delete('/:id', authorization, authentication, dModule.DeleteMedia);

router.post('/uploader', authorization, authentication, uploader.any('file'), dModule.UploadFromCkEditor);
// router.post('/uploader', multipartMiddleware, function(req, res) {
//   var fs = require('fs');

//   fs.readFile(req.files.upload.path, function(err, data) {
//     var newPath = __dirname + '/../public/uploads/' + req.files.upload.name;
//     fs.writeFile(newPath, data, function(err) {
//       if (err) console.log({ err: err });
//       else {
//         html = '';
//         html += "<script type='text/javascript'>";
//         html += '    var funcNum = ' + req.query.CKEditorFuncNum + ';';
//         html += '    var url     = "/uploads/' + req.files.upload.name + '";';
//         html += '    var message = "Uploaded file successfully";';
//         html += '';
//         html += '    window.parent.CKEDITOR.tools.callFunction(funcNum, url, message);';
//         html += '</script>';

//         res.send(html);
//       }
//     });
//   });
// });

module.exports = router;
