import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const AddContact = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (id) {
      const contact = store.contacts.find((c) => c.id === parseInt(id));
      if (contact) {
        setFormData({
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
          address: contact.address,
        });
      }
    }
  }, [id, store.contacts]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (id) {
        console.log("✏️ Updating contact:", formData.name);
        const response = await fetch(
          `https://playground.4geeks.com/contact/agendas/${store.agendaSlug}/contacts/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        if (response.ok) {
          const updatedContact = await response.json();
          console.log("📝 Context Action: Updating contact in store. ID:", id);
          dispatch({
            type: "update_contact",
            payload: updatedContact,
          });
          navigate("/");
        }
      } else {
        console.log("➕ Creating new contact:", formData.name);
        const response = await fetch(
          `https://playground.4geeks.com/contact/agendas/${store.agendaSlug}/contacts`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        if (response.ok) {
          const newContact = await response.json();
          console.log("📝 Context Action: Adding new contact to store. ID:", newContact.id);
          dispatch({
            type: "add_contact",
            payload: newContact,
          });
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Error saving contact:", error);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1 className="text-center">{id ? "Edit Contact" : "Add New Contact"}</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              className="form-control"
              id="phone"
              name="phone"
              placeholder="Enter phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              placeholder="Enter address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            {id ? "Update Contact" : "Save Contact"}
          </button>
        </form>

        <button className="btn btn-link" onClick={() => navigate("/")}>
          or get back to contacts
        </button>
      </div>
    </div>
  );
};
