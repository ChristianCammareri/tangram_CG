#version 300 es
precision highp float;

//in vec3 fs_pos;
//in vec3 fs_norm;
in vec3 fsNormal;
in vec3 fsPosition;
//in vec2 fs_uv;

uniform sampler2D u_texture;
uniform vec3 eyePos;

uniform vec4 ambientType;
uniform vec4 diffuseType;
uniform vec4 specularType;
uniform vec4 emissionType;

uniform vec4 LAlightType;
uniform vec3 LAPos;
uniform vec3 LADir;
uniform float LAConeOut;
uniform float LAConeIn;
uniform float LADecay;
uniform float LATarget;
uniform vec4 LAlightColor;

uniform vec4 LBlightType;
uniform vec3 LBPos;
uniform vec3 LBDir;
uniform float LBConeOut;
uniform float LBConeIn;
uniform float LBDecay;
uniform float LBTarget;
uniform vec4 LBlightColor;
/*
uniform vec4 LClightType;
uniform vec3 LCPos;
uniform vec3 LCDir;
uniform float LCConeOut;
uniform float LCConeIn;
uniform float LCDecay;
uniform float LCTarget;
uniform vec4 LClightColor;
*/
uniform vec4 ambientLightColor;
uniform vec4 ambientLightLowColor;
uniform vec3 ADir;
uniform vec4 diffuseColor;
uniform float DTexMix;
uniform vec4 specularColor;
uniform float SpecShine;
uniform float DToonTh;
uniform float SToonTh;
uniform vec4 ambientMatColor;
uniform vec4 emitColor;

out vec4 color;

vec3 compLightDir(vec3 LPos, vec3 LDir, vec4 lightType) {
	//lights
	// -> Point
	vec3 pointLightDir = normalize(LPos - fsPosition);
	// -> Direct
	vec3 directLightDir = LDir;
	// -> Spot
	vec3 spotLightDir = normalize(LPos - fsPosition);

	return            directLightDir * lightType.x +
					  pointLightDir * lightType.y +
					  spotLightDir * lightType.z;
}

vec4 compLightColor(vec4 lightColor, float LTarget, float LDecay, vec3 LPos, vec3 LDir,
					float LConeOut, float LConeIn, vec4 lightType) {
	float LCosOut = cos(radians(LConeOut / 2.0));
	float LCosIn = cos(radians(LConeOut * LConeIn / 2.0));

	//lights
	// -> Point
	vec4 pointLightCol = lightColor * pow(LTarget / length(LPos - fsPosition), LDecay);
	// -> Direct
	vec4 directLightCol = lightColor;
	// -> Spot
	vec3 spotLightDir = normalize(LPos - fsPosition);
	float CosAngle = dot(spotLightDir, LDir);
	vec4 spotLightCol = lightColor * pow(LTarget / length(LPos - fsPosition), LDecay) *
						clamp((CosAngle - LCosOut) / (LCosIn - LCosOut), 0.0, 1.0);
	// ----> Select final component
	return          directLightCol * lightType.x +
					pointLightCol * lightType.y +
					spotLightCol * lightType.z;
}

vec4 compDiffuse(vec3 lightDir, vec4 lightCol, vec3 normalVec, vec4 diffColor) {
	// Diffuse
	// --> Lambert
	vec4 diffuseLambert = lightCol * clamp(dot(normalVec, lightDir),0.0,1.0) * diffColor;
	// --> Toon
	vec4 ToonCol;
	if(dot(normalVec, lightDir) > DToonTh) {
		ToonCol = diffColor;
	} else {
		ToonCol = vec4(0.0, 0.0, 0.0, 1.0);
	}
	vec4 diffuseToon = lightCol * ToonCol;
	// ----> Select final component
	return         diffuseLambert * diffuseType.x +
				   diffuseToon * diffuseType.y;
}

