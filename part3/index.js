const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

morgan.token('info', (req, res) => {
    return req.method === 'POST' ? JSON.stringify(req.body) : '';
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :info'));
const PORT = process.env.PORT || 3001;  
let persons =
    [
        {
            "id": "1",
            "name": "Arto Hellas",
            "number": "040-123456"
        },
        {
            "id": "2",
            "name": "Ada Lovelace",
            "number": "39-44-5323523"
        },
        {
            "id": "3",
            "name": "Dan Abramov",
            "number": "12-43-234345"
        },
        {
            "id": "4",
            "name": "Mary Poppendieck",
            "number": "39-23-6423122"
        }
    ];
app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>');
});
app.get('/api/persons', (req, res) => {
    res.json(persons);
});
app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`);
});
app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    const person = persons.find(p => p.id === id);
    if (!person) {
        return res.status(404).end();
    }
    res.json(person);
});
app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    const person = persons.find(p => p.id === id);
    if (!person) {
       return res.status(404).end();
    }
    persons = persons.filter(p => p.id !== id);
    res.json(person);
});
const generateID = () => {
    return (Math.round(Math.random() * 1000000000)).toString();
}
app.post('/api/persons', (req, res) => {
    const newPerson = { ...req.body };
    newPerson.id = generateID();
    if (!newPerson.name || !newPerson.number) {
        return res.status(400).json({ error: 'name or number is missing' });
    }
    if (persons.find(p => p.name === newPerson.name)) {
        return res.status(400).json({ error: 'name must be unique' });
    }
    persons = persons.concat(newPerson);
    res.json(newPerson);
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});