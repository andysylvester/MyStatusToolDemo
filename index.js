var ejs = require('ejs');
var fs = require('fs');
var path = require('path');
var html = "";
var timeString = "";

const pageModel = {
  content: "<p>This is some sample content. Located on the sample page.</p>",
};

ejs.renderFile('post_template.ejs', { model: pageModel }, {}, function(err, str){
   console.log(str);
   html = str;
   // str => Rendered HTML string
});

console.log(html);


const timestamp = Date.now();
const timestampSec = Math.floor(timestamp/1000);
 
// timestamp in milliseconds
console.log(timestamp);

// timestamp in seconds
console.log(Math.floor(timestamp/1000));

timeString = timestampSec.toString();

console.log(timeString);

fs.mkdir(path.join(__dirname, timeString),
  { recursive: true }, (err) => {
    if (err) {
      return console.error(err);
    }
    console.log('Directory created successfully!');
  });

var dirPath = "";

dirPath = __dirname + "\\" + timeString + "\\index.html";

console.log("dirPath = ", dirPath);

fs.writeFile(dirPath, html, (err) => {
  if (err)
    console.log(err);
  else {
    console.log("File written successfully\n");
  }
});
