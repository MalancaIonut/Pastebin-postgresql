const pool = require("./db_connection");

const getPaste = (request, response) => {
    pool.query('SELECT title FROM pastes ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    })
}

const createPaste = (request, response) => {
    const {title, content} = request.body;
    
    pool.query('INSERT INTO pastes (title, content) VALUES ($1, $2)', [title, content], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(201).send(`User added with ID : ${result.insertId}`);
    })
}

const deletePaste = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('DELETE FROM pastes WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).send(`User deleted with ID : ${id}`);
    })
}

module.exports = {
    getPaste,
    createPaste,
    deletePaste,
};