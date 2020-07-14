#version 300 es

precision mediump float;

in vec3 fsNormal;
in vec3 fsPosition;

out vec4 outColor;

uniform vec3 mDiffColor;
uniform vec3 lightDirection; 
uniform vec3 lightColor;

void main() {

  vec3 nNormal = normalize(fsNormal);  
  vec3 nEyeDirection = normalize ((0.0, 0.0, 0.0) - fsPosition);
  
  vec3 lDir = lightDirection; 
  vec3 lambertColor = mDiffColor * lightColor * dot(-lDir,nNormal);
  outColor = vec4(clamp(lambertColor, 0.0, 1.0), 1.0);
}