const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const persons = require("./models/phonebook");
const path = require("path");
const app = express();
app.use(express.static(path.join(__dirname, "dist")));
app.use(express.json());
morgan.token("info", (req, res) => {
  return req.method === "POST" ? JSON.stringify(req.body) : "";
});
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :info"),
);
const PORT = process.env.PORT || 3001;
app.get("/api/persons", (req, res) => {
  persons.find({}).then((persons) => {
    res.json(persons);
  });
});
app.get("/info", (req, res) => {
  persons.countDocuments({}).then((count) => {
    res.send(
      `<p>Phonebook has info for ${count} people</p><p>${new Date()}</p>`,
    );
  });
});
app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  persons.findById(id).then((person) => {
    if (person) {
      res.json(person);
    } else {
      res.status(404).end();
    }
  });
});
app.delete("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  persons
    .findByIdAndDelete(id)
    .then(() => {
      return res.status(204).end();
    })
    .catch((error) => {
      next(error);
    });
});
app.put("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  const { name, number } = req.body;
  persons.findById(id).then((person) => {
    if (!person) {
      return res.status(404).json({ error: "Person not found" });
    }
    person.name = name;
    person.number = number;
    person
      .save()
      .then((updatedPerson) => {
        res.json(updatedPerson);
      })
      .catch((error) => {
        next(error);
      });
  });
});
app.post("/api/persons", (req, res, next) => {
  const newPerson = new persons({
    ...req.body,
  });
  newPerson
    .save()
    .then((savedPerson) => {
      res.json(savedPerson);
    })
    .catch((error) => {
      next(error);
    });
});
const errorHandler = (err, req, res, next) => {
  console.error(err.message);
  if (err.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  }
  return res.status(500).json({ error: "Internal Server Error" });
};
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
