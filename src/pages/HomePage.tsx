import { Link } from 'react-router-dom';
import { PATHS } from "../consts/paths";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { NavItem } from 'react-bootstrap';
import logo from '../media/TG-logo.png';
import tgBackGround from '../media/TG-BackGround.png';
const HomePage = () => {
    return (<div>
      <Navbar bg="dark" data-bs-theme="dark" className='justify-content-center '>
        <Navbar.Brand>
          <img src ={logo} width={40} height={50} alt='Logo' />
        </Navbar.Brand>
          <NavItem className='me-auto text-secondary'>Home</NavItem>
          <Link to={PATHS.aboutUs} className='me-auto'>About Us</Link>
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
        <div style={{ padding: '20px', backgroundColor: '#f0f0f0'}}>
          <h1>Welcome to our revolutionary test-case generator for competitive programming!</h1>
        <p style={{ fontSize: '24px', lineHeight: '1.6', margin: '20px 0' }}>
Are you tired of spending precious time crafting test cases manually? Look no further! Our cutting-edge platform automates the process, allowing you to focus on what truly matters – solving challenging problems and honing your coding skills.
        <br></br>
With our intuitive interface, you can effortlessly generate test cases tailored to the problem constraints, ensuring thorough and rigorous testing of your solutions. Whether you're a seasoned competitor or just starting out, our tool empowers you to push your limits and reach new heights in competitive programming.
      <br></br>
      <br></br>
Key features of our platform include:
<br></br>
<span style={{fontWeight: 'bold'}}>Customizable Constraints:</span> Set specific constraints for your problem, including input size, range of values, and more, to simulate real-world scenarios accurately.
<br></br>
<span style={{fontWeight: 'bold'}}>Instant Generation:</span> Generate test cases in a matter of seconds, eliminating the need for tedious manual work and allowing you to focus on solving problems efficiently.
Join thousands of competitive programmers who rely on our tool to streamline their workflow, boost productivity, and ultimately, achieve success in competitions worldwide.
<br></br>
Ready to revolutionize your approach to competitive programming? Start generating test cases today and take your skills to the next level!
        </p>
        </div>
      <div style={{ backgroundImage: `url(${tgBackGround})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', width: '100%', height: '36vh'}}>
        
      </div>
      </div>
      
      )
  };
  
export default HomePage;