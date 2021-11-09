import Calculation from "../calculate"

test("numbers", () =>{
    expect(Calculation.do("0")).toEqual("0");
    expect(Calculation.do("-1")).toEqual("-1");
    expect(Calculation.do("+1")).toEqual("1");
    expect(Calculation.do(".")).toEqual("0");
    expect(Calculation.do("-.1")).toEqual("-0.1");
    expect(Calculation.do("0.123456")).toEqual("0.123456");
    expect(Calculation.do("123456.78")).toEqual("123456.78");
    expect(Calculation.do(".1234.1234")).toEqual("Operand Error 1")
})

test("addition", ()=>{
    expect(Calculation.do("+1")).toEqual("1");
    expect(Calculation.do("++++++1")).toEqual("1");
    expect(Calculation.do("+-+-+1")).toEqual("1");
    expect(Calculation.do("+1++1")).toEqual("2");
    expect(Calculation.do("√+25")).toEqual("5");
    expect(Calculation.do("1*+5")).toEqual("5");
    expect(Calculation.do("1/+100")).toEqual("0.01");
    expect(Calculation.do("1-+5")).toEqual("-4");
    expect(Calculation.do("+5^2")).toEqual("25");
    expect(Calculation.do("+(1)")).toEqual("1");
    expect(Calculation.do("5+")).toEqual("Operand Error 2");

});

test("subtration", () => {
    expect(Calculation.do("-1")).toEqual("-1");
    expect(Calculation.do("-1-1")).toEqual("-2");
    expect(Calculation.do("-1+1")).toEqual("0");
    expect(Calculation.do("-1--1")).toEqual("0");
    expect(Calculation.do("-1-+-+-+1")).toEqual("-2");
    expect(Calculation.do("√-25")).toEqual("Operand Error 1");
    expect(Calculation.do("-√-25")).toEqual("Operand Error 1");
    expect(Calculation.do("-√25")).toEqual("-5");
    expect(Calculation.do("1*-25")).toEqual("-25");
    expect(Calculation.do("-1*-25")).toEqual("25");
    expect(Calculation.do("1/25")).toEqual("0.04");
    expect(Calculation.do("-1/-25")).toEqual("0.04");
    expect(Calculation.do("-1/25")).toEqual("-0.04");
    expect(Calculation.do("-1*25")).toEqual("-25");
    expect(Calculation.do("1/-25")).toEqual("-0.04");
    expect(Calculation.do("1*-25")).toEqual("-25");
    expect(Calculation.do("1+-25")).toEqual("-24");
    expect(Calculation.do("-1+25")).toEqual("24");
    expect(Calculation.do("-1-+25")).toEqual("-26");
    expect(Calculation.do("1^2-1")).toEqual("0");
    expect(Calculation.do("1-^2--1")).toEqual("Operand Error 2");
    expect(Calculation.do("2-")).toEqual("Operand Error 2");
});

test("multipication", ()=>{
    expect(Calculation.do("*1")).toEqual("Operand Error 2");
    expect(Calculation.do("2*3")).toEqual("6");
    expect(Calculation.do("-2*3")).toEqual("-6");
    expect(Calculation.do("2*-3")).toEqual("-6");
    expect(Calculation.do("2*(3)")).toEqual("6");
    expect(Calculation.do("(2)*5")).toEqual("10");
    expect(Calculation.do("(2)*-5")).toEqual("-10");
    expect(Calculation.do("2^2*2")).toEqual("8");
    expect(Calculation.do("2*25^2")).toEqual("1250");
    expect(Calculation.do("2+√*25")).toEqual("Operand Error 2");
    expect(Calculation.do("2*1*-25")).toEqual("-50");
    expect(Calculation.do("-1*-25")).toEqual("25");
    expect(Calculation.do("1/*25")).toEqual("Operand Error 2");
    expect(Calculation.do("1√*25")).toEqual("Operand Error 2");
    expect(Calculation.do("1+*25")).toEqual("Operand Error 2");
    expect(Calculation.do("1-*25")).toEqual("Operand Error 2");
    expect(Calculation.do("1**25")).toEqual("Operand Error 2");
});

