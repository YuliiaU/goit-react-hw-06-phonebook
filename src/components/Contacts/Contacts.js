import React from 'react';
import PropTypes from 'prop-types';
import style from './Contacts.module.css';
import { connect } from 'react-redux';
import contactsAction from '../../redux/contacts-action';

const Contacts = ({ contacts, onDeleteContacts }) => (
  <ul>
    {contacts.map(({ id, name, number }) => (
      <li key={id} className={style.item}>
        <p>{name}</p>
        <span>{number}</span>
        <button
          type="button"
          onClick={() => onDeleteContacts(id)}
          className={style.button}
        >
          Delete
        </button>
      </li>
    ))}
  </ul>
);

Contacts.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string.isRequired)),
  onDeleteContacts: PropTypes.func.isRequired,
};

const getVisibleContacts = (allContacts, filter) => {
  const normalizedFilter = filter.toLowerCase();

  return allContacts.filter(({ name }) =>
    name.toLowerCase().includes(normalizedFilter),
  );
};

const mapStateToProps = ({ contacts: { items, filter } }) => ({
  contacts: getVisibleContacts(items, filter),
});

const mapDispatchToProps = dispatch => ({
  onDeleteContacts: id => dispatch(contactsAction.deleteContact(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
