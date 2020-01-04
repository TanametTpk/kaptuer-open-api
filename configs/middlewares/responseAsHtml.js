// for import files

module.exports = function( req, res, next ) {
    
    req._responseAsHtml = true
    return next();

};
