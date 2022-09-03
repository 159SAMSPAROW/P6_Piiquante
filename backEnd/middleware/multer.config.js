const multer = require('multer');//multer permet de gérer les fichiers entrants dans les requêtes HTTP. 

const MIME_TYPES = {//Création de l' objet qui définit les formats de fichier que l' on peut récupérer du front end 
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const storage = multer.diskStorage({//Création de l' objet de configuration, diskStorage indique que l' on veut 
                                    //l' enregistrer sur le disk dur
    
        destination: (req, file, callback) => {//Fonction qui indique a multer dans quel dossier enregistrer les fichiers
        callback(null, 'images')
    },
    filename: (req, file, callback) => {//Fonction qui défini le nouveau nom de fichier a envoyer
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);//Date.now = instant T en milliseconde
    }
});

module.exports = multer({ storage, limits : { fileSize: 2097152 }}).single('image');