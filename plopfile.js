const blogGenerator = require('./plop-template/prompt')
module.exports = function (plop) {
    // controller generator
    plop.setGenerator('blog', blogGenerator);
};