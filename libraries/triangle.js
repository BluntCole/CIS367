/*
triangle.js
Erik Fredericks, c/o Ed Angel

This file does the actual drawing of the triangle
*/

// Global variables we'll need
var gl;
var points;
var color = vec4(1.0, 0.0, 0.0, 1.0);
var colorLoc;
let lastClick = 0;
var angle = 0;
// var vertexVelocities = [vec2(1,1),vec2(-1,-1),vec2(1,-1)];
// var vertexPositions = [vec2(-1, -1), vec2(0, 1), vec2(1, -1)];


// This function executes our WebGL code AFTER the window is loaded.
// Meaning, that we wait for our canvas element to exist.
window.onload = function init() {
  // Grab the canvas object and initialize it
  var canvas = document.getElementById('gl-canvas');
  gl = WebGLUtils.setupWebGL(canvas);

  // Error checking
  if (!gl) { alert('WebGL unavailable'); }


  var vertices = [
    vec2(-1, -1 + Math.sin(angle)),
    vec2(0, 1 + Math.sin(angle)),
    vec2(1, -1 + Math.sin(angle))
  ];

  // configure WebGL
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(1.0, 1.0, 1.0, 1.0);

  // load shaders and initialize attribute buffers
  var program = initShaders(gl, 'vertex-shader', 'fragment-shader');
  gl.useProgram(program);

  colorLoc = gl.getUniformLocation(program, "color");
  gl.uniform4fv(colorLoc, color); 

  // load data into GPU
  var bufferID = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferID);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

  // set its position and render it
  var vPosition = gl.getAttribLocation(program, 'vPosition');
  gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vPosition);
  render();
};

// Render whatever is in our gl variable
function render() {
//   var scaleMatrix = mat2(0.5, 0,
//     0, 0.5);

//   for(let i = 0 ; i < vertexPositions.length ; i++){
//     vertexPositions[i] =  mult(vertexPositions[i], scaleMatrix);
// }
//   for (let i = 0; i < vertexPositions.length; i++) {
//     // update the position of the vertex
//     vertexPositions[i] = add(vertexPositions[i],vertexVelocities[i]);
//     // Check if the vertex is out of bounds
//     if (vertexPositions[i][0] < -1 || vertexPositions[i][0] > 1) {
//         vertexVelocities[i][0] = -vertexVelocities[i][0];
//     }
//     if (vertexPositions[i][1] < -1 || vertexPositions[i][1] > 1) {
//         vertexVelocities[i][1] = -vertexVelocities[i][1];
//     }
// }
angle += 0.008;

vertices = [
  vec2(-1, -1 + Math.sin(angle)),
  vec2(0, 1 + Math.sin(angle)),
  vec2(1, -1 + Math.sin(angle))
];

  gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.DYNAMIC_DRAW);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
  requestAnimationFrame(render);
  changeColor();
}

function changeColor() {
  let now = Date.now();
  if (now - lastClick < 1000) {
    return;
  }
  lastClick = now;
  // change the color value
  var r = Math.random();
  var g = Math.random();
  var b = Math.random();
  var a = 1.0;
  var color = [r, g, b, a];;
  gl.uniform4fv(colorLoc, color);
}
