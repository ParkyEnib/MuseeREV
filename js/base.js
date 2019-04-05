function creerGroupe(nom){
	var groupe  = new THREE.Group() ; 
	groupe.name = nom ; 
	return groupe ; 
}


function creerAxes(l){
    return new THREE.AxisHelper(l) ; 
}
	

function creerSol(nom,largeur,hauteur,materiau){
	var geo   = new THREE.PlaneGeometry(
					largeur,hauteur,
					Math.floor(largeur/10.0)+1, Math.floor(hauteur/10)+1) ; 
	var mesh  = new THREE.Mesh(geo,materiau) ; 
	mesh.name = nom ;
	mesh.rotation.x = - Math.PI / 2 ;
	return mesh ;   
}

function creerCloison(nom,largeur, hauteur, epaisseur, materiau){
	var geo  = new THREE.BoxGeometry(largeur, hauteur, epaisseur) ; 
	var mesh = new THREE.Mesh(geo, materiau) ;
	var groupe = new THREE.Group() ; 
	groupe.name = nom ;
	groupe.add(mesh) ; 
	mesh.position.set(0,hauteur/2.0,0) ;  
	return groupe ;  	
}

function creerEscalier(nom,largeur, hauteur, profondeur, marches, materiau){
  
	var groupe = new THREE.Group() ; 
	groupe.name = nom ;
	
	var geo;
	var mesh;
	
	for(var n=1; n<=marches; n++){
	  var h = hauteur * n/marches;
	  var p = profondeur/marches;
	  geo  = new THREE.BoxGeometry(largeur, h, p) ; 
	  mesh = new THREE.Mesh(geo, materiau) ;
	  groupe.add(mesh) ; 
	  mesh.position.set(0,h/2.0,-p*(n-1)) ;  
	  
	}

	return groupe ;  	
}

function creerAscenseur(nom,largeur, hauteur_inter, profondeur, etages, hauteur_cabine, materiau){
  
	var groupe = new THREE.Group() ; 
	groupe.name = nom ;
	
	var geo;
	var mesh;
	var groupe_cabine;
	var groupe_inter;
	
	
	if(hauteur_inter<0) return null;
	
	for(var n=0; n<etages; n++){
	  
	  groupe_cabine = creerCabine(nom, largeur, hauteur_cabine, profondeur, materiau);
	  groupe.add(groupe_cabine) ; 
	  groupe_cabine.position.set(0,n*(hauteur_cabine+hauteur_inter),0) ;  
	  
	  groupe_inter = creerInterCabine(nom, largeur, hauteur_inter, profondeur, materiau);
	  groupe.add(groupe_inter) ; 
	  groupe_inter.position.set(0,n*(hauteur_cabine+hauteur_inter) + hauteur_cabine,0) ;  
	  
	}
	
	groupe_cabine = creerCabine(nom, largeur, hauteur_cabine, profondeur, materiau);
	groupe.add(groupe_cabine) ; 
	groupe_cabine.position.set(0,etages*(hauteur_cabine+hauteur_inter),0) ;  

	return groupe ;  	
}

function creerCabine(nom,largeur, hauteur, profondeur, materiau){
  
	var groupe = new THREE.Group() ; 
	groupe.name = nom ;
	
	var geo;
	var mesh;
	var epaisseur = 0.2;
	
	//mur fond
	geo  = new THREE.BoxGeometry(largeur, hauteur, epaisseur) ; 
	mesh = new THREE.Mesh(geo, materiau) ;
	groupe.add(mesh) ; 
	mesh.position.set(0,hauteur/2.0,-profondeur/2.0+epaisseur/2.0) ;  
	
	//mur devant gauche fixe
	geo  = new THREE.BoxGeometry((largeur + 2*epaisseur)/4, hauteur, epaisseur) ; 
	mesh = new THREE.Mesh(geo, materiau) ;
	groupe.add(mesh) ; 
	mesh.position.set((-3*largeur+2*epaisseur)/8.0,hauteur/2.0,profondeur/2.0-epaisseur/2.0) ;  
	
	//mur devant droit fixe
	geo  = new THREE.BoxGeometry((largeur + 2*epaisseur)/4, hauteur, epaisseur) ; 
	mesh = new THREE.Mesh(geo, materiau) ;
	groupe.add(mesh) ; 
	mesh.position.set(-(-3*largeur+2*epaisseur)/8.0,hauteur/2.0,profondeur/2.0-epaisseur/2.0) ; 
	
	//mur devant gauche mobile
	geo  = new THREE.BoxGeometry((largeur + 2*epaisseur)/4, hauteur, epaisseur) ; 
	mesh = new THREE.Mesh(geo, materiau) ;
	groupe.add(mesh) ; 
	mesh.position.set((-largeur+6*epaisseur)/8.0,hauteur/2.0,profondeur/2.0-epaisseur*1.5) ;  
	
	//mur devant droit fixe
	geo  = new THREE.BoxGeometry((largeur + 2*epaisseur)/4, hauteur, epaisseur) ; 
	mesh = new THREE.Mesh(geo, materiau) ;
	groupe.add(mesh) ; 
	mesh.position.set(-(-largeur+6*epaisseur)/8.0,hauteur/2.0,profondeur/2.0-epaisseur*1.5) ; 
	
	//mur droit
	geo  = new THREE.BoxGeometry(largeur, hauteur, epaisseur) ; 
	mesh = new THREE.Mesh(geo, materiau) ;
	groupe.add(mesh) ; 
	//mesh.rotation.set(new THREE.Vector3( 0, Math.PI / 2, 0));
	mesh.rotation.y = Math.PI / 2;
	mesh.position.set(profondeur/2.0-epaisseur/2.0,hauteur/2.0,0) ; 
	
	//mur gauche
	geo  = new THREE.BoxGeometry(largeur, hauteur, epaisseur) ; 
	mesh = new THREE.Mesh(geo, materiau) ;
	groupe.add(mesh) ; 
	mesh.rotation.y = Math.PI / 2;
	mesh.position.set(-profondeur/2.0+epaisseur/2.0,hauteur/2.0,0) ; 
	  
	

	return groupe ;  	
}

