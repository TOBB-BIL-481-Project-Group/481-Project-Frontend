import { Link } from 'react-router-dom';
import { PATHS } from "../consts/paths";
import YouTube from 'react-youtube';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { NavItem } from 'react-bootstrap';

const Tutorial = () =>{
  const videoId = "m6OxMCDHz3E";
  const opts = {
    width: "100%",
    borderRadius: "2rem",
    playerVars: { autoplay: 1 },
  };
  const videoReady = (event: { target: { pauseVideo: () => void; }; }) => {
    event.target.pauseVideo();
  };
  return(<div>
    <Navbar bg="dark" data-bs-theme="dark" className='justify-content-center '>
      <Navbar.Brand>
        Tutorial
      </Navbar.Brand>
        <Link to={PATHS.home} className='me-auto'>Home</Link>
        <Link to={PATHS.aboutUs} className='me-auto'>About Us</Link>
        <NavItem className='me-auto text-secondary'>Tutorial</NavItem>
        <Link to={PATHS.createFile} className='me-auto'>Go to Test-Generator</Link>
      <Container>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="#login">Muhammed Yılmaz</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      <div style={{
      maxWidth: "800px",
      margin: "auto",
      marginTop: "12px",
      minHeight: "30vh",
      borderRadius: "12px",
      overflow: "hidden",
    }}>
    <h1>Tutorial</h1>
    <YouTube videoId ={videoId} opts={opts} onReady={videoReady}/>
    </div>
  </div>)
};
export default Tutorial;