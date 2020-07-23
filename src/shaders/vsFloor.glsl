#version 300 es

in vec3 inPosition;
in vec2 a_uv;

out vec2 uvFS;

void main() {
  
  uvFS = a_uv;
  gl_Position = matrix * vec4(inPosition, 1.0);
}