const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  console.log('ruta no accesible');
  res.redirect('/login/signin');
};

module.exports = helpers;
