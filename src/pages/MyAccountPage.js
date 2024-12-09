import React, { useState, useEffect } from "react";
import axios from "axios";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { countries } from "countries-list"; // Correct import

const MyAccountPage = () => {
  const [userDetails, setUserDetails] = useState({
    full_name: "",
    preferred_name: "",
    phone: "",
    dob: "",
    nationality: "",
    gender: "",
    country: "", // Default empty value
    address: "",
    town_city: "",
    postcode: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [genders] = useState([
    "Male",
    "Female",
    "Other",
    "Prefer not to disclose",
  ]);
  const [countryList, setCountryList] = useState([]);

  useEffect(() => {
    // Fetch user details from the backend
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/api/auth/myaccount",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUserDetails(response.data);
      } catch (error) {
        setErrorMessage("Failed to fetch user details");
      }
    };

    fetchUserDetails();

    // Get the list of countries and set the state
    const countriesArray = Object.entries(countries).map(([code, country]) => ({
      code,
      name: country.name, // Extracting the country name
    }));
    setCountryList(countriesArray);
    console.log(countriesArray); // Check in the console if country list is populated
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePhoneChange = (value) => {
    setUserDetails((prevState) => ({
      ...prevState,
      phone: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userDetails);
    try {
      await axios.put("http://localhost:5001/api/user/myaccount", userDetails, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("User details updated successfully");
    } catch (error) {
      setErrorMessage("Failed to update user details");
    }
  };

  return (
    <div className="my-account-container">
      <h2>My Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name</label>
          <input
            type="text"
            name="full_name"
            value={userDetails.full_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Preferred Name</label>
          <input
            type="text"
            name="preferred_name"
            value={userDetails.preferred_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Phone</label>
          <PhoneInput
            international
            defaultCountry="US" // You can set the default country as needed
            value={userDetails.phone}
            onChange={handlePhoneChange}
            required
          />
        </div>
        <div>
          <label>Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={userDetails.dob}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Nationality</label>
          <select
            name="nationality"
            value={userDetails.nationality}
            onChange={handleChange}
            required
          >
            <option value="">Select Nationality</option>
            {countryList.map((country) => (
              <option key={country.code} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Gender</label>
          <select
            name="gender"
            value={userDetails.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            {genders.map((gender) => (
              <option key={gender} value={gender}>
                {gender}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Country</label>
          <select
            name="country"
            value={userDetails.country}
            onChange={handleChange}
            required
          >
            <option value="">Select Country</option>
            {countryList.map((country) => (
              <option key={country.code} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={userDetails.address}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Town/City</label>
          <input
            type="text"
            name="town_city"
            value={userDetails.town_city}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Postcode</label>
          <input
            type="text"
            name="postcode"
            value={userDetails.postcode}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default MyAccountPage;
