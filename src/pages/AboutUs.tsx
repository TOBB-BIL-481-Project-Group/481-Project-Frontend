import { Link } from 'react-router-dom';
import { PATHS } from "../consts/paths";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { NavItem } from 'react-bootstrap';


const AboutUs = () =>{
  const USERNAME = localStorage.getItem("currentUser");
  return(<div style={{ 
    backgroundImage: `url(https://wallpapercave.com/wp/wp8063327.jpg)`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
}}>
    <Navbar bg="dark" data-bs-theme="dark" className='justify-content-center '>
      <Navbar.Brand>
      &nbsp;Testcase Generator&nbsp;
      </Navbar.Brand>
      &nbsp
        <Link to={PATHS.home} className='me-auto ms-auto'>Home</Link>
        &nbsp
        <NavItem className='me-auto ms-auto text-secondary' style={{whiteSpace:"nowrap"}}>About Us</NavItem>
        &nbsp
        <Link to={PATHS.tutorial} className='me-auto ms-auto'>Tutorial</Link>
        &nbsp
        <Link to={PATHS.createFile} className='me-auto ms-auto'>Generate</Link>
      <Container>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="#login">{USERNAME}</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <div className='text-center'>
    <br></br>
            <h1>About Us</h1>
            <p>Welcome to our Testcase Generator! We are a team of passionate developers dedicated to creating efficient tools for software testing and development.</p>
            
            <br></br>
            <h2>Meet Our Team</h2>
            <br></br>
            <div>
                <h4>Ahmet Kaan Avcı</h4>
                <p>Backend Developer</p>
            </div>
            
            <div>
                <h4>Kerem Kazandır</h4>
                <p>Backend Developer</p>
            </div>

            <div>
                <h4>Esat Okcu</h4>
                <p>Frontend Developer</p>
            </div>

            <div>
                <h4>Kaan Mert Bekleyen</h4>
                <p>Frontend Developer</p>
            </div>
            <br></br>
            <h4>Special Thanks to Faruk Avcı</h4>
        </div>
    
  </div>)
};
export default AboutUs;