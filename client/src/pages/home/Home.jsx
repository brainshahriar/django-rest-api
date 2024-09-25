import React, { useState, useEffect } from "react";
import "./home.css";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";
import { getAllContact, deleteContact } from "../../redux/features/contacts/contactSlice";
import Loader from "../../components/loader/Loader";
import toast, { Toaster } from "react-hot-toast";
import InfiniteScroll from 'react-infinite-scroll-component';

export default function Home() {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const { message, isLoading, isError, contacts } = useSelector(
    (state) => state.contact
  );

  const [contactList, setContactList] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // For search input
  const [filteredContacts, setFilteredContacts] = useState([]);

  const ITEMS_PER_PAGE = 15;  // Number of contacts to load per scroll

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getAllContact());
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  useEffect(() => {
    if (contacts.length > 0) {
      const initialContacts = contacts.slice(0, ITEMS_PER_PAGE);
      setContactList(initialContacts);
      setHasMore(contacts.length > ITEMS_PER_PAGE);
    }
  }, [contacts]);

  useEffect(() => {
    // Filter contacts based on the search term
    const filtered = contacts.filter(
      (contact) =>
        contact.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.phone_number.includes(searchTerm)
    );
    setFilteredContacts(filtered.slice(0, page * ITEMS_PER_PAGE));
  }, [searchTerm, contacts, page]);

  const loadMoreContacts = () => {
    const start = page * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const moreContacts = contacts.slice(start, end);

    // If no more contacts to load, set hasMore to false
    if (moreContacts.length === 0) {
      setHasMore(false);
    } else {
      setContactList((prevContacts) => [...prevContacts, ...moreContacts]);
      setPage(page + 1);
    }
  };

  const handleDelete = async (id) => {
    await dispatch(deleteContact(id));
    toast.success("Contact deleted successfully");
    dispatch(getAllContact());
    setPage(1);
    setContactList([]);
    setHasMore(true);
  };

  return (
    <div className="container">
      <Toaster />
      {isLoading && <Loader />}
      <div className="add-btn-container">
        <div>
          <h3>Total Contacts: {contacts.length}</h3>
        </div>
        <Link to="/create-contact" className="btn btn-primary">
          Add Contact
        </Link>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search contacts...."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm
          className="search-input"
        />
      </div>

      <InfiniteScroll
        dataLength={filteredContacts.length}  // Current number of filtered contacts loaded
        next={loadMoreContacts}  // Function to load more contacts
        hasMore={hasMore}  // Whether more contacts are available to load
        loader={<h4>Loading...</h4>}  // Loader shown during data loading
        endMessage={<p style={{ textAlign: 'center' }}>No more contacts to show</p>}  // Message when all contacts are loaded
      >
        <table className="table table-striped table-success">
          <thead>
            <tr>
              <th scope="col">Owner</th>
              <th scope="col">Country Code</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Photo</th>
              <th scope="col">Is Favorite</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts.length > 0 ? (
              filteredContacts.map((contact) => (
                <tr key={contact.id}>
                  <td>{contact.owner_name}</td>
                  <td>{contact.country_code}</td>
                  <td>{contact.first_name}</td>
                  <td>{contact.last_name}</td>
                  <td>{contact.phone_number}</td>
                  <td>
                    <img
                      src={contact.photo}
                      alt="contact"
                      style={{ width: "50px", height: "30px", objectFit: "cover" }}
                    />
                  </td>
                  <td>{contact.is_favorite ? "Yes" : "No"}</td>
                  <td className="btn-container">
                    <Link to={`/create-contact/${contact.id}`} className="btn btn-success btn-sm">Edit</Link>
                    <button onClick={() => handleDelete(contact.id)} className="btn btn-danger btn-sm">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  No contacts found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </InfiniteScroll>
    </div>
  );
}