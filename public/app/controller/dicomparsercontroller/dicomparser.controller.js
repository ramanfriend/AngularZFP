//This controller is responsible to insert new patient details in DB
function dicomparserctrl($scope, $http, HttpPost, $stateParams) {
    var configSetting = { responseType: "arraybuffer" };

    $scope.fileId = $stateParams.fileId;
    $scope.dumpDataSet = function (dataSet) {
        $('span[data-dicom]').each(function (index, value) {
            var attr = $(value).attr('data-dicom');
            var element = dataSet.elements[attr];
            var text = "";
            if (element !== undefined) {
                var str = dataSet.string(attr);
                if (str !== undefined) {
                    text = str;
                }
            }
            $(value).text(text);
        });

        $('span[data-dicomUint]').each(function (index, value) {
            var attr = $(value).attr('data-dicomUint');
            var element = dataSet.elements[attr];
            var text = "";
            if (element !== undefined) {
                if (element.length === 2) {
                    text += dataSet.uint16(attr);
                }
                else if (element.length === 4) {
                    text += dataSet.uint32(attr);
                }
            }

            $(value).text(text);
        });

    }

    $scope.parsedicomfile = function (byteArray) {
        // set a short timeout to do the parse so the DOM has time to update itself with the above message
        var dataSet;
        // Invoke the paresDicom function and get back a DataSet object with the contents
        try {
            var start = new Date().getTime();

            dataSet = dicomParser.parseDicom(byteArray);
            // Here we call dumpDataSet to update the DOM with the contents of the dataSet
            $scope.dumpDataSet(dataSet);
        }
        catch (err) {
        }


    }
    
    $scope.getdicomfile = function () {
        var param = $scope.fileId;
        HttpPost.CallHttpGet('/dicomfile', param, configSetting)
            .success(function (arrayBuffer) {
                var byteArray = new Uint8Array(arrayBuffer);
                $scope.parsedicomfile(byteArray);
                $scope.Drawimage(byteArray);
                return "true";
            }).error(function (er) {
                console.log("Get Dicomfile Details Error " + er);
            }).catch(function (ex) {
                console.log("Get Dicomfile Details Exception ", ex);
            }).then(function (response) {
                if (response != null) {
                    var time = response.config.responseTimestamp - response.config.requestTimestamp;
                    console.log('The request took ' + (time / 1000) + ' seconds.');
                }
            });


    }

    var canvas = document.createElement('canvas');

    $scope.Drawimage = function (dicomArray) {
        //parse the Dicom file
        var dataSet = dicomParser.parseDicom(dicomArray);
        //get width and height of the Dicom image.
        var width = dataSet.uint16('x00280011'), height = dataSet.uint16('x00280010');
        //Get the pixel data element from the dataset.
        var pixelDataElement = dataSet.elements.x7fe00010;
        //Now get the pixel data from the dicom file.
        var pixelData = new Uint8Array(dataSet.byteArray.buffer, pixelDataElement.dataOffset, pixelDataElement.length);
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
        $("#dicomjpeg").attr("src", dataURL);
        // console.log(dataURL);
        //show the canvas
        canvas.style.display = 'hidden';
    }


    $scope.getpatientimage = function () {
        var param = $scope.fileId;
        HttpPost.CallHttpGet('/getpatientimage', param, configSetting)
            .success(function (pixelData) {
                $scope.ApiDrawimage(pixelData);
                return "true";
            }).error(function (er) {
                console.log("Get Dicomfile Details Error " + er);
            }).catch(function (ex) {
                console.log("Get Dicomfile Details Exception ", ex);
            }).then(function (response) {
                if (response != null) {
                    var time = response.config.responseTimestamp - response.config.requestTimestamp;
                    console.log('The request took ' + (time / 1000) + ' seconds.');
                }
            });


    }

    $scope.ApiDrawimage = function (dicomArray) {       
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
        $("#dicomjpeg").attr("src", dataURL);
        // console.log(dataURL);
        //show the canvas
        canvas.style.display = 'hidden';
    }

  
 // $scope.getpatientimage();
    $scope.getdicomfile();
}

//This helper function will add Patient Details controller to Home module.
AddDicomParserctrlController('dicomparserctrl', ['$scope', '$http', 'HttpPost', '$stateParams', dicomparserctrl]);

