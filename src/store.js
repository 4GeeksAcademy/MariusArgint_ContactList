export const initialStore = () => {
  return {
    contacts: [],
    agendaSlug: null,
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'set_contacts':
      return {
        ...store,
        contacts: action.payload,
      };

    case 'set_agenda_slug':
      return {
        ...store,
        agendaSlug: action.payload,
      };

    case 'add_contact':
      return {
        ...store,
        contacts: [...store.contacts, action.payload],
      };

    case 'update_contact':
      return {
        ...store,
        contacts: store.contacts.map((contact) =>
          contact.id === action.payload.id ? action.payload : contact
        ),
      };

    case 'delete_contact':
      return {
        ...store,
        contacts: store.contacts.filter((contact) => contact.id !== action.payload),
      };

    default:
      throw Error('Unknown action: ' + action.type);
  }
}
