// Global variables
let imageLoadLayer;

let img = [];
let imgAmt = 241;
let imgIndex = 1;

let sliceWidth = 20;
let sliceHeight = 200;

let x = 0;
let y = 0;
let step = sliceWidth;

// Preload images
function preload(){
  for(let i = 0; i < imgAmt; i++){
    img[i] = loadImage('Images/' + (i) + '.jpeg');
  }
}

// Setup canvas
function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
  background(0);

  imageLoadLayer = createGraphics(2, 1);
}

// Draw on canvas
function draw() {
  rectMode(CENTER);
  updateImageIndex();
  updateImageLayer();
  let colors = updateColors();
  updatePosition();
  drawGradientRect(colors);

  // push();
  // imageMode(CENTER);
  // translate(windowWidth/2,windowHeight/2);
  // image(img[imgIndex],-200,0,img[imgIndex].width/5,img[imgIndex].height/5);
  // noSmooth();
  // image(imageLoadLayer,200,0,200,200);
  // pop();
}

// Update image index
function updateImageIndex() {
  if(frameCount % 2 == 0){
    imgIndex = floor(random(0,imgAmt)); 
  }
}

// Update image layer
function updateImageLayer() {
  imageLoadLayer.background(0);
  imageLoadLayer.image(img[imgIndex],0,0,imageLoadLayer.width,imageLoadLayer.height);
}

// Update colors
function updateColors() {
  let cS = rgbaToColorString(imageLoadLayer.get(0,0));
  let c1 = rgbaToColorString(imageLoadLayer.get(1,0));
  let c2 = rgbaToColorString(imageLoadLayer.get(2,0));
  let c3 = rgbaToColorString(imageLoadLayer.get(0,1));
  let cE = rgbaToColorString(imageLoadLayer.get(0,2));
  return [cS, c1, c2, c3, cE];
}

// Draw gradient rectangle
function drawGradientRect(colors) {
  let [cS, c1, c2, c3, cE] = colors;
  let offset = map(tan(frameCount * 0.05) * sin(frameCount * 0.1), -1, 1, -sliceHeight/5, sliceHeight/5);
  push();
  translate(sliceWidth/2 + x,sliceHeight/2 + y);
  noStroke();
  radialGradient(0, offset, 10, offset, 0, sliceHeight * 1.5, cS, c1, c2, c3, cE);
  rect(0,0,sliceWidth,sliceHeight);
  pop();
}

// Update position
function updatePosition() {
  x += step;
  if(x  > windowWidth || x < 0){ 
    step *= -1;
    y += sliceHeight;
  }
  if(y > windowHeight){ 
    y = 0;
  }
}

// Create radial gradient
function radialGradient(sX,sY,sR,eX,eY,eR,colorS,color1,color2,color3,colorE){
  let gradient = drawingContext.createRadialGradient(sX,sY,sR,eX,eY,eR);
  gradient.addColorStop(0, colorS); 
  gradient.addColorStop(0.25, color1);
  gradient.addColorStop(0.5, color2);
  gradient.addColorStop(0.75, color3);
  gradient.addColorStop(1, colorE);
  drawingContext.fillStyle = gradient;
}

// Convert RGBA to color string
function rgbaToColorString(rgba) {
  return `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${rgba[3] / 255})`;
}