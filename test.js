var http = require('http'),
    fileSystem = require('fs'),
    path = require('path');

http.createServer(function(request, response) {
    var filePath = path.join(__dirname, 'files/longhipster.txt');
    var stat = fileSystem.statSync(filePath);

    response.writeHead(200, {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": "attachment; filename=longhipster.txt",
        'Access-Control-Allow-Origin': '*'
    });

    var readStream = fileSystem.createReadStream(filePath);
    // We replaced all the event handlers with a simple call to readStream.pipe()
    readStream.pipe(response);
})
.listen(2000);