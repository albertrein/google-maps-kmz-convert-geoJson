const fs = require('fs');
const jszip1 = require('jszip');
const jszip2 = require('./jszip2');
const DOMParser = require('dom-parser');
const parser = require('xml2json');
const http = require('https');

    let getDom = xml => (new DOMParser()).parseFromString(xml, "text/xml")

    /*const file = fs.createWriteStream("mapa.kmz");
    http.get("https://www.google.com/maps/d/kml?mid=13MJM3S--LI07zUN80IrCad1OY5PTMIqw", async function(response) {
        response.pipe(file)
        read();

    });*/
    
    //read = () => {
        fs.readFile("mapa.kmz",'',(err, data) => {
            let x = jszip2.loadAsync(data).then(async zip => {
                zip.forEach(async (relPath, file) => {
                    let xml = await file.async("string").then(getDom)
                    //console.log(xml)
                    let json = parser.toJson(xml);
                    console.log(typeof(json))
                    //fs.writeFile('jsonGravatai.json',json);
                })
            })
        });
    //}


    