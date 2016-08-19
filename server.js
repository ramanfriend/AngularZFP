var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('searchlist', ['searchlist']);
var bodyParser = require('body-parser');
var fs = require('fs');
var parsedicom = require('./parsedicom');

var PatientInfoModel = {
  patientname: 'x00100010',
  patientid: 'x00100020',
  description: 'x00081030',
  Manufacturer: 'x00080070'
};

var patientinfo = {};

app.use(express.static(__dirname + '/public')); ///node_modules/dicom-parser/dist/dicomParser.js
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/'));
app.use('/angular', express.static(__dirname + '/node_modules/angular/'));
app.use('/angularuiroute', express.static(__dirname + '/node_modules/angular-ui-router/release'));

app.use(bodyParser.json());
app.listen(3000);
console.log("server running on port 3000")

//dataSet = parsedicom.parseDicom("");

app.get('/dicomfile/:FId', function (req, res) {
  var FId = req.params.FId;
  console.log('I received a GET request');
  fs.readFile('public/dicomfile/' + FId, function (err, data) {
    if (err) {
      return console.log(err);
    }
    res.send(data);
  });

});

app.get('/searchlist', function (req, res) {
  console.log('I received a GET request');

  db.searchlist.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

app.get('/searchlist/:pname/:dofb/:Contact', function (req, res) {
  var pname = req.params.pname;
  var dofb = req.params.dofb;
  var Contact = req.params.Contact;
  console.log(pname);
  console.log(dofb);
  console.log(Contact);
  db.searchlist.find({ $or: [{ name: pname, }, { dob: dofb }, { contact: Contact }] }, function (err, doc) {
    res.json(doc);
  });
});

app.get('/patientdetails/:PId', function (req, res) {
  var PId = req.params.PId;
  //var id = req.params.id;
  console.log(PId);
  db.searchlist.findOne({ _id: mongojs.ObjectId(PId) }, function (err, doc) {
    res.json(doc);
  });
});

app.post('/searchlist', function (req, res) {
  console.log(req.body);
  db.searchlist.insert(req.body, function (err, doc) {
    console.log(doc);
    res.json(doc);
  });
});



//Get Patient INfo API
app.get('/getpatientinfo/:FId', function (req, res) {
  res.contentType('application/json');
  var FId = req.params.FId;
  var sampleDcmPath = 'public/dicomfile/' + FId;
  var arrayBuffer = fs.readFileSync(sampleDcmPath);
  var byteArray = new Uint8Array(arrayBuffer);
  dataSet = parsedicom.parseDicom(byteArray);
  var jsondata = getjson(dataSet);
  res.json(jsondata);
});

getjson = function (dataSet) {
  for (var prop in PatientInfoModel) {
    var PropId = PatientInfoModel[prop];
    var element = dataSet.elements[PropId];
    var text = "";
    if (element !== undefined) {
      var str = dataSet.string(PropId);
      if (str !== undefined) {
        text = str;
      }
    }
    patientinfo[prop] = text;
    //console.log(prop + ":-" + text);
  }
  //console.log(patientinfo);
  return patientinfo;
}

//Get Patient Image API
app.get('/getpatientimage/:FId', function (req, res) {
  res.contentType('application/json');
  var FId = req.params.FId;
  var sampleDcmPath = 'public/dicomfile/' + FId;
  var arrayBuffer = fs.readFileSync(sampleDcmPath);
  var dicomArray = new Uint8Array(arrayBuffer);
  //parse the Dicom file
  var dataSet = parsedicom.parseDicom(dicomArray);
  //get width and height of the Dicom image.
  var width = dataSet.uint16('x00280011'), height = dataSet.uint16('x00280010');
  //Get the pixel data element from the dataset.
  var pixelDataElement = dataSet.elements.x7fe00010;
  //Now get the pixel data from the dicom file.
  var pixelData = new Uint8Array(dataSet.byteArray.buffer, pixelDataElement.dataOffset, pixelDataElement.length);
  //now we have got width, height and pixel data which is all it takes to render a image to the canvas.      
   var data=[];
    for (var i = 3, k = 0; i < pixelData.byteLength*2; i = i + 4, k = k + 2) {
            //convert 16-bit to 8-bit ,because we cannot render a 16-bit value to the canvas.
            var result = ((pixelData[k + 1] & 0xFF) << 8) | (pixelData[k] & 0xFF);
            result = (result & 0xFFFF) >> 8;
            data[i] = 255 - result;
        }
   res.send("data:image/png;base64," + new Buffer(data).toString("base64")) 
  //res.send(pixelData.toString("base64"));
//var encodedData = "data:image/png;base64," + new Buffer(data, "base64");
// res.writeHead(200, {
//     'Content-Type': 'image/png',
//     'Content-Length': encodedData.length
//   })
  // res.end(encodedData) 
 // console.log(dataSet);
   //
 // res.json({});
  // res.writeHead(200, {
  //   'Content-Type': 'image/png',
  //   'Content-Length': encodedData.length
  // })

// res.end(encodedData); 
});

