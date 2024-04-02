import { Link } from 'react-router-dom';
import { PATHS } from "../consts/paths";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { NavItem } from 'react-bootstrap';
const HomePage = () => {
  return (<div>
    <Navbar bg="dark" data-bs-theme="dark" className='justify-content-center '>
      <Navbar.Brand>
        Home
      </Navbar.Brand>
        <NavItem className='me-auto text-secondary'>Home</NavItem>
        <Link to={PATHS.aboutUs} className='me-auto'>About Us</Link>
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
    <h1>This is Home Page</h1>
    </div>
    
    )
};
export default HomePage;