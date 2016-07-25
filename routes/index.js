var express = require('express');
var gm = require('gm');
var fs = require('fs');
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/');
    }
});
var uploads = multer({dest: 'uploads/'});
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.post('/uploadImage', uploads.single('image'), function (req, res, next) {
    try{
        var imageData = JSON.parse(req.body.imageData);

        if (req.file){
            var filetype = req.file.mimetype;
            var imageFileName =  req.file.originalname;

            // Image Processing
            fs.readFile(req.file.path, function (err, data) {
                if (err) {
                    res.status(500).send("Unable to process the image file");
                } else {
                    gm(data).size(function (err, value) {
                        if (err) {
                            console.log(err);
                        } else {
                            var scaleX = imageData.x2 - imageData.x1;
                            var scaleY = imageData.y2 - imageData.y1;
                            gm(data)
                                .resize(450)
                                .crop(scaleX, scaleY, imageData.x1, imageData.y1)
                                .write('./uploads/' + imageFileName, function (err) {
                                    if (err) {
                                        console.log(err);
                                        res.status(500).send('Image cropping error');
                                    } else {
                                        fs.unlink(req.file.path, function() {
                                            res.status(200).send('Successfully uploaded cropped image: '+imageFileName);
                                        })
                                    }
                                });
                        }
                    })
                }
            });
        } else{
            res.status(500).json('image file not found');
        }
    } catch(err){
        console.log(err);
        next(err);
    }
});

module.exports = router;
