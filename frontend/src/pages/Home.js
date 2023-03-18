import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import TableContainer from "./TableContainer";

function Home() {
  const COLUMNS = [
    {
      Header: "ID",
      accessor: "contact_id",
      disableFilters: true,
    },
    {
      Header: "First Name",
      accessor: "first_name",
      filter: "fuzzyText",
    },
    {
      Header: "Last Name",
      accessor: "last_name",
      filter: "fuzzyText",
    },
    {
      Header: "Email",
      accessor: "email",
      filter: "fuzzyText",
    },
    {
      Header: "Action",
      accessor: "action",
      disableFilters: true,
      disableSortBy: true,
      Cell: ({ row }) => (
        <div>
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={() => handleEdit(row)}
          >
            Edit
          </button>
          &nbsp;&nbsp;
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => handleDelete(row)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];
  const [contactList, setContactList] = useState([]);
  const [isTableLoading, setIsTableLoading] = useState(false);
  const columns = useMemo(() => COLUMNS, []);
  let navigate = useNavigate();

  async function handleDelete(contact) {
    const confirmResponse = window.confirm(
      "Are you sure you want to delete the contact?"
    );
    if (!confirmResponse) return;

    console.log("Delete the contact");
    //console.log(contact.values.contact_id);
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      //body: JSON.stringify({ contact_id: contact.values.contact_id.toString() }),
    };
    try {
      console.log(contact);
      const contact_id = contact.values.contact_id;
      setIsTableLoading(true);
      const response = await fetch(
        //process.env.REACT_APP_API_SERVER_URL,
        `${process.env.REACT_APP_API_SERVER_URL}/${contact_id}`,
        requestOptions
      );
      console.log("response status: " + response.status);
      const data = await response.json();
      console.log(data);
      setIsTableLoading(false);
      if (response.ok) {
        setContactList(() => {
          const newData = data.map((item) => ({ ...item, action: item }));
          //console.log("Get the contact list");
          //console.log(newData);
          return newData;
        });
      } else {
        window.alert(response.status);
      }
    } catch (error) {
      console.log(error);
      window.alert(error);
    }
  }

  function handleEdit(row) {
    const path = `editcontact`;
    const rowData = row.values;
    delete rowData["action"];
    //console.log(rowData);
    navigate(path, { state: rowData });
  }

  async function getContactList() {
    try {
      setIsTableLoading(true);
      console.log("debug point");
      console.log(process.env.REACT_APP_API_SERVER_URL);
      const response = await fetch(process.env.REACT_APP_API_SERVER_URL);
      const data = await response.json();
      console.log(data);
      setIsTableLoading(false);
      if (response.ok) {
        setContactList(() => {
          const newData = data.map((item) => ({ ...item, action: item }));
          //console.log("Get the contact list");
          //console.log(newData);
          return newData;
        });
      } else {
        window.alert(response.status);
      }
    } catch (error) {
      console.log(error);
      window.alert(error);
    }
  }

  useEffect(() => {
    getContactList();
    console.log("getContactList");
  }, []);

  return (
    <div>
      <br />
      <div className="text-end">
        <a className="btn btn-primary" href="/addcontact" role="button">
          Add a new contact
        </a>
      </div>
      <br />
      <TableContainer
        columns={columns}
        data={contactList}
        isTableLoading={isTableLoading}
      />
    </div>
  );
}
export default Home;
