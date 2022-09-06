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
exports.port = normalizePort(process.env.PORT || '3000');

exports.errorHandler = error => {//Fonction qui recherche les erreurs  
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