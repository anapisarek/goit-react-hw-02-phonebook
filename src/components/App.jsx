import { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import css from './App.module.css';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  formSubmitHandler = contact => {
    this.setState(prev => {
      return {
        contacts: [...prev.contacts, contact],
      };
    });
  };

  deleteContact = idContact => {
    this.setState(prev => {
      return {
        contacts: prev.contacts.filter(contact => contact.id !== idContact),
      };
    });
  };

  filteredByName = () => {
    const filteredByName = this.state.contacts.filter(({ name }) =>
      name.toLowerCase().includes(this.state.filter)
    );

    return filteredByName ? filteredByName : this.state.contacts;
  };

  filterContacts = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  render() {
    return (
      <div className={css.container}>
        <h1>Phonebook</h1>
        <ContactForm
          submit={this.formSubmitHandler}
          contacts={this.state.contacts}
        />

        <h2>Contacts</h2>
        <Filter onChange={this.filterContacts} />

        <ContactList
          contacts={this.filteredByName()}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}