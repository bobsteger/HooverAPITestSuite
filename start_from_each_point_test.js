Feature('Start from each point')

// Move the hoover either one step east or west
function travelOneEW(title, x, y, patches, direction){
    
    Scenario(title, ({ I }) => {
        // calculate final coordinate based on direction
        var endx = direction=='E' ? x + 1 : x - 1        

        I.sendPostRequest('/', {
            roomSize: [5, 5],
            coords: [x, y],
            patches: patches,
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
var title, direction
for(var x = 0; x < 5; x++){
    for(var y = 0; y < 5; y++){
        direction = x==4 ? 'W' : 'E' // travel east one square unless we are at the last rank
        title = `Start from ${x}, ${y} and move ${direction}`
        travelOneEW(title, x, y, [], direction)        
    }
}

// Start from each square with dirt on it and move one space
for(var x = 0; x < 5; x++){
    for(var y = 0; y < 5; y++){
        direction = x==4 ? 'W' : 'E'
        title = `Start from a dirt patch at ${x}, ${y} and move ${direction}`
        travelOneEW(title, x, y, [x, y], direction)        
    }
}