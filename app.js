// initialize needed variables from html
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

// constant values
const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;
// set canvas pixel width/height 
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// ctx initializers

// initializing to white on canvas background for initial export trial
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

// variables that tell mode 
let painting = false;
let filling = false;

// functions after event handler
function stopPainting() {
    painting = false;
}
function startPainting() {
    painting = true;
}
function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
} 

// event handlers
function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick(event) {
    if(filling) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick(event) {
    if (filling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function handleSaveClick() {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "paintJS[EXPORT]"
    link.click();
}

function handleCM(event) {
    event.preventDefault();
}

// canvas firing event handlers
if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

// firing color handlers
Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));


// firing range handlers
if(range) {
    range.addEventListener("input", handleRangeChange)
}

// firing mode handlers
if(mode) {
    mode.addEventListener("click", handleModeClick)
}

// firing save button handlers
if(saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}