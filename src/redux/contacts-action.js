import shortid from 'shortid';
import { createAction } from '@reduxjs/toolkit';

const addContact = createAction('contacts/add', ({ name, number }) => ({
  payload: {
    id: shortid.generate(),
    name,
    number,
  },
}));
const deleteContact = createAction('contacts/delete');
const ChangeFilter = createAction('contacts/changeFilter');

const exportedObject = {
  addContact,
  deleteContact,
  ChangeFilter,
};

export default exportedObject;
