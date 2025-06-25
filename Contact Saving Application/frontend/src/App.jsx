import React, { useEffect, useState } from 'react';

function App() {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [editingId, setEditingId] = useState(null);

  // Fetch all contacts
  const fetchContacts = async () => {
    const res = await fetch('http://localhost:5000/api/get_contacts');
    const data = await res.json();
    setContacts(data);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Create or Update Contact
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      // UPDATE
      await fetch(`http://localhost:5000/api/update_contact/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setEditingId(null);
    } else {
      // CREATE
      await fetch('http://localhost:5000/api/create_contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    }

    setForm({ name: '', email: '', phone: '' });
    fetchContacts();
  };

  // Delete Contact
  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/delete_contact/${id}`, { method: 'DELETE' });
    fetchContacts();
  };

  // Edit Contact
  const handleEdit = (contact) => {
    setForm({ name: contact.name, email: contact.email, phone: contact.phone });
    setEditingId(contact._id);
  };

  return (
    <div>
      <h1>Contact Manager</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          required
        />
        <button type="submit">{editingId ? 'Update' : 'Create'}</button>
      </form>

      <ul>
        {contacts.map((c) => (
          <li key={c._id}>
            <strong>{c.name}</strong> - {c.email} - {c.phone}
            <button onClick={() => handleEdit(c)}>Edit</button>
            <button onClick={() => handleDelete(c._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
