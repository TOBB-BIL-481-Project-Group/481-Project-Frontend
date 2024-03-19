import { Link } from "react-router-dom";
import { PATHS } from "../consts/paths";
const StartPage = () =>{
  
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
    flexDirection:"column"
      }}>
      <h1 style={{fontSize: '50px'}}>Welcome To Test-Generator Site</h1>
      <h2 style={{fontSize: '30px'}}>Let's set up necessary constraints step by step</h2>
        <Link to={PATHS.home}>
        <button className="start-button">Let's Start</button>
        </Link>   
  </div>);
};
export default StartPage;