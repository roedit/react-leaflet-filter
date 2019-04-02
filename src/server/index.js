const express = require('express');
const os = require('os');
const fs = require('fs');
const path = require('path');
const boat_ramps = fs.readFileSync(path.join(__dirname, './boat_ramps.geojson'));

const app = express();

app.use(express.static('dist'));
app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));
app.get('/api/getData', (req, res) => res.send(boat_ramps));

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
