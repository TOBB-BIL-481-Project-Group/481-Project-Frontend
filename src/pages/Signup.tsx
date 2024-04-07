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
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  // Function to handle form submission
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Collect form data
    if(name === '' || email === '' || password === '' || confirmPassword === ''){
      alert("Please fill all the blanks!");
      return;
    }
    if(password !== confirmPassword){
      alert("Passwords do not match!");
      return;
    }
    try {
      // Call signup function passing userData
       await apisignup(name,email,password,"/signup");
       navigate(PATHS.start)// Log successful response
    } catch (error) {
      // Log any errors
      navigate(PATHS.error);
    }
  };

  return (
    <div className="home" style={{
      backgroundColor: "#3d424d",
      fontFamily: "Arial",
      display: "flex",
      textAlign: "center",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      flexDirection: "column"
    }}>
      <div className="welcome-header" style={{
        textAlign: "center",
        marginBottom: "30px",
        fontSize: "24px",
        color: "white",
      }}>
        <h1>Welcome to the Test-Generator Site</h1>
      </div>
      <form onSubmit={handleSubmit} method='post' className="form-container">
        <label htmlFor="name" className="form-label">Name:</label><br />
        <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} className="custom-input" /><br /><br />
        
        <label htmlFor="email" className="form-label">Email:</label><br />
        <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="custom-input"/><br /><br />
        
        <label htmlFor="password" className="form-label">Password:</label><br />
        <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="custom-input" /><br /><br />
        
        <label htmlFor="password" className="form-label">Confirm Password:</label><br />
        <input type="password" id="password" name="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="custom-input" /><br /><br />
        <br />
        <button className="signup-button">Sign Up</button>
    </form>
    </div>
  );
};

export default Signup;
