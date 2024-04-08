import { Link } from 'react-router-dom';
import { PATHS } from "../consts/paths";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { NavItem } from 'react-bootstrap';


const HomePage = () => {
    return (<div style={{ 
      backgroundImage: `url(https://wallpapercave.com/wp/wp12684726.jpg)`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "100vh",
  }}>
      <Navbar bg="dark" data-bs-theme="dark" className='justify-content-center '>
        <Navbar.Brand>
        &nbsp;Testcase Generator&nbsp;
        </Navbar.Brand>
        &nbsp
          <NavItem className='me-auto ms-auto text-secondary'>Home</NavItem>
          &nbsp
          <Link to={PATHS.aboutUs} className='me-auto ms-auto' style={{whiteSpace:"nowrap"}}>About Us</Link>
          &nbsp
          <Link to={PATHS.tutorial} className='me-auto ms-auto'>Tutorial</Link>
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
      <iframe   scrolling="no"
                title="Local HTML Content"
                src={`${process.env.PUBLIC_URL}/home-page/index.html`}

                style={{ position: "absolute", left:"25%", width: '50%', height: '2000px', border: 'none' }}
            />
      </div>
      )
  };
  
export default HomePage;