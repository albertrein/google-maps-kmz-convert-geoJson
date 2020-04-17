const JsZip = require('jszip');
//const geoJson = require('geojson');
const fs = require('fs');
const http = require('https');

module.exports = async (mid) => {
    let timestamp = Date.now();
    let exit = await saveFile(mid, timestamp);
    console.log(exit);
}

getFileKMZ = (mid,timestamp) => new Promise((resolve,reject) => {
    const file = fs.createWriteStream(timestamp+".kmz");
    http.get("https://www.google.com/maps/d/kml?mid="+mid, function(response) {
      response.pipe(file);
      resolve(true);
    });
});


deleteTempFile = (timestamp) => new Promise((resolve,reject) => {
    fs.unlink(timestamp+".kmz",()=>{
        resolve();
    });
});