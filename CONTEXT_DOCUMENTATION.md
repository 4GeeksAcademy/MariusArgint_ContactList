# Context API Implementation - Contact List App

## How Context Works in This App

This Contact List application uses React's Context API for global state management. Here's how it all fits together:

### 1. Store Setup ([src/store.js](src/store.js))

The store defines our initial state and the reducer that handles state changes:

```javascript
export const initialStore = () => {
  return {
    contacts: [],      // Array of all contacts
    agendaSlug: null,  // The agenda identifier for API calls
  };
};
```

**Available Actions:**
- `set_contacts` - Sets the entire contacts array
- `set_agenda_slug` - Sets the agenda slug
- `add_contact` - Adds a new contact to the array
- `update_contact` - Updates an existing contact
- `delete_contact` - Removes a contact from the array

### 2. Context Provider ([src/hooks/useGlobalReducer.jsx](src/hooks/useGlobalReducer.jsx))

The `StoreProvider` wraps our entire app (in [src/main.jsx](src/main.jsx)) and broadcasts the state to all components:

```javascript
<StoreProvider>
  <RouterProvider router={router} />
</StoreProvider>
```

### 3. Using Context in Components

Any component can access the global state using our custom hook:

```javascript
import useGlobalReducer from "../hooks/useGlobalReducer";

const { store, dispatch } = useGlobalReducer();
```

## Context in Action - CRUD Operations

### **READ** - Fetching Contacts ([src/pages/Home.jsx](src/pages/Home.jsx))

When the Home component loads:
1. Fetches contacts from the 4Geeks API
2. Dispatches `set_contacts` action to populate the store
3. All components now have access to the contacts

**Console logs to look for:**
- `📝 Context Action: Setting agenda slug to: my-agenda`
- `🔄 Fetching contacts from API...`
- `📝 Context Action: Setting contacts. Count: X`
- `📦 Current Context State: { contacts: [...], agendaSlug: "my-agenda" }`

### **CREATE** - Adding New Contact ([src/pages/AddContact.jsx](src/pages/AddContact.jsx))

When you submit the form:
1. POSTs new contact to API
2. Dispatches `add_contact` with the new contact
3. Store automatically updates and triggers re-render
4. New contact appears in the list

**Console logs to look for:**
- `➕ Creating new contact: John Doe`
- `📝 Context Action: Adding new contact to store. ID: 123`

### **UPDATE** - Editing Contact ([src/pages/AddContact.jsx](src/pages/AddContact.jsx))

When you edit a contact:
1. Form loads existing data from store
2. PUTs updated data to API
3. Dispatches `update_contact` with updated contact
4. Store updates the specific contact in the array

**Console logs to look for:**
- `✏️ Updating contact: John Doe`
- `📝 Context Action: Updating contact in store. ID: 123`

### **DELETE** - Removing Contact ([src/components/ContactCard.jsx](src/components/ContactCard.jsx))

When you delete a contact:
1. Shows confirmation modal
2. DELETEs from API
3. Dispatches `delete_contact` with contact ID
4. Store filters out the deleted contact
5. UI updates instantly

**Console logs to look for:**
- `🗑️ Deleting contact: John Doe`
- `📝 Context Action: Deleting contact from store. ID: 123`

## Testing the Context

1. **Start the dev server:**
   ```bash
   npm run start
   ```

2. **Open the browser console** (F12) and navigate to http://localhost:3001

3. **Watch the console logs** as you:
   - Load the page (see initial fetch)
   - Add a new contact (see add action)
   - Edit a contact (see update action)
   - Delete a contact (see delete action)

4. **Observe the state** - Every action logs:
   - What operation is happening
   - When Context is being updated
   - The current state of the store

## Why Context API?

✅ **No prop drilling** - Any component can access contacts without passing props through multiple levels

✅ **Single source of truth** - All components see the same data

✅ **Predictable updates** - All state changes go through the reducer

✅ **Easy debugging** - Console logs show every action

✅ **4Geeks Academy standard** - Follows the course requirements exactly

## Key Files

- **[src/store.js](src/store.js)** - Reducer and initial state
- **[src/hooks/useGlobalReducer.jsx](src/hooks/useGlobalReducer.jsx)** - Context hook
- **[src/main.jsx](src/main.jsx)** - Provider wrapper
- **[src/pages/Home.jsx](src/pages/Home.jsx)** - Consumes context (READ)
- **[src/pages/AddContact.jsx](src/pages/AddContact.jsx)** - Consumes context (CREATE/UPDATE)
- **[src/components/ContactCard.jsx](src/components/ContactCard.jsx)** - Consumes context (DELETE)

---

**Happy coding! 🚀**
