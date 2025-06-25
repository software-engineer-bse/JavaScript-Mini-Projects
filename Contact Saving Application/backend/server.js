const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/contactsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Mongoose Schema & Model
const contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String
});

const Contact = mongoose.model('Contact', contactSchema);


// CREATE
app.post('/api/create_contact', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).send(contact);
  } catch (err) {
    res.status(400).send({ error: 'Failed to create contact', details: err });
  }
});

// READ ALL
app.get('/api/get_contacts', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.send(contacts);
  } catch (err) {
    res.status(500).send({ error: 'Failed to fetch contacts' });
  }
});

// READ ONE
app.get('/api/get_contacts/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).send({ error: 'Contact not found' });
    res.send(contact);
  } catch (err) {
    res.status(500).send({ error: 'Failed to fetch contact' });
  }
});

// UPDATE
app.put('/api/update_contact/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(contact);
  } catch (err) {
    res.status(400).send({ error: 'Failed to update contact' });
  }
});

// DELETE
app.delete('/api/delete_contact/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).send({ error: 'Contact not found' });
    res.send({ message: 'Contact deleted successfully' });
  } catch (err) {
    res.status(500).send({ error: 'Failed to delete contact' });
  }
});













// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});