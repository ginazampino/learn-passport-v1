const express = require('express');
const app = express();

require('./middleware')(app);
require('./passport')(app);

app.listen(process.env.PORT, () => {
    console.log('Now listening on port ' + process.env.PORT + '.');
});