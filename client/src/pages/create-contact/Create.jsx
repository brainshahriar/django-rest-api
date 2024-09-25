import React, { useState, useEffect } from "react";
import "./Create.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  createContact,
  getAllContact,
  CONTACT_ERROR_MESSAGE,
  selectContact,
  updateContact,
} from "../../redux/features/contacts/contactSlice";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { getContact } from "../../redux/features/contacts/contactSlice";
import toast, { Toaster } from "react-hot-toast";
import cData from "../../countryData";

const Create = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { errorMessages } = useSelector((state) => state.contact);

  const [isFavorite, setIsFavorite] = useState(false);
  const [countryCode, setCountryCode] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [photo, setPhoto] = useState(null);
  const [existingPhoto, setExistingPhoto] = useState(null);

  const handlePhotoChange = (e) => {
    const selectedPhoto = e.target.files[0];
    setPhoto(selectedPhoto);
    setExistingPhoto(URL.createObjectURL(selectedPhoto));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("country_code", countryCode);
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("phone_number", phoneNumber);
    if (photo) {
      formData.append("photo", photo)
    }
    formData.append("is_favorite", isFavorite);
    try {
      if(id) {
        await dispatch(updateContact({ id, formData })).unwrap();
        toast.success("Contact updated successfully");
        dispatch(CONTACT_ERROR_MESSAGE(""));
      } else {
        const response = await dispatch(createContact(formData)).unwrap();
        if (response.success === true) {
          dispatch(CONTACT_ERROR_MESSAGE(""));
          setCountryCode("");
          setFirstName("");
          setLastName("");
          setPhoneNumber("");
          setPhoto(null);
          setIsFavorite(false);
          dispatch(getAllContact());
          navigate("/");
        }
      }
    } catch (error) {
      dispatch(CONTACT_ERROR_MESSAGE(error))
    }
  };
  const contact = useSelector(selectContact);

  useEffect(() => {
    if (id) {
      dispatch(getContact(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (contact && contact.id === parseInt(id)) {
      setCountryCode(contact.country_code);
      setFirstName(contact.first_name);
      setLastName(contact.last_name);
      setPhoneNumber(contact.phone_number);
      setExistingPhoto(contact.photo);
      setIsFavorite(contact.is_favorite);
    }
  }, [contact, id]);

  return (
    <div className="create-contact-container">
      <Toaster />
      <form>
        <div className="form-group">
          <label>Country Code</label>
          <select
            className="form-control"
            id="exampleFormControlSelect1"
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
          >
            <option value="">Select Country Code</option>
            {cData && cData.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name} ({country.code})
              </option>
            ))}
          </select>
          {errorMessages && (
          <p className="error-message">{errorMessages.country_code}</p>
        )}
        </div>
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          {errorMessages && (
          <p className="error-message">{errorMessages.first_name}</p>
        )}
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          {errorMessages && (
          <p className="error-message">{errorMessages.last_name}</p>
        )}
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          {errorMessages && (
          <p className="error-message">{errorMessages.phone_number}</p>
        )}
        </div>
        <div className="form-group">
          <label>Photo</label>
          {existingPhoto && (
            <div>
              <img className="contact-photo"
                src={existingPhoto}
                alt="contact"
              />
            </div>
          )}
          <input
            type="file"
            className="form-control"
            onChange={handlePhotoChange}
          />
          {errorMessages && (
            <p className="error-message">{errorMessages.photo}</p>
          )}
        </div>
        <div className="form-group">
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexSwitchCheckDefault"
              checked={isFavorite}
              onChange={(e) => setIsFavorite(e.target.checked)}
            />
            <label className="form-check-label">Favorite</label>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          {id ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
};

export default Create;
