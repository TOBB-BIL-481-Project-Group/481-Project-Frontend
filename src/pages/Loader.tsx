import ReactLoading from 'react-loading';
import { useNavigate } from "react-router-dom";
import { PATHS } from "../consts/paths";
import { useState } from "react";
const Loader = () =>{
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
      navigate(PATHS.home)
  }, 2000);
  

    return(
      <div style={{
        backgroundColor: "#3d424d",
        fontFamily: "Arial",
        display: "flex",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}>
        <h1 style={{
          textAlign: "center",
          marginBottom: "20px",
          fontSize: "24px",
          color: "white",
        }}>Loading...</h1>
        <ReactLoading type="bars" color="#00FFFF"
                  height={500} width={300} />
      </div>
    )
};
export default Loader;