function creerInterCabine(nom,largeur, hauteur, profondeur, materiau){
  
	var groupe = new THREE.Group() ; 
	groupe.name = nom ;
	
	var geo;
	var mesh;
	var epaisseur = 0.2;
	
	//mur fond
	geo  = new THREE.BoxGeometry(largeur, hauteur, epaisseur) ; 
	mesh = new THREE.Mesh(geo, materiau) ;
	groupe.add(mesh) ; 
	mesh.position.set(0,hauteur/2.0,-profondeur/2.0+epaisseur/2.0) ;  
	
	//mur devant
	geo  = new THREE.BoxGeometry(largeur, hauteur, epaisseur) ; 
	mesh = new THREE.Mesh(geo, materiau) ;
	groupe.add(mesh) ; 
	mesh.position.set(0,hauteur/2.0,profondeur/2.0-epaisseur/2.0) ;  
	
	//mur droit
	geo  = new THREE.BoxGeometry(largeur, hauteur, epaisseur) ; 
	mesh = new THREE.Mesh(geo, materiau) ;
	groupe.add(mesh) ; 
	mesh.rotation.y = Math.PI / 2;
	mesh.position.set(profondeur/2.0-epaisseur/2.0,hauteur/2.0,0) ; 
	
	//mur gauche
	geo  = new THREE.BoxGeometry(largeur, hauteur, epaisseur) ; 
	mesh = new THREE.Mesh(geo, materiau) ;
	groupe.add(mesh) ; 
	mesh.rotation.y = Math.PI / 2;
	mesh.position.set(-profondeur/2.0+epaisseur/2.0,hauteur/2.0,0) ; 
	  
	

	return groupe ;  	
}