test("division", ()=>{
    expect(Calculation.do("1/")).toEqual("Operand Error 2");
    expect(Calculation.do("/1")).toEqual("Operand Error 2");
    expect(Calculation.do("6/3")).toEqual("2");
    expect(Calculation.do("-6/3")).toEqual("-2");
    expect(Calculation.do("6/-3")).toEqual("-2");
    expect(Calculation.do("6/(3)")).toEqual("2");
    expect(Calculation.do("(10)/2")).toEqual("5");
    expect(Calculation.do("(10)/-5")).toEqual("-2");
    expect(Calculation.do("2^2/2")).toEqual("2");
    expect(Calculation.do("2/25^2")).toEqual("0.0032");
    expect(Calculation.do("2+√/25")).toEqual("Operand Error 2");
    expect(Calculation.do("100*1/-25")).toEqual("-4");
    expect(Calculation.do("-100/-25")).toEqual("4");
    expect(Calculation.do("1//25")).toEqual("Operand Error 2");
    expect(Calculation.do("1√/25")).toEqual("Operand Error 2");
    expect(Calculation.do("1+/25")).toEqual("Operand Error 2");
    expect(Calculation.do("1-/25")).toEqual("Operand Error 2");
    expect(Calculation.do(`1*/25`)).toEqual("Operand Error 2");
});
test("square root", ()=>{
    expect(Calculation.do("√")).toEqual("Operand Error 1")
    expect(Calculation.do("√16")).toEqual("4")
    expect(Calculation.do("√16-1")).toEqual("3")
    expect(Calculation.do("-√16")).toEqual("-4")
    expect(Calculation.do("4√25")).toEqual("20")
    expect(Calculation.do("2/√16")).toEqual("0.5")
    expect(Calculation.do("√(18-2)")).toEqual("4")
    expect(Calculation.do("√(18-2)^2")).toEqual("16")
    expect(Calculation.do("1*√16")).toEqual("4")
    expect(Calculation.do("1+√16")).toEqual("5")
    expect(Calculation.do("1/√16")).toEqual("0.25")
    expect(Calculation.do("1*√16")).toEqual("4")
    expect(Calculation.do("√√16")).toEqual("Operand Error 1")
});

test("square", ()=>{
    expect(Calculation.do("^2")).toEqual("Operand Error 1")
    expect(Calculation.do("4^2")).toEqual("16")
    expect(Calculation.do("4^2-1")).toEqual("15")
    expect(Calculation.do("-4^2")).toEqual("16")
    expect(Calculation.do("2/4^2")).toEqual("0.125")
    expect(Calculation.do("(18-2)^2")).toEqual("256")
    expect(Calculation.do("2^2^2")).toEqual("16")
    expect(Calculation.do("4^2*1")).toEqual("16")
    expect(Calculation.do("4^2+1")).toEqual("17")
    expect(Calculation.do("4^2-1")).toEqual("15")
    expect(Calculation.do("4^2/1")).toEqual("16")
});


test("parenthesis", ()=>{
    expect(Calculation.do("()")).toEqual("Operand Error 1");
    expect(Calculation.do("(1+1)")).toEqual("2");
    expect(Calculation.do("(1+1)-(1+1)")).toEqual("0");
    expect(Calculation.do("(1+1)/(1+1)")).toEqual("1");
    expect(Calculation.do("(1+1)*(1+1)")).toEqual("4");
    expect(Calculation.do("(1+1)+(1+1)")).toEqual("4");
    expect(Calculation.do("(1+1)(1+1)")).toEqual("4");
    expect(Calculation.do("2+((1+1)+2)")).toEqual("6");
    expect(Calculation.do("2/((1+1)/2)")).toEqual("2");
    expect(Calculation.do("2*((1+1)*2)")).toEqual("8");
    expect(Calculation.do("2-((1+1)-2)")).toEqual("2");
    expect(Calculation.do("((1+1)^2-2)^2")).toEqual("4");
    expect(Calculation.do("√(√(2+2)+2)")).toEqual("2");
});

test("complex equations", ()=>{
    expect(Calculation.do("4+-2(45^2/18)-√2")).toEqual("-222.4142135623731");
    expect(Calculation.do("-(10(10(10)/2)/2)+250")).toEqual("0");
    expect(Calculation.do("1-(10)/-2.5")).toEqual("5");

});











