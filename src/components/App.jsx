import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import Contactlist from './ContactList/Contactlist';
import { Filter } from './Filter/Filter';
import { Layout } from './Layout';

const { Component } = require('react');

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
    name: '',
    number: '',
  };

  changeFilter = newFilter => {
    this.setState({
      filter: newFilter,
    });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(item =>
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(card => card.id !== contactId),
    }));
  };

  addContact = newContact => {
    const hasContact = this.state.contacts.some(
      ({ name }) => name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (hasContact) {
      alert(`${newContact.name} is already in contacts`);
      return;
    }

    this.setState(prevState => ({
      contacts: [...prevState.contacts, { ...newContact, id: nanoid() }],
    }));
  };

  render() {
    const { filter } = this.state;

    const visibleContacts = this.getVisibleContacts();
    return (
      <Layout>
        <h1>Phonebook</h1>
        <ContactForm onAdd={this.addContact} />
        <h2>Contacts</h2>
        <Filter filter={filter} onChangeFilter={this.changeFilter} />
        <Contactlist items={visibleContacts} onDelete={this.deleteContact} />
      </Layout>
    );
  }
}
