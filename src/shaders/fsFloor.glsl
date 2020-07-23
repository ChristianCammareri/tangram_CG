#version 300 es
precision highp float;

in vec2 fs_uv;

uniform sampler2D u_texture;
out vec4 color;

void main() {
	

	color = texture(u_texture, uvFS);;

}