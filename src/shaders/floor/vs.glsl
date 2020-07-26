#version 300 es

in vec3 inPosition;
in vec3 inNormal;
in vec2 in_uv;

out vec2 uvFS;
out vec3 fsPosition;
out vec3 fsNormal;
uniform mat4 matrix;
uniform mat4 nMatrix;
uniform mat4 pMatrix;

void main() {
  
  uvFS = in_uv;
  fsNormal = mat3(nMatrix) * inNormal;
  fsPosition = (pMatrix * vec4(inPosition, 1.0)).xyz;
  gl_Position = matrix * vec4(inPosition, 1.0);
}