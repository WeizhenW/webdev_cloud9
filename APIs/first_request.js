let request = require("request");

request("http://www.google.com", function(error, response, body) {
    if(error) {
        console.log("something is wrong");
        console.log(error);
    } else if(!error && response.statusCode == 200) {
        console.log(body);
    } else {
        console.log(response.statusCode);
    }
});