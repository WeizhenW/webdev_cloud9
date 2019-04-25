let cat = require("cat-me");
let joke = require("knock-knock-jokes");

for(let i=0; i<5; i++) {
    console.log(joke());
    console.log(cat());
}

