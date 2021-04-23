const {getRandomQuizzes} = require("../../../src/server/db/quizzes");

test("Test invalid n", () =>{

    expect(() => getRandomQuizzes(-1)).toThrow(/invalid/i);
    expect(() => getRandomQuizzes(0)).toThrow();
    expect(() => getRandomQuizzes(100000000)).toThrow(/many quizzes/i);
});

test("get a set of quiz", () =>{
    const quizzes = getRandomQuizzes(1);

    expect( quizzes.length).toBe(1);
    expect( quizzes[0].question).toBeDefined();
    expect( quizzes[0].answers).toBeDefined()
    expect( quizzes[4]).toBeUndefined();

})

test("get set of two question every time", ()=>{

    for(let i=0; i<100; i++) {

        const quizzes = getRandomQuizzes(2);
        expect(quizzes.length).toBe(2);

    }

})