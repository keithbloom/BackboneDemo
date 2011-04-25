var sys = require("sys"),
    http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs");

http.createServer(function (req, res) {
  var uri = url.parse(req.url).pathname;

  if(uri.indexOf('list/') != -1) {
    res.writeHead(200);
    switch (req.method) {
      case "POST":
        post_handler(req, function(req_data) {
          res.write(
            'Data ' + sys.inspect(req_data)
            );
          console.log("Handled" + req_data);
        });
        break;
    }
    res.end();
    return;
  }

// If request is not for the store, return the files.

	var filename = path.join(process.cwd(), uri);
	path.exists(filename, function(exists) {
		if(!exists) {
			res.writeHead(404, {"Content-Type": "text/plain"});
			res.write("404 Not Found\n");
			res.end();
			return;
		}
	
		fs.readFile(filename, "binary", function(err, file) {
			if(err) {
				res.writeHead(500, {"Content-Type": "text/plain"});
				res.write(err, "\n");
				res.end();
			}

			res.writeHead(200);
			res.write(file, "binary");
			res.end();
		});
	});
}).listen(8080);

sys.puts("Server running at http://localhost:8080/");

var post_handler = function(request, callback) {

  console.log('post handler');
  var _CONTENT = '';

  if(request.method == 'POST') {
    request.addListener('data', function(chunk) {
      console.log("Chunking");
      _CONTENT += chunk;
    });

    request.addListener('end', function() {
      callback(_CONTENT);
    });
  }
};
