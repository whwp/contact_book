import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function EditContact() {
  const [contactNewData, SetContactNewData] = useState();
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const { state } = useLocation();

  async function updateContact(contact) {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact),
    };

    try {
      //console.log(contact);
      const response = await fetch(
        process.env.REACT_APP_API_SERVER_URL,
        requestOptions
      );
      console.log(response.status);
      const res = await response.json();
      if (response.ok) {
        window.alert("Updated the contact successfully!");
      } else if (response.status === 400) {
        window.alert(res.detail);
      } else {
        window.alert(response.status);
      }
      console.log(res);
    } catch (error) {
      console.log(error);
      window.alert(error);
    }
  }

  useEffect(() => {
    //console.log(contactNewData);
    //console.log(isFirstLoading);
    if (isFirstLoading) {
      setIsFirstLoading(false);
    } else {
      updateContact(contactNewData);
    }
  }, [contactNewData]);

  async function handleEditContact(event) {
    event.preventDefault();
    const contactId = state.contact_id;
    const firstName = event.target.elements.firstName.value;
    const lastName = event.target.elements.lastName.value;
    const email = event.target.elements.email.value;
    SetContactNewData({
      contact_id: contactId,
      first_name: firstName,
      last_name: lastName,
      email: email,
    });
  }

  function handleKeyDown(e) {
    if (e.key === " ") {
      e.preventDefault();
    }
  }

  function handleChange(e) {
    if (e.currentTarget.value.includes(" ")) {
      e.currentTarget.value = e.currentTarget.value.replace(/\s/g, "");
    }
  }
  return (
    <div>
      <br />
      <h3 className="text-center">Edit the Contact</h3>
      <br />
      <form onSubmit={handleEditContact}>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            className="form-control"
            defaultValue={state.first_name}
            aria-label="FirstName"
            aria-describedby="basic-addon1"
            onKeyDown={handleKeyDown}
            onChange={handleChange}
          />
          <br />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            className="form-control"
            defaultValue={state.last_name}
            aria-label="LastName"
            aria-describedby="basic-addon1"
            onKeyDown={handleKeyDown}
            onChange={handleChange}
          />
          <br />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            name="email"
            type="email"
            className="form-control"
            defaultValue={state.email}
            aria-label="Email"
            aria-describedby="basic-addon1"
            onKeyDown={handleKeyDown}
            onChange={handleChange}
          />
          <br />
        </div>
        <div>* Space is not allowed in input.</div>
        <br />
        <div className="row">
          <div className="col">
            <button className="btn btn-primary" type="submit">
              Update
            </button>
          </div>
          <div className="col text-end">
            <a className="btn btn-primary " href="/" role="button">
              Back to Home
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}
export default EditContact;
