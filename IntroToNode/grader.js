function average(arr) {
    let sum = 0;
    for(let score of arr) {
        sum += score;
    }
    let average = Math.floor(sum/arr.length)+1;
    console.log(average);
}

let scores = [90, 98, 89, 100, 100, 86, 94];
average(scores);