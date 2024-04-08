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
      &nbsp;Testcase Generator&nbsp;
      </Navbar.Brand>
      &nbsp
        <Link to={PATHS.home} className='me-auto ms-auto'>Home</Link>
        &nbsp
        <Link to={PATHS.aboutUs} className='me-auto ms-auto' style={{whiteSpace:"nowrap"}}>About Us</Link>
        &nbsp
        <NavItem className='me-auto ms-auto text-secondary'>Tutorial</NavItem>
        &nbsp
        <Link to={PATHS.createFile} className='me-auto ms-auto'>Generate</Link>
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
      textAlign: "center"
    }}>
    <h1>Tutorial</h1>
    <YouTube videoId ={videoId} opts={opts} onReady={videoReady}/>
    </div>
    <br></br>
    <div className='items-center justify-center text-center'>
    Explore our tutorial, and when you're ready, simply click below to start generating your test cases. Happy testing!
    <br></br>
    <br></br>
    <a className="btn btn-primary btn-large" href="/main-1">Generate Test Cases</a>
    </div>
    
  </div>)
};
export default Tutorial;