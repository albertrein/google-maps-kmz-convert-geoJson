const fs = require('fs');
const jszip1 = require('jszip');
//const jszip2 = require('./jszip2');
const parser = require('xml2json');
const http = require('https');

module.exports.load = async mid => {
    let timestamp = Date.now();
    await loadFile(timestamp, mid);
    let jsonObject  = await readData(timestamp);
    return(jsonObject);
} 

loadFile = (fileName, mid) => new Promise((resolve, reject) => {
    const file = fs.createWriteStream(fileName+".kmz");
    http.get("https://www.google.com/maps/d/kml?mid="+mid, response => {
        let streamFile = response.pipe(file)
        streamFile.on('finish', function() {
            resolve()
        });
    });
});

readData = (fileName) => new Promise((resolve, reject) => {
    fs.readFile(fileName+".kmz",'',(err, data) => {
        jszip1.loadAsync(data).then(async zip => {
            zip.forEach(async (relPath, file) => {
                file.async("string").then(xmlString => {
                    let jsonString = parser.toJson(xmlString);
                    let jsonObject = JSON.parse(jsonString)
                    //console.log(jsonObject);
                    resolve(jsonObject.kml.Document.Folder)    
                })
            })
        })
    });
})

/**
 * To do
 * delete data
 * verifications
 */
//deleteData (timestamp) => {}