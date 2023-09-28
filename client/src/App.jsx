import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import "./App.css";

const App = () => {
  const [userData, setData] = useState({
    name: "",
    email: "",
    age: "",
    location: "",
  });
  const [userId, setUserId] = useState("");

  const [error, setError] = useState({
    nameError: "",
    emailError: "",
    ageError: "",
    locationError: "",
  });

  const { name, email, age, location } = userData;
  const { nameError, emailError, ageError, locationError } = error;

  const inputChange = (e) => {
    const changedData = { ...userData, [e.target.name]: e.target.value };
    setData(changedData);
  };

  const inputBlur = (e) => {
    if (e.target.value === "") {
      const changedData = {
        ...error,
        [e.target.name + "Error"]: `*Please Enter your ${e.target.name}`,
      };
      setError(changedData);
    } else {
      if (e.target.name === "age") {
        if (e.target.value < 18 || e.target.value > 45) {
          setError({
            ...error,
            [e.target.name + "Error"]: "*Age must be between 18 and 45 years",
          });
        } else {
          setError({ ...error, [e.target.name + "Error"]: "" });
        }
      } else {
        setError({ ...error, [e.target.name + "Error"]: "" });
      }
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const { name, email, age, location } = userData;
    if (
      name === "" ||
      age === "" ||
      age < 18 ||
      age > 45 ||
      email === "" ||
      !email.includes("@gmail.com") ||
      location === ""
    ) {
      alert("Please Enter Valid Credentials !!!");
    } else {
      const url = "https://profile-0ceq.onrender.com/user/register";

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      };

      const fetchData = await fetch(url, options);

      if (fetchData.ok) {
        const responseData = await fetchData.json();
        setUserId(responseData.userId);
        setData({
          name: "",
          email: "",
          age: "",
          location: "",
        });
      } else {
        const responseData = await fetchData.json();
        alert(responseData.error);
        setData({
          name: "",
          email: "",
          age: "",
          location: "",
        });
      }
    }
  };

  const registeredContainer = () => {
    return (
      <div className="success-container">
        <button
          type="button"
          onClick={() => setUserId("")}
          className="close-button"
        >
          <AiOutlineClose fontSize={20} />
        </button>
        <img
          src="https://res.cloudinary.com/dcnpafcrg/image/upload/v1695805962/checked_uaabhl.png"
          className="success-image"
          alt="success"
        />
        <h1 className="success-title">Successfully registered</h1>
        <p style={{ letterSpacing: "0.08px" }}>Your UserID:</p>
        <p className="userid">{userId}</p>
      </div>
    );
  };

  return (
    <div className="main-container">
      {userId ? (
        registeredContainer()
      ) : (
        <form className="profile-container" onSubmit={submitForm}>
          <CgProfile color="white" fontSize={60} />
          <h1 className="title">
            Create <span style={{ color: "crimson" }}> Profile</span>
          </h1>

          <div className="input-container">
            <label htmlFor="text" className="label">
              Username
            </label>
            <input
              name="name"
              onChange={inputChange}
              value={name}
              id="text"
              placeholder="Enter your name"
              type="text"
              className="input"
              onBlur={inputBlur}
            />
            {nameError && <p className="error">{nameError}</p>}
          </div>

          <div className="input-container">
            <label htmlFor="email" className="label">
              Email
            </label>
            <input
              name="email"
              onChange={inputChange}
              value={email}
              id="email"
              placeholder="Enter your email"
              type="email"
              className="input"
              onBlur={inputBlur}
            />
            {emailError && <p className="error">{emailError}</p>}
          </div>

          <div className="input-container">
            <label htmlFor="age" className="label">
              Age
            </label>
            <input
              name="age"
              onChange={inputChange}
              value={age}
              id="age"
              placeholder="Enter your age"
              type="text"
              className="input"
              onBlur={inputBlur}
            />
            {ageError && <p className="error">{ageError}</p>}
          </div>

          <div className="input-container">
            <label htmlFor="place" className="label">
              Location
            </label>
            <input
              name="location"
              onChange={inputChange}
              value={location}
              id="place"
              placeholder="Choose your location"
              type=""
              className="input"
              onBlur={inputBlur}
            />
            {locationError && <p className="error">{locationError}</p>}
          </div>

          <button type="submit" className="submit">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default App;
