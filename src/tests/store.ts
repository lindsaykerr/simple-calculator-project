import ExpressionStore from "../modules/entrystore";

test("check size", () => {
    const store = new ExpressionStore(10);
    expect(store.size).toEqual(10);
});

test("Add Items", () =>{
    const store = new ExpressionStore(10);
    store.addEntry("A");
    store.addEntry("B");
    store.addEntry("C");
    expect(store.list.length).toEqual(3);
});

test("Overflow store size", () => {
    const store = new ExpressionStore(5);
    store.addEntry("A");
    store.addEntry("B");
    store.addEntry("C");
    store.addEntry("E");
    store.addEntry("D");
    store.addEntry("F");
    expect(store.list.length).toEqual(5);
});
test("Check bounds after overflow add", () => {
    const store = new ExpressionStore(5);
    store.addEntry("A");
    store.addEntry("B");
    store.addEntry("C");
    store.addEntry("D");
    store.addEntry("E");
    store.addEntry("F");
    store.addEntry("G");
    expect(store.list).toEqual(["C","D","E","F","G"]);
})

test("Pointer defualt position", () =>{
    const store = new ExpressionStore(5);
    store.addEntry("A");
    store.addEntry("B");
    store.addEntry("C");
    expect(store.getExpression()).toEqual("C");
});
test("Move the pointer all the way down", () =>{
    const store = new ExpressionStore(5);
    store.addEntry("A");
    store.addEntry("B");
    store.addEntry("C");
    store.addEntry("D");
    expect(store.getExpression()).toEqual("D");
    store.moveDown();
    store.moveDown();
    expect(store.getExpression()).toEqual("B");
    store.moveDown();
    expect(store.getExpression()).toEqual("A");
    store.moveDown();
    expect(store.getExpression()).toEqual("A");
});
test("Move the pointer all the way up", () => {
    const store = new ExpressionStore(5);
    store.addEntry("A");
    store.addEntry("B");
    store.addEntry("C");
    store.addEntry("D");
    expect(store.getExpression()).toEqual("D");
    store.moveDown();
    store.moveDown();
    expect(store.getExpression()).toEqual("B");
    store.moveUp();
    store.moveUp();
    expect(store.getExpression()).toEqual("D");
    store.moveUp();
    expect(store.getExpression()).toEqual("D");
    
})

