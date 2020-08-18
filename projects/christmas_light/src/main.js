const lights = document.getElementsByClassName("circle");
const speedVal =document.getElementById("speedVal");
console.log(speedVal);
let setSpeed = (lightsArr, speed) =>{
    for(let i = 0; i < lightsArr.length; i++){
        lightsArr[i].style.animationDuration = speed + "s";
    }
}
let toogleOnOff = (lightsArr) =>{
    let on = lightsArr[0].style.animationIterationCount == "infinite";
    for(let i = 0; i < lightsArr.length; i++){
        lightsArr[i].style.animationIterationCount = on ? "0" : "infinite";
    }
};
speedVal.value = 3;
setSpeed(lights, speedVal.value);
document.getElementById("switchButton").addEventListener("click", (event) =>{
    toogleOnOff(lights);
})
document.getElementById("speedButton").addEventListener("click", (event) =>{
    setSpeed(lights, speedVal.value);
})