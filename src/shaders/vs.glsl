#version 300 es

in vec3 inPosition;
in vec3 inNormal;

out vec3 fsNormal;
out vec3 fsPosition;

uniform mat4 matrix;
uniform mat4 pMatrix;
uniform mat4 nMatrix;     //matrix to transform normals

void main() {
  fsNormal = mat3(nMatrix) * inNormal; 
  fsPosition = (pMatrix* vec4(inPosition, 1.0)).xyz;
  gl_Position = matrix * vec4(inPosition, 1.0);
}