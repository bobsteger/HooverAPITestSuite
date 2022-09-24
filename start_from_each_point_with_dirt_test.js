Feature('Start from each point with dirt')

function travelOne(x, y, testNumber){
    // travel east one square unless we are at the last rank
    var direction = x==4 ? 'W' : 'E'

    Scenario(`Start from ${x}, ${y} and move ${direction}`, ({ I }) => {
        var endx = x==4 ? 3 : x + 1

        I.sendPostRequest('/', {
            roomSize: [5, 5],
            coords: [x, y],
            patches: [ [x, y] ],
            instructions: direction
        })
        I.seeResponseCodeIsSuccessful()
        I.seeResponseContainsJson({
            coords: [endx, y],
            patches: 0
        })
    });
}

// Start from each square and move one space
for(var x = 0; x < 5; x++){
    for(var y = 0; y < 5; y++){
        travelOne(x, y)        
    }
}