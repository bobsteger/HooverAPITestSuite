Feature('connection');

let exampleTest = '{ "roomSize" : [5, 5], "coords" : [1, 2], "patches" : [ [1, 0], [2, 2], [2, 3] ], "instructions" : "NNESEESWNWW" }';

Scenario('Basic Connection', ({ I }) => {
    I.sendPostRequest('/', {
        roomSize: [5, 5],
        coords: [1, 2],
        patches: [ [1, 0], [2, 2], [2, 3] ],
        instructions: 'NNESEESWNWW'
    });
    I.seeResponseCodeIsSuccessful();
    I.seeResponseContainsJson({
        coords: [1, 3],
        patches: 1
    })
});
