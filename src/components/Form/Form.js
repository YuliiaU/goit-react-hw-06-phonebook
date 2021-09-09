import { useState } from 'react';
import style from './Form.module.css';
import shortid from 'shortid';
import { connect } from 'react-redux';
import contactsAction from '../../redux/contacts-action';
import { useSelector, useDispatch } from 'react-redux';
import { getContacts } from '../../redux/contacts-selection';

function Form() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const handleChange = event => {
    const { name, value } = event.target;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (contacts.some(contact => contact.name === name)) {
      alert(`${name} is already in contacts`);
      return;
    }

    dispatch(contactsAction.addContact({ name, number }));
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  const nameInputId = shortid.generate();
  const numberInputId = shortid.generate();

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <label htmlFor={nameInputId}>
        <p>Name</p>
        <input
          value={name}
          onChange={handleChange}
          id={nameInputId}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
        />
      </label>

      <label htmlFor={numberInputId}>
        <p>Number</p>

        <input
          value={number}
          onChange={handleChange}
          id={numberInputId}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
          required
        />
      </label>

      <button type="submit" className={style.button}>
        Add contact
      </button>
    </form>
  );
}

const mapDispatchToProps = dispatch => ({
  onSubmit: (name, number) => dispatch(contactsAction.addContact(name, number)),
});

export default connect(null, mapDispatchToProps)(Form);
