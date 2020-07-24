#version 300 es

in vec3 inPosition;
in vec2 inUv;

out vec2 uvFS;
uniform mat4 matrix;

void main() {
  
  uvFS = inUv;
  gl_Position = matrix * vec4(inPosition, 1.0);
}