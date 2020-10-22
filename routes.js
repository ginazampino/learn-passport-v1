const path = require('path');
const { resolve } = require('path');
const passport = require('passport');

module.exports = (app) => {
    const index = path.resolve(__dirname, './index.html');

    app.get('/', (req, res) => {
        res.sendFile(index);
    });
};