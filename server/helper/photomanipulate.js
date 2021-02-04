const Jimp = require('jimp');
const fs = require('fs');

const photoManipulate = {};

photoManipulate.changephoto = async (req, res, next) => {
  try {
    let w = req.params.w - 0;
    let h = req.params.h - 0;
    let picpath = req.params[0];

    if (fs.existsSync(`./public/${req.params.w}-${req.params.h}/${picpath}`)) {
      return next();
    }
    if (!fs.existsSync(`./public/${picpath}`)) {
      return next();
    }
    if (!h) {
      h = Jimp.AUTO;
    }
    Jimp.read(`./public/${picpath}`, async (err, image) => {
      if (err) next(err);
      const i = await image.scaleToFit(w, h).write(`./public/${req.params.w}-${req.params.h}/${picpath}`);
      fs.readFile(`./public/${req.params.w}-${req.params.h}/${picpath}`, function (err, data) {
        if (err) {
          return next(err);
        } else {
          res.send(data);
        }
      });
    }).catch(err => {
      next(err);
    });
  } catch (err) {
    next(err);
  }
};

module.exports = photoManipulate;
