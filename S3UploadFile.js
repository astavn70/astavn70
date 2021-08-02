// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
var fs = require('fs');
var BUCKET_NAME = 'test123908';

// Set the region 
AWS.config.update({region: 'us-east-1'});

// Create S3 service object
s3 = new AWS.S3({apiVersion: '2006-03-01'});

// // Call S3 to list the buckets
// s3.listBuckets(function(err, data) {
//   if (err) {
//     console.log("Error", err);
//   } else {
//     console.log("Success", data.Buckets);
//   }
// });

const uploadFile = (fileName) => {
  // Read content from the file
  const fileContent = fs.readFileSync(fileName);

  // Setting up S3 upload parameters
  var params = {
      Bucket: BUCKET_NAME,
      Key: fileName, // File name you want to save as in S3
      Body: fileContent
  };

  // Uploading files to the bucket
  s3.upload(params, function(err, data) {
      if (err) {
          throw err;
      }
      console.log(`File uploaded successfully. ${data.Location}`);
  });
};


const deleteFile = (fileName) => {
    var params = {  Bucket: BUCKET_NAME, Key: fileName };

    s3.deleteObject(params, function(err, data) {
    if (err) {
            console.log(err, err.stack);  
    }
        console.log(`File deleted successfully. ${data.Location}`);
    });
}
  
  deleteFile('door.jpg');

  uploadFile('door.jpg');




