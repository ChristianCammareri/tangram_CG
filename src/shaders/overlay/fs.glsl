#version 300 es

precision mediump float;

out vec4 outColor;

uniform vec4 materialColor;  

void main() {
	outColor = materialColor;
}