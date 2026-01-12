import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { ContactCard } from "../components/ContactCard";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        let agendaSlug = store.agendaSlug;

        if (!agendaSlug) {
          agendaSlug = "my-agenda";
          console.log("📝 Context Action: Setting agenda slug to:", agendaSlug);
          dispatch({
            type: "set_agenda_slug",
            payload: agendaSlug,
          });

          const createResponse = await fetch(
            `https://playground.4geeks.com/contact/agendas/${agendaSlug}`,
            {
              method: "POST",
            }
          );

          if (!createResponse.ok && createResponse.status !== 400) {
            throw new Error("Failed to create agenda");
          }
        }

        console.log("🔄 Fetching contacts from API...");
        const response = await fetch(
          `https://playground.4geeks.com/contact/agendas/${agendaSlug}/contacts`
        );

        if (response.ok) {
          const data = await response.json();
          console.log("📝 Context Action: Setting contacts. Count:", data.contacts?.length || 0);
          dispatch({
            type: "set_contacts",
            payload: data.contacts || [],
          });
        }
      } catch (error) {
        console.error("Error fetching contacts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <div className="text-center mt-5">
          <h2>Loading contacts...</h2>
        </div>
      </div>
    );
  }

  console.log("📦 Current Context State:", store);

  return (
    <div className="container">
      <div className="d-flex justify-content-end mt-3 mb-3">
        <button className="btn btn-success" onClick={() => navigate("/add")}>
          Add new contact
        </button>
      </div>

      <div className="contacts-container">
        {store.contacts.length === 0 ? (
          <div className="text-center mt-5">
            <h3>No contacts yet!</h3>
            <p>Click the button above to add your first contact.</p>
          </div>
        ) : (
          store.contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))
        )}
      </div>
    </div>
  );
}; 