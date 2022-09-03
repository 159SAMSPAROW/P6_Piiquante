const jwt = require('jsonwebtoken');//Permet de créer des token d' identification
const secret_token = process.env.SECRET_TOKEN;

module.exports = (req, res, next) => {//middleware qui vérifie si l’utilisateur est bien connecté et transmet 
                                      //les informations de connexion aux différentes méthodes qui vont gérer les requêtes.
    try {
       const token = req.headers.authorization.split(' ')[1];//split permet de tout récupérer après l'espace dans le header
       const decodedToken = jwt.verify(token, secret_token);//Verify est utiliser pour décoder notre token
       const userId = decodedToken.userId;
       req.auth = {// extraction de l'ID utilisateur du token 
           userId: userId
       };
       next();
    
   } catch(error) {
       res.status(401).json({ error });
       
   }
};