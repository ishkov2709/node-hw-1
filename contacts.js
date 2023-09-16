const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const data = await listContacts();
  const currentContact = data.find(({ id }) => id === contactId);
  return currentContact ?? null;
};

const removeContact = async (contactId) => {
  const data = await listContacts();
  const currentIndex = data.findIndex(({ id }) => id === contactId);
  if (currentIndex === -1) return null;

  const removedContact = data.splice(currentIndex, 1);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return removedContact;
};

const addContact = async (name = null, email = null, phone) => {
  if (!phone) return null;
  const data = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  data.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
