import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const ContactCard = ({ contact }) => {
  const { dispatch, store } = useGlobalReducer();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    try {
      console.log("🗑️ Deleting contact:", contact.name);
      const response = await fetch(
        `https://playground.4geeks.com/contact/agendas/${store.agendaSlug}/contacts/${contact.id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        console.log("📝 Context Action: Deleting contact from store. ID:", contact.id);
        dispatch({
          type: "delete_contact",
          payload: contact.id,
        });
        setShowModal(false);
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  return (
    <>
      <div className="contact-card">
        <div className="contact-card-image">
          <img
            src={`https://ui-avatars.com/api/?name=${contact.name}&size=150&background=random`}
            alt={contact.name}
          />
        </div>
        <div className="contact-card-info">
          <h3>{contact.name}</h3>
          <p>
            <i className="fas fa-map-marker-alt"></i> {contact.address}
          </p>
          <p>
            <i className="fas fa-phone"></i> {contact.phone}
          </p>
          <p>
            <i className="fas fa-envelope"></i> {contact.email}
          </p>
        </div>
        <div className="contact-card-actions">
          <button
            className="btn-edit"
            onClick={() => navigate(`/edit/${contact.id}`)}
          >
            <i className="fas fa-pencil-alt"></i>
          </button>
          <button className="btn-delete" onClick={() => setShowModal(true)}>
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Are you sure?</h3>
            <p>
              Do you want to delete the contact <strong>{contact.name}</strong>?
            </p>
            <div className="modal-actions">
              <button className="btn-confirm" onClick={handleDelete}>
                Yes, delete
              </button>
              <button className="btn-cancel" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
