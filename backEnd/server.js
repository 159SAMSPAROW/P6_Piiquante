const http = require('http');//Importation du package http 
const app = require('./app');//Importaion de l' appli

const normalizePort = val => {//Fonction qui vérifie si le port est valide et le renvoie sous forme d' entier
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);//Utilisation de la variable d' environnement ou du port 3000

const errorHandler = error => {//Fonction qui recherche les erreurs  
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
    break;

    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
    break;
    default:
      throw error;
  }
};

const server = http.createServer(app);//Création du server

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port);//Ecoute du port choisi
