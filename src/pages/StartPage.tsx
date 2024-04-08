import { useState } from "react"; // Import React and useState
import { PATHS } from "../consts/paths";
import { Link } from "react-router-dom"; // Assuming you're using React Router
import { apisignup } from "../react-query/queries"; // Importing the apisignup function
import { FormEvent } from "react"; // Import FormEvent type from react
import { useNavigate } from "react-router-dom";

const StartPage = () => {
  // State variables to store form data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Collect form data
    if (email === "" || password === "") {
      alert("Please fill all the blanks!");
      return;
    }
    try {
      await apisignup("", email, password, "/");
      navigate(PATHS.loading); // Log successful response
    } catch (error) {
      if (error == "AxiosError: Request failed with status code 500")
        alert("email's account not found");
      else alert("your password is not correct");
    }
  };

  return (
    <div
      className="home"
      style={{
        backgroundColor: "#3d424d",
        fontFamily: "Arial",
        display: "flex",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <div
        className="welcome-header"
        style={{
          textAlign: "center",
          marginBottom: "30px",
          fontSize: "24px",
          color: "white",
        }}
      >
        <h1>Welcome to the Test-Generator Site</h1>
      </div>
      <form onSubmit={handleSubmit} method="post" className="form-container">
        <label htmlFor="email" className="form-label">
          Email:
        </label>
        <br />
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="custom-input"
        />
        <br />
        <br />

        <label htmlFor="password" className="form-label">
          Password:
        </label>
        <br />
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="custom-input"
        />
        <br />
        <br />

        <input type="submit" value="Log In" className="submit-button" />
        <br />
        <Link to={PATHS.signup} className="signup-link">
          <button className="signup-button">
            If you do not have an account, please sign up
          </button>
        </Link>
      </form>
    </div>
  );
};

export default StartPage;
