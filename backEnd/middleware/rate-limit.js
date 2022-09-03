const rateLimit = require('express-rate-limit');

// Middleware de limitation de nombre de connexion (10) par nombre de minute défini (60)
const apiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,// 60 minutes
  max: 100,// Limite chaque IP à 10 requêtes par `window`
  standardHeaders: true,// Return rate limit info dans les en-têtes `RateLimit-*`
  legacyHeaders: false,// Désactive les en-têtes `X-RateLimit-*` 
});

module.exports = apiLimiter;
