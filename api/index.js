const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const db = require("./querys");

app.use(bodyParser.json());
app.use (
    bodyParser.urlencoded({
        extended : true,
    })
)

app.get('/', (request, response) => {
    response.json({ info : 'Node, Express and Postgres Api' })
})

app.get('/pastes', db.getPaste);
app.post('/pastes', db.createPaste);
app.delete('/pastes/:id', db.deletePaste);

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})