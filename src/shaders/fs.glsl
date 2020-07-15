#version 300 es

precision mediump float;

in vec3 fsNormal;
in vec3 fsPosition;

out vec4 outColor;

uniform vec3 materialColor;
uniform vec3 specularColor;
uniform vec3 lightDirection; 
uniform vec3 lightPosition;
uniform vec3 lightColor;

uniform float decay;
uniform float target;
uniform float specShine;

// The shader can find the required informations in the following variables:

	//vec3 fs_pos;			// Position of the point in 3D space ( nostro fsPosition)
	//
	//vec3 LAPos;			// Position of first (or single) light (nostro light position)
	//vec3 LADir;			// Direction of first (or single) light (nostro light direction)
	//float LADecay;		// Decay factor (0, 1 or 2) (nostro decay)
	//float LATarget;		// Target distance (nostro target)
	//vec4 LAlightColor;	// color of the first light (nostro light color)

void main() {

  vec3 nNormal = normalize(fsNormal);  
  vec3 nEyeDirection = normalize ((0.0, 0.0, 0.0) - fsPosition);

  /*// Single point light with decay
	var S4 = `
	lightDirA   = normalize(LAPos - fs_pos);
	lightColorA = LAlightColor*pow((LATarget/length(LAPos - fs_pos)),LADecay);*/

  

  /*vec4 dLAcontr = clamp(dot(lightDirA, normalVec),0.0,1.0) * lightColorA;
	vec4 diffuse = diffColor * (dLAcontr + dLBcontr + dLCcontr);

	vec4 sLAcontr = pow(clamp(dot(eyedirVec, -1.0*reflect(lightDirA, normalVec)),0.0,1.0), SpecShine) * lightColorA;
	vec4 specular = specularColor * (sLAcontr + sLBcontr + sLCcontr);

	out_color = clamp(diffuse + specular + ambientLight * ambColor + emit, 0.0, 1.0);*/

  vec3 diffuse = materialColor * lightColor * clamp(dot(-lightDirection, nNormal),0.0, 1.0);

  vec3 specular = specularColor * lightColor * pow(clamp(dot(nEyeDirection, reflect(-lightDirection,nNormal)), 0.0,1.0),specShine);
  
  vec3 lDir = lightDirection; 
  vec3 lambertColor = materialColor * lightColor * dot(-lDir,nNormal);
  //outColor = vec4(clamp(lambertColor, 0.0, 1.0), 1.0);
 outColor = vec4(clamp(diffuse + specular, 0.0, 1.0), 1.0);
}