const fs = require("fs/promises");
// const fs = require("node:fs/promises");

const path = require("node:path");
const crypto = require("node:crypto");

const contactsPath = path.join(__dirname, "/contacts.json");

// Повертає масив контактів.
async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(data);
  return contacts;
}

// Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
async function getContactById(contactId) {
  const contacts = await listContacts();
  const cont = contacts.find((item) => item.id === contactId);
  return cont || null;
}

// Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
async function removeContact(contactId) {
 
    const contacts = await listContacts();
    const index = contacts.findIndex((cont) => cont.id === contactId);
    if (index === -1) {
      return null;
    }
    const deletedContact = contacts.splice(index, 1)[0];
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return deletedContact;
  
}

// Повертає об'єкт доданого контакту.
async function addContact(data) {
  
    const contacts = await listContacts();
    const newContact = { id: crypto.randomUUID(), ...data };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  
}

const updateContact = async (contactId, data) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  contacts[index] = { contactId, ...data };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
