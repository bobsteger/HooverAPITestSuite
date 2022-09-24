Feature('Run each direction');


// allow hoover to travel an entire rank
function travelRank(y, startx, endx, direction, testNumber){
    Scenario(`Travel row ${y}, ${startx} to ${endx} Test ${testNumber}`, ({ I }) => {
        var directionString = direction.repeat(4)

        I.sendPostRequest('/', {
            roomSize: [5, 5],
            coords: [startx, y],
            patches: [ ],
            instructions: directionString
        });
        I.seeResponseCodeIsSuccessful();
        I.seeResponseContainsJson({
            coords: [endx, y],
            patches: 0
        })
    });
}

// allow hoover to travel an entire file
function travelFile(x, starty, endy, direction, testNumber){
    Scenario(`Travel file ${x}, ${starty} to ${endy} Test ${testNumber}`, ({ I }) => {
        var directionString = direction.repeat(4)
        I.sendPostRequest('/', {
            roomSize: [5, 5],
            coords: [x, starty],
            patches: [ ],
            instructions: directionString
        });
        I.seeResponseCodeIsSuccessful();
        I.seeResponseContainsJson({
            coords: [x, endy],
            patches: 0
        })
    });
}

// Traverse each twice to verify it hasn't broken
for(var x = 0; x < 5; x++){
    travelFile(x, 0, 4, 'N', 1);
    travelFile(x, 0, 4, 'N', 2);
}

for(var x = 0; x < 5; x++){
    travelFile(x, 4, 0, 'S', 1);
    travelFile(x, 4, 0, 'S', 2);
}

for(var y = 0; y < 5; y++){
    travelRank(y, 0, 4, 'E', 1);
    travelRank(y, 0, 4, 'E', 2);
}

for(var y = 0; y < 5; y++){
    travelRank(y, 4, 0, 'W', 1);
    travelRank(y, 4, 0, 'W', 2);
}