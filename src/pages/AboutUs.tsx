import { Link } from 'react-router-dom';
import { PATHS } from "../consts/paths";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { NavItem } from 'react-bootstrap';
import logo from '../media/TG-logo.png';
const AboutUs = () =>{
  return(<div style={{backgroundColor: '#f0f0f0', height:'100vh'}}>
    <Navbar bg="dark" data-bs-theme="dark" className='justify-content-center '>
    <Navbar.Brand>
          <img src ={logo} width={40} height={50} alt='Logo' />
        </Navbar.Brand>
        <Link to={PATHS.home} className='me-auto'>Home</Link>
        <NavItem className='me-auto text-secondary'>About Us</NavItem>
        <Link to={PATHS.tutorial} className='me-auto'>Tutorial</Link>
        <Link to={PATHS.createFile} className='me-auto'>Go to Test-Generator</Link>
      <Container>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="#login">Kerem Kazandır</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <h1 style={{alignItems:'center', justifyContent: 'center', display:'flex', marginTop:'30px', fontSize:'48px',}}>About Us</h1>
    <div style={{justifyContent: 'center', height:'60vh', display:'flex', flexDirection:'column', alignItems:'center', fontSize:'24px',}}>
    <h1>Developers</h1>
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
    <br></br>
    <br></br>
    <h3>Special Thanks to Faruk Avcı</h3>
    </div>
    
  </div>)
};
export default AboutUs;