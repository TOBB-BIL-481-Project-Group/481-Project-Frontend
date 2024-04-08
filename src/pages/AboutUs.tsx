import { Link } from 'react-router-dom';
import { PATHS } from "../consts/paths";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { NavItem } from 'react-bootstrap';


const AboutUs = () =>{
  return(<div style={{ 
    backgroundImage: `url(https://wallpapercave.com/wp/wp8063327.jpg)`, // Adjust the path to your image
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
}}>
    <Navbar bg="dark" data-bs-theme="dark" className='justify-content-center '>
      <Navbar.Brand>
        About Us
      </Navbar.Brand>
        <Link to={PATHS.home} className='me-auto'>Home</Link>
        <NavItem className='me-auto text-secondary'>About Us</NavItem>
        <Link to={PATHS.tutorial} className='me-auto'>Tutorial</Link>
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