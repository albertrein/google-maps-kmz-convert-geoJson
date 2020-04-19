const JsZip = require('jszip');
const domparser = require('dom-parser');
const dom = new domparser();
const fs = require('fs');
const http = require('https');
const fetch = require('fetch');

module.exports = async (mid) => {
    let timestamp = Date.now();
    let exit = await saveFileKMZ(mid, timestamp);
    //readFileKMZ(timestamp);
}

saveFileKMZ = (mid,timestamp) => new Promise((resolve,reject) => {
    fetch.FetchStream('https://www.google.com/maps/d/kml?mid='+mid).then(res => res.buffer).then(buffer => {console.log('asd')})
});

readFileKMZ = (timestamp) => new Promise(async (resolve,reject) => {
    
    
    fs.readFile(timestamp+".kmz", function(err, data) {
        if (err) throw err;
        JsZip.loadAsync(data).then(function (zip) {
            console.log('massa')
        });
    });
});

let getDom = xml => (new DOMParser()).parseFromString(xml, "text/xml")
let getExtension = fileName => fileName.split(".").pop()

getKmlDom = async (fileReaded) => {
    let jszip = new JsZip();
    return jszip.get  .loadAsync(fileReaded).then(zip => {
        zip.forEach((relPath, fileReaded) => {
            if (getExtension(relPath) === "kml" && kmlDom === null) {
                kmlDom = fileReaded.async("string").then(getDom)
            }
        })
        return kmlDom || Promise.reject("No kml file found") 
    });
    
}

deleteTempFile = (timestamp) => new Promise((resolve,reject) => {
    fs.unlink(timestamp+".kmz",()=>{
        resolve();
    });
});