# node-image-crop
Script for cropping and uploading images in NodeJs. 

## What exactly *node-image-crop* do?
The script gives you simple user friendly interface to

1.	Upload image from the disk,
2.	Crop selected image in fixed aspect ratio (1:1) and
3.	Upload it to server

Here's the detailed step by step guide:

-	Click on the image placeholder to select an image from disk. It opens up a [bootstrap modal](http://getbootstrap.com/javascript/#modals) with ability to browse images from disk and select the one to upload.

-	Crop the select area of the selected image.

-	Click the appropriate button after cropping. 
  -	**Cancel:** Closes the modal and removes the selected image
  -	**Discard:** Doesn't close the modal rather just removes the selected image. 
  -	**Done:** Confirms cropping area, saves the ratio by and closes the modal.

-	Click *Upload* button to upload the image to server.

- 	Click *Refresh* to refresh the form and repeating process

## Setup Guide
*node-image-crop* is image cropping and uploading plugin for nodejs based application so as a first step, you must have nodejs installed. The script includes following nodejs dependencies:

1.	fs
2.	gm
3.	multer
4.	graphicsmagick

You can install all of these dependencies via the following commands:
```npm install --save fs```
```npm install --save gm```
```npm install --save multer```
```sudo apt-get install graphicsmagick```

Don't forget to require these depencies in *app.js* and relevant routes file (*index.js* in my case) as I did, see [app.js](https://github.com/RedBuffer/node-image-crop/blob/master/app.js) and [index.js](https://github.com/RedBuffer/node-image-crop/blob/master/routes/index.js)

You must need to copy the stylesheets, image and scripts from [public folder](https://github.com/RedBuffer/node-image-crop/tree/master/public)

Either copy the page [index.html](https://raw.githubusercontent.com/RedBuffer/node-image-crop/master/views/index.jade) to your project or just copy the content to place into your html file.

Create the folder *uploads* at your root directory. Don't forget to create its static path in [app.js](https://github.com/RedBuffer/node-image-crop/blob/master/app.js)



PS: Feel free to fork, highlight the bugs (if any), suggest improvements and make changes where required.









