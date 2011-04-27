var sys = require("sys"),
    http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs");

var shopping = [];
var maxId = 0;

var contentType = [];
contentType['js'] = 'application/x-javascript';
contentType['html'] = 'text/html';
contentType['css'] = 'text/css';

http.createServer(function (req, res) {
  var uri = url.parse(req.url).pathname;

  if(uri.indexOf('list/') != -1) {
    switch (req.method) {
      case "POST":
        post_handler(req, function(req_data) {
          res.writeHead(200, {"Content-Type" : "application/json"});
          var new_item = JSON.parse(req_data);
          new_item.id = maxId;
          maxId = shopping.push(new_item);
          res.write(JSON.stringify(new_item));
          console.log("Handled" + JSON.stringify(new_item));
          res.end();
        });
        break;
    }
    return;
  }

// If request is not for the store, return the files.

	var filename = path.join(process.cwd(), uri);
	console.log(get_content_type(filename));
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

			res.writeHead(200, {"Content-Type" : get_content_type(filename)});
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

var get_content_type = function (filename) {
 var nameArray = filename.split('.');
 console.log(nameArray.length);
 return  contentType[nameArray[nameArray.length - 1]] || "text/plain";
};
