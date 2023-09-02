const srting="899m";
let srtingNums=srting.slice(0,(srting.length-1));
let stringUnit=srting.slice((srting.length-1),srting.length);
let srtingFloat=parseFloat(srtingNums);
let multiplier = 1;
let adder = 0;
let viewNum=1;
if(isNaN(stringUnit)){
    console.log("notnumber")
    if(stringUnit.toLowerCase()=="k"){
        multiplier = 1000;
    }
    else if(stringUnit.toLowerCase()=="m"){
        multiplier = 1000000;
    }
    else if(stringUnit.toLowerCase()=="b"){
        multiplier = 1000000000;
    }
    viewNum=srtingFloat*multiplier
}
else{
    console.log("Number");
    adder = parseInt(stringUnit);
    viewNum=srtingFloat*10+adder;
}
return viewNum

console.log(viewNum);
// return srtingFloat;