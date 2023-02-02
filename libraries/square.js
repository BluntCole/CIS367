var gl;
var points;

window.onload = function init(){
  var canvas = document.getElementById('gl-canvas');
  gl = WebGLUtils.setupWebGL( canvas );
  if ( !gl ) { alert('WebGL is not available'); }

  // Four vertices
  var numVertices = 30;
  var vertices = [];
  var eyeRadius = 0.05;
  var leftEyeVertices = [];
  var rightEyeVertices = [];  

  for (var i = 0; i < numVertices; i++) {
    var angle = 2 * Math.PI * i / numVertices;
    var x = 0.8 * Math.cos(angle);
    var y = 0.8 * Math.sin(angle);
    vertices.push(vec2(x, y));
}

for (var i = 0; i < numVertices; i++) {
  var angle = 2 * Math.PI * i / numVertices;
  var x = eyeRadius * Math.cos(angle) - 0.25;
  var y = eyeRadius * Math.sin(angle) + 0.25;
  leftEyeVertices.push(vec2(x, y));
  x = eyeRadius * Math.cos(angle) + 0.25;
  y = eyeRadius * Math.sin(angle) + 0.25;
  rightEyeVertices.push(vec2(x, y));
}

  // Configure WebGL
  gl.viewport( 0, 0, canvas.width, canvas.height);
  gl.clearColor( 0.0, 0.0, 0.0, 1.0 );

  // Load shaders and initialize attribute buffers
  var program = initShaders( gl, "vertex-shader", "fragment-shader" );
  gl.useProgram( program );

  // Load data into GPU
  var bufferID = gl.createBuffer();
  gl.bindBuffer( gl.ARRAY_BUFFER, bufferID );
  gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

  
// Load the left eye data into GPU
var leftEyeBufferID = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, leftEyeBufferID);
gl.bufferData(gl.ARRAY_BUFFER, flatten(leftEyeVertices), gl.STATIC_DRAW);

// Load the right eye data into GPU
var rightEyeBufferID = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, rightEyeBufferID);
gl.bufferData(gl.ARRAY_BUFFER, flatten(rightEyeVertices), gl.STATIC_DRAW);

  // Associate shader variables with data buffer
  var vPosition = gl.getAttribLocation( program, "vPosition" );
  gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
  gl.enableVertexAttribArray( vPosition );

  render();
};

function render(leftEyeBufferID, rightEyeBufferID) {
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLE_FAN, 0, 30);

}