vec4 compSpecular(vec3 lightDir, vec4 lightCol, vec3 normalVec, vec3 eyedirVec) {
	// Specular
	// --> Phong
	vec3 reflection = -reflect(lightDir, normalVec);
	vec4 specularPhong = lightCol * pow(max(dot(reflection, eyedirVec), 0.0), SpecShine) * specularColor;
	// --> Blinn
	vec3 halfVec = normalize(lightDir + eyedirVec);
	vec4 specularBlinn = lightCol * pow(max(dot(normalVec, halfVec), 0.0), SpecShine) * specularColor;
	// --> Toon Phong
	vec4 ToonSpecPCol;
	if(dot(reflection, eyedirVec) > SToonTh) {
		ToonSpecPCol = specularColor;
	} else {
		ToonSpecPCol = vec4(0.0, 0.0, 0.0, 1.0);
	}
	vec4 specularToonP = lightCol * ToonSpecPCol;
	// --> Toon Blinn
	vec4 ToonSpecBCol;
	if(dot(normalVec, halfVec) > SToonTh) {
		ToonSpecBCol = specularColor;
	} else {
		ToonSpecBCol = vec4(0.0, 0.0, 0.0, 1.0);
	}
	vec4 specularToonB = lightCol * ToonSpecBCol;
	// ----> Select final component
	return          specularPhong * specularType.x +
					specularBlinn * specularType.y +
					specularToonP * specularType.z +
					specularToonB * specularType.w;
}

void main() {
	//vec4 texcol = texture(u_texture, fs_uv);
	vec4 diffColor = diffuseColor * (1.0-DTexMix) ;//+ texcol * DTexMix;
	vec4 ambColor = ambientMatColor * (1.0-DTexMix);// + texcol * DTexMix;
	//vec4 emit = (emitColor * (1.0-DTexMix) +
				    //texcol * DTexMix * 
				   		//	max(max(emitColor.r, emitColor.g), emitColor.b)) * emissionType.r;
//				   		   (0.299*emitColor.r + 0.587*emitColor.g + 0.114*emitColor.b);
	
	vec3 normalVec = normalize(fsNormal);
	vec3 eyedirVec = normalize((0.0, 0.0, 0.0) - fsPosition);
	
	//lights
	vec3 LAlightDir = compLightDir(LAPos, LADir, LAlightType);
	vec4 LAlightCol = compLightColor(LAlightColor, LATarget, LADecay, LAPos, LADir,
								     LAConeOut, LAConeIn, LAlightType);
	
	vec3 LBlightDir = compLightDir(LBPos, LBDir, LBlightType);
	vec4 LBlightCol = compLightColor(LBlightColor, LBTarget, LBDecay, LBPos, LBDir,
								     LBConeOut, LBConeIn, LBlightType);
	
	/*vec3 LClightDir = compLightDir(LCPos, LCDir, LClightType);
	vec4 LClightCol = compLightColor(LClightColor, LCTarget, LCDecay, LCPos, LCDir,
								     LCConeOut, LCConeIn, LClightType);
	*/
	// Ambient
	// --> Ambient
	vec4 ambientAmbient = ambientLightColor * ambColor;
	// --> Hemispheric
	float amBlend = (dot(normalVec, ADir) + 1.0) / 2.0;
	vec4 ambientHemi = (ambientLightColor * amBlend + ambientLightLowColor * (1.0 - amBlend)) * ambColor;
	// ----> Select final component
	vec4 ambient = ambientAmbient * ambientType.x +
				   ambientHemi * ambientType.y;
	
	// Diffuse
	vec4 diffuse = compDiffuse(LAlightDir, LAlightCol, normalVec, diffColor) + 
				   compDiffuse(LBlightDir, LBlightCol, normalVec, diffColor);
				   //compDiffuse(LClightDir, LClightCol, normalVec, diffColor);
	
	// Specular
	// --> Phong
	vec4 specular = compSpecular(LAlightDir, LAlightCol, normalVec, eyedirVec) +
					compSpecular(LBlightDir, LBlightCol, normalVec, eyedirVec);
					//compSpecular(LClightDir, LClightCol, normalVec, eyedirVec);
	
	
	// final steps
	vec4 out_color = clamp(ambient + diffuse + specular, 0.0, 1.0); //+ emit, 0.0, 1.0);
	
	color = vec4(out_color.rgb, 1.0);
}