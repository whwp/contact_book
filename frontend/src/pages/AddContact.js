import { useState, useEffect, useRef } from "react";

function AddContact(props) {
  const [contact, setContact] = useState();
  //const isFirstLoading = useRef(true);
  const [isFirstLoading, SetIsFirstLoading] = useState(true);

  async function addContactToList(contact) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact),
    };

    try {
      console.log(contact);
      const response = await fetch(
        process.env.REACT_APP_API_SERVER_URL,
        requestOptions
      );
      console.log("Response status: " + response.status);
      const res = await response.json();
      if (response.ok) {
        window.alert("Added a contact successfully!");
        document.getElementById("Form").reset();
      } else if (
        response.status === 400 &&
        res.detail === "Email already registered"
      ) {
        window.alert(res.detail);
      } else {
        window.alert(response.status);
      }
      console.log(res);
    } catch (error) {
      window.alert(error);
      console.log(error);
    }
  }

  useEffect(() => {
    console.log(isFirstLoading);
    console.log(contact);
    //console.log(contact);
    if (isFirstLoading) {
      SetIsFirstLoading(false);
    } else {
      addContactToList(contact);
    }
  }, [contact]);

  async function handleOnSubmit(event) {
    event.preventDefault();
    const firstName = event.target.elements.firstName.value;
    const lastName = event.target.elements.lastName.value;
    const email = event.target.elements.email.value;
    setContact({ first_name: firstName, last_name: lastName, email: email });
  }

  function handleOnReset() {
    document.getElementById("Form").reset();
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
      <h3 className="text-center">Add A New Contact</h3>
      <br />
      <form id="Form" onSubmit={handleOnSubmit} onReset={handleOnReset}>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            className="form-control"
            aria-label="FirstName"
            aria-describedby="basic-addon1"
            required
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
            aria-label="LastName"
            aria-describedby="basic-addon1"
            required
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
            aria-label="Email"
            aria-describedby="basic-addon1"
            required
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
              Add
            </button>
            &nbsp;&nbsp;
            <button className="btn btn-warning" type="reset">
              Reset
            </button>
          </div>
          <div className="col text-end">
            <a className="btn btn-primary" href="/" role="button">
              Back to Home
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}
export default AddContact;
