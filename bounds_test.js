Feature('Bounds');

var title, request, response


function execute_test(title, path, request, response){
    Scenario(title, ({ I }) => {
        I.sendPostRequest(path, request)
        I.seeResponseCodeIsSuccessful()
        I.seeResponseContainsJson(response)
    })
}

function execute_negative_test(title, path, request, response_code){
    Scenario(title, ({ I }) => {
        I.sendPostRequest(path, request)
        I.seeResponseCodeIs(response_code)        
    })
}

// Verify the hoover cannot go beyond its lower limits.
title = 'Hoover travel past lower bounds'
request = {
    roomSize: [5, 5],
    coords: [0, 0],
    patches: [ [1, 1] ],
    instructions: 'WS'
}
response = {
    coords: [0,0]
}
execute_test(title, '/', request, response)


// Verify the hoover cannot go beyond its upper limits.
title = 'Hoover travel beyond upper bounds'
request = {
    roomSize: [5, 5],
    coords: [4, 4],
    patches: [ [1, 1] ],
    instructions: 'EN'
}
response = {
    coords: [4,4]
}


// Verify the hoover cannot cannot originate outside of the room's upper limits.
title = 'Cannot originate hoover outside of upper Bounds'
request = {
    roomSize: [5, 5],
    coords: [5, 5],
    patches: [ [1, 1] ],
    instructions: 'WS'
}
execute_negative_test(title, '/', request, 400) // 400 = Bad Request


// Verify the hoover cannot cannot originate outside of the room's lower limits.
title = 'Cannot originate hoover outside of lower Bounds'
request = {
    roomSize: [5, 5],
    coords: [-1, -1],
    patches: [ [1, 1] ],
    instructions: 'EN'
}
execute_negative_test(title, '/', request, 400)


// Verify the dirt patch cannot be outside of the room's upper limits.
title = 'Cannot define dirt patch outside of upper Bounds'
request = {
    roomSize: [5, 5],
    coords: [0, 0],
    patches: [ [5, 5] ],
    instructions: 'N'
}
execute_negative_test(title, '/', request, 400)


// Verify the dirt patch cannot be outside outside of the room's lower limits.
title = 'Cannot define dirt patch outside of lower Bounds'
request = {
    roomSize: [5, 5],
    coords: [0, 0],
    patches: [ [-1, -1] ],
    instructions: 'N'
}
execute_negative_test(title, '/', request, 400)


// Verify room size must be greater than 0.
title = 'Room size must be greater than 0'
request = {
    roomSize: [0, 0],
    coords: [0, 0],
    patches: [ [1, 1] ],
    instructions: 'EN'
}
execute_negative_test(title, '/', request, 400)