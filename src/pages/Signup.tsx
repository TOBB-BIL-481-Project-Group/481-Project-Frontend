import React, { useState } from 'react'; // Import React and useState
import { PATHS } from "../consts/paths";
import { apisignup } from '../react-query/queries'; // Importing the apisignup function
import { FormEvent } from 'react'; // Import FormEvent type from react
import { useNavigate } from "react-router-dom";

const Signup = () => {
  // State variables to store form data
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  // Function to handle form submission
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Collect form data

    try {
      // Call signup function passing userData
       apisignup(name,email,password,"/signup");
       navigate(PATHS.start)// Log successful response
    } catch (error) {
      // Log any errors
    }
  };

  return (
    <div className="home" style={{
      backgroundColor: "#3d424d",
      color: "white",
      fontFamily: "Arial",
      display: "flex",
      textAlign: "center",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      flexDirection: "column"
    }}>
        <form onSubmit={handleSubmit} method='post'>
          {/* Use htmlFor instead of 'for' attribute */}
          <label htmlFor="name">Name:</label><br />
          {/* Add 'id' attribute to input fields and associate them with 'htmlFor' */}
          <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)}className="custom-input" /><br /><br />
          <label htmlFor="email">Email:</label><br />
          <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="custom-input"/><br /><br />
          <label htmlFor="password">Password:</label><br />
          <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}className="custom-input" /><br /><br />
          <input type="submit" value="Submit" />
          <br />
        </form>
    </div>
  );
};

export default Signup;
