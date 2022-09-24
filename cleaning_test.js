Feature('Cleaning');

function execute_test(title, path, request, response ){
    Scenario(title, ({ I }) => {
        I.sendPostRequest(path, request)
        I.seeResponseCodeIsSuccessful()
        I.seeResponseContainsJson(response)
    })
}


// Clean a patch on every coordinate
let allPatches = [ 
    [0, 0], [0, 1], [0, 2], [0, 3], [0, 4],
    [1, 0], [1, 1], [1, 2], [1, 3], [1, 4],
    [2, 0], [2, 1], [2, 2], [2, 3], [2, 4],
    [3, 0], [3, 1], [3, 2], [3, 3], [3, 4],
    [4, 0], [4, 1], [4, 2], [4, 3], [4, 4],
];
var title = 'Clean every square'
var request = {
    roomSize: [5, 5],
    coords: [0, 0],
    patches: allPatches,
    instructions: 'EEEENNNNWWWWSSSEEENNWWSE'
};
var response = {
    coords: [2,2],
    patches: 24
};
execute_test(title, '/', request, response)


title ='Clean originating square'
request = {
    roomSize: [5, 5],
    coords: [2, 2],
    patches: [[2, 2]],
    instructions: 'E'
}
response = {
    coords: [3,2],
    patches: 1
}
execute_test(title, '/', request, response)


title = 'Don\'t clean destination square'
request = {
    roomSize: [5, 5],
    coords: [2, 2],
    patches: [[3, 2]],
    instructions: 'E'
}
response = {
    coords: [3,2],
    patches: 1
}
execute_test(title, '/', request, response)


title = 'Clean square that is neither original or final destination'
request = {
    roomSize: [5, 5],
    coords: [3, 4],
    patches: [[2, 4]],
    instructions: 'WW'
}
response = {
    coords: [1, 4],
    patches: 1
}
execute_test(title, '/', request, response)


title ='Move in a clean room'
request = {
    roomSize: [5, 5],
    coords: [4, 0],
    patches: [],
    instructions: 'WWWW'
}
response = {
    coords: [0, 0],
    patches: 0
}
execute_test(title, '/', request, response)