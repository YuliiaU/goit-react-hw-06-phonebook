import { useState, useEffect } from 'react';

import Container from './components/Container';
import Form from './components/Form';
import Contacts from './components/Contacts';
import Filter from './components/Filter';

export default function App() {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (localStorage.getItem('contacts')) {
      setContacts(JSON.parse(localStorage.getItem('contacts')));
    }
  }, []);

  useEffect(
    prevState => {
      if (contacts !== prevState) {
        localStorage.setItem('contacts', JSON.stringify(contacts));
      }
    },
    [contacts],
  );

  const formSubmitHandler = data => {
    if (contacts.find(contact => contact.name === data.name)) {
      alert(`${data.name} is already in contacts`);
      return;
    }
    setContacts(prevState => [data, ...prevState]);
  };

  const deleteContact = deletedContactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== deletedContactId),
    );
  };

  const changeFilter = evt => {
    setFilter(evt.target.value);
  };

  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <Container>
      <h1>Phonebook</h1>
      <Form onSubmit={formSubmitHandler} />

      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />

      <Contacts contacts={visibleContacts} onDeleteContacts={deleteContact} />
    </Container>
  );
}
