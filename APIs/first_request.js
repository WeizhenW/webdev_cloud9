let request = require("request");

request("https://jsonplaceholder.typicode.com/users", function(error, response, body) {
    if(error) {
        console.log("something is wrong");
        console.log(error);
    } else if(!error && response.statusCode == 200) {
        let parsedData = JSON.parse(body);
        console.log(parsedData[1]["address"]["city"]);
    } else {
        console.log(response.statusCode);
    }
});