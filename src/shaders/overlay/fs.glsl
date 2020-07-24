#version 300 es

precision mediump float;

in vec3 fsNormal;
in vec3 fsPosition;

out vec4 outColor;

uniform vec3 materialColor;
uniform vec3 lightDirection; 
uniform vec3 lightColor;   

void main() {

	vec3 nNormal = normalize(fsNormal);  
  	vec3 lDir = lightDirection; 
  	vec3 lambertColor = materialColor * lightColor * dot(-lDir,nNormal);

	outColor = vec4(clamp(lambertColor, 0.0, 1.0), 1.0);
}