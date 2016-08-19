var exports = module.exports = {};
 exports.Drawimage = function (dicomArray) {
      var canvas = document.createElement('canvas');
        //parse the Dicom file
        //var dataSet = dicomParser.parseDicom(dicomArray);
        //get width and height of the Dicom image.
        var width = 2006, height = 2022;
        //Get the pixel data element from the dataset.
        //var pixelDataElement = dataSet.elements.x7fe00010;
        //Now get the pixel data from the dicom file.
        var pixelData = dicomArray;
        //now we have got width, height and pixel data which is all it takes to render a image to the canvas.      

        canvas.width = width;
        canvas.height = height;
        //get context
        var context = canvas.getContext('2d');
        //get image data to update
        var imageData = context.getImageData(0, 0, width, height);
        var data = imageData.data;
        //updating alpha 
        for (var i = 3, k = 0; i < data.byteLength; i = i + 4, k = k + 2) {
            //convert 16-bit to 8-bit ,because we cannot render a 16-bit value to the canvas.
            var result = ((pixelData[k + 1] & 0xFF) << 8) | (pixelData[k] & 0xFF);
            result = (result & 0xFFFF) >> 8;
            data[i] = 255 - result;
        }

        context.putImageData(imageData, 0, 0);
        var dataURL = canvas.toDataURL();
        return dataURL;
        //$("#dicomjpeg").attr("src", dataURL);
        // console.log(dataURL);
        //show the canvas
        //canvas.style.display = 'hidden';
    }
