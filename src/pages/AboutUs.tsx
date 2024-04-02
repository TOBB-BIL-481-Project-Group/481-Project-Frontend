import { Link } from 'react-router-dom';
import { PATHS } from "../consts/paths";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { NavItem } from 'react-bootstrap';
const AboutUs = () =>{
  return(<div>
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
    <h1>About Us</h1>
    <h3>Developers</h3>
    <ul>
      <li>
        Ahmet Kaan Avcı
      </li>
      <li>
        Esat Okcu
      </li>
      <li>
        Kerem Kazandır
      </li>
      <li>
        Kaan Mert Bekleyen
      </li>
    </ul>
    <h4>Special Thanks to Faruk Avcı</h4>
  </div>)
};
export default AboutUs;