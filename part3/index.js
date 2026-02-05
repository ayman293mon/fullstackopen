const express = require('express');
const morgan = require('morgan');
require('dotenv').config()
const persons = require('./models/phonebook')
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.json());
morgan.token('info', (req, res) => {
    return req.method === 'POST' ? JSON.stringify(req.body) : '';
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :info'));
const PORT = process.env.PORT || 3001;  
app.get('/api/persons', (req, res) => {
    persons.find({}).then(result => {
        res.json(result)
    })
});
app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.countDocuments({})} people</p><p>${new Date()}</p>`);
});
app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    persons.finById(id).then(person => {
        if (person) {
            res.json(person)
        } else {
            res.status(404).end();
        }
    })
});
app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    persons.finById(id).then (person => {
        if (!person) {
            return res.status(404).end();
        }
        // persons = persons.filter(p => p.id !== id);
        console.log("No thing happend")
    })

});
app.post('/api/persons', (req, res) => {
    const newPerson = new persons({
        ...req.body
    })
    // newPerson.id = generateID();
    // if (!newPerson.name || !newPerson.number) {
        // return res.status(400).json({ error: 'name or number is missing' });
    // }
    // if (persons.find(p => p.name === newPerson.name)) {
        // return res.status(400).json({ error: 'name must be unique' });
    // }
    newPerson.save().then(result =>{
        console.log(`${result} saved success`);
    })
    res.json(newPerson);
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});