function creerGraph(nom,rayon, subdivisions, etages, materiau, rayon_limite, hauteur_limite){
  
	var groupe = new THREE.Group() ;
	
	//1ere sphere
	var geo  = new THREE.SphereGeometry(rayon, subdivisions, subdivisions) ; 
	var mesh = new THREE.Mesh(geo, materiau) ; 
	mesh.name = nom ; 
	mesh.position.set(0, rayon, 0);

	groupe.add(mesh);
	
	for(var e = 1; e<=etages; e++){
	  var tmpGroupe = new THREE.Group() ;
	  for(var i = 0; i<Math.pow(2,e){
	    var mesh = creerSphereSuivante(rayon, subdivisions, materiau, rayon_limite, hauteur_limite,x,y,z)
	    tmpGroupe.add(mesh);
	  mesh.setPosition(
	}
	
	return mesh ;  
}

function creerSphereSuivante(rayon, subdivisions, materiau, rayon_limite, hauteur_limite,x,y,z){
	
	var geo  = new THREE.SphereGeometry(rayon, subdivisions, subdivisions) ; 
	var mesh = new THREE.Mesh(geo, materiau) ; 
	var nx = x + Math.random()-0.5;
	var ny = y + Math.random()*0.25 + 0.25;
	var nz = z + Math.random()-0.5;
	
	while(Math.sqrt(nx*nx + nz*nz) > rayon_limite || ny > hauteur_limite || ny < 0){
	  nx = x + Math.random()-0.5;
	  ny = y + Math.random()*0.25 + 0.25;
	  nz = z + Math.random()-0.5;
	}
	  
	mesh.position.set(nx, ny, nz);  
	return mesh ;  
}


function creerSphere(nom,rayon, subdivisions, materiau){
	var geo  = new THREE.SphereGeometry(rayon, subdivisions, subdivisions) ; 
	var mesh = new THREE.Mesh(geo, materiau) ; 
	mesh.name = nom ; 
	return mesh ;  
}


function creerPoster(nom,largeur, hauteur, nomImage){
	var geo   = new THREE.PlaneGeometry(largeur, hauteur) ; 
	var mat   = creerLambertTexture(nomImage, 0xffffff) ; 
	var mesh  = new THREE.Mesh(geo, mat) ; 
	mesh.name = nom ;
	return mesh ;   
}

function creerPoster1(nom,largeur, hauteur, nomImage){
	var geo    = new THREE.PlaneGeometry(largeur, hauteur) ; 
	var mat    = creerLambertTexture(nomImage, 0xffffff) ; 
	var mesh   = new THREE.Mesh(geo, mat) ; 
	mesh.name = "poster_"+nom ;
	var dos    = new THREE.Mesh(geo, materiauBlanc) ; 
	dos.rotation.y = Math.PI ; 
	dos.position.z = -0.01 ; 
	mesh.position.z = 0.01 ; 

	var groupe = new THREE.Group() ; 
	groupe.add(mesh) ; 
	groupe.add(dos) ;  
	groupe.name  = nom ;
	return groupe ;   
}

function creerText(description,largeur,hauteur){
	canvas = document.createElement('canvas')
	context = canvas.getContext('2d');
	canvas.width=1000
	canvas.heigth=5
	context.font = '80pt Arial';
	context.fillStyle = 'white';
	context.fillRect(0, 0, canvas.width - 0, canvas.height - 0);
	context.fillStyle = 'black';
    	context.textAlign = "center";
    	context.textBaseline = "middle";
    	context.fillText(description, canvas.width / 2, canvas.height / 2);

	var geometry = new THREE.PlaneGeometry(largeur*0.9, hauteur*0.1) ; 
	texture = new THREE.CanvasTexture(canvas);
	var material = new THREE.MeshLambertMaterial({color:0xffffff,map:texture}) ;
	var mesh = new THREE.Mesh(geometry,material)
    return mesh;
}





// ===================
// Création de sources
// ===================

function creerSourcePonctuelle(couleur, intensite, portee, attenuation){
	var light = new THREE.PointLight(couleur,intensite,portee,attenuation) ; 
	return light ; 
}

function creerSoleil(){
	var h = new THREE.HemisphereLight(0xffffbb,0x080820,1) ; 
	return h ; 
}

function creerSourceAudio3d(listener, fileName, loop, volume, distance){
	sound = new THREE.PositionalAudio(listener) ; 
	var audioLoader = new THREE.AudioLoader() ; 
	audioLoader.load(
				fileName,
   				function(buffer){
					//var _loop     = params["loop"]     || false ; 
					//var _volume   = params["volume"]   || 1.0 ;
					//var _distance = params["distance"] || 20 ;
					sound.setBuffer(buffer) ; 
					sound.setLoop(loop) ; 
					sound.setVolume(volume) ;
					sound.setRefDistance(distance) ;  
					sound.play() ; 
				}) ;
	return sound ;
}



// =====================
// Création de matériaux
// =====================

var textureLoader = new THREE.TextureLoader() ; 

var materiauBlanc  = creerLambert(0xffffff) ; 
var materiauRouge  = creerLambert(0xff0000) ;

function creerLambert(couleur){
  	var mat = new THREE.MeshLambertMaterial({color:couleur}) ; 
	return mat ; 
}

function creerLambertTexture(nomImage,couleur,nx,ny){
	var texture = textureLoader.load(nomImage) ; 
	var mat = new THREE.MeshLambertMaterial({color:couleur,map:texture}) ; 
	nx = nx ||   1 ; 
	ny = ny ||   1 ; 
	mat.map.wrapS = THREE.RepeatWrapping ;
	mat.map.wrapT = THREE.RepeatWrapping ;
	mat.map.repeat.set(nx,ny) ; 
	return mat ; 
}


// ======================
// Traitements des meshes
// ======================

function placerXYZ(mesh,x,y,z){
	mesh.translateX(x) ; 
	mesh.translateY(y) ; 
	mesh.translateZ(z) ; 
}

function orienterY(mesh,y){
	mesh.rotateY(y) ; 
}

function parentDe(pere,fils){
	pere.add(fils) ; 
}




// =============================
// Sélection par lancer de rayon
// =============================

var projector   = new THREE.Projector() ;
var listeIntersection = [] ; 

var camPos = null;
var camDir = null;
