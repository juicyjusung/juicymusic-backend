import * as aws from 'aws-sdk';
import * as multer from 'multer';
import * as multers3 from 'multer-s3';
import * as uuid from 'uuid';
import * as path from 'path';

aws.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.S3_REGION,
});

export const upload = multer({
  storage: multers3({
    s3: new aws.S3(),
    acl: 'public-read',
    bucket: 'juicymusic',
    metadata: function (req, file, cb) {
      if (file.fieldname === 'file') cb(null, { fieldName: file.fieldname });
      else if (file.fieldname === 'image') cb(null, { fieldName: file.fieldname });
    },
    key(req, file, cb) {
      console.log('%c [JL] key - file', 'font-size: 16px; color:  red;', file);
      if (file.fieldname === 'file')
        cb(null, `tracks/${+new Date()}${path.basename(file.originalname)}`);
      else if (file.fieldname === 'image')
        cb(null, `images/${+new Date()}${path.basename(file.originalname)}`);
    },
  }),
});
