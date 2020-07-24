#version 300 es

in vec3 inPosition;
in vec2 in_uv;

out vec2 uvFS;
uniform mat4 matrix;

void main() {
  
  uvFS = in_uv;
  gl_Position = matrix * vec4(inPosition, 1.0);
}