'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'biggerIsGreater' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING w as parameter.
 */

function biggerIsGreater(w) {
    /*
        checking starts from the second last character (w[i]; i=w.length-2) in the string. 
        If any character after that is larger (w[i] < any of w[i-1....w.length]), then starts the reordering process.
    */
    
    //Decalre array to store the leastest chracter and w[i]
    var remainChar = [];    
    remainChar.push(w[w.length-1]);
        
    for(var i=w.length-2; i>=0; i--){   //starts from second last and shift left if no result.
        remainChar.push(w[i]);
        
        //Check if any character after w[i] is just larger than w[i].
        var stagingChar;                
        for(var j=i+1; j<w.length; j++){
            if(w[i]<w[j] && (w[j]<stagingChar || stagingChar == undefined)){
                stagingChar=w[j];
            }
        }
            
        if(stagingChar != undefined){
            //keep the order on the right side + replace value + alphabetical order of remaining characters.
            result=w.substring(0, i)+stagingChar+remainChar.sort().join('').replace(stagingChar, '');
            return result;
        }
    }
    return "no answer";
    
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const T = parseInt(readLine().trim(), 10);

    for (let TItr = 0; TItr < T; TItr++) {
        const w = readLine();

        const result = biggerIsGreater(w);

        ws.write(result + '\n');
    }

    ws.end();
}
