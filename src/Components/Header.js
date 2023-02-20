import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
function  Header() {

  const navigate = useNavigate();
    return (
      <header>
  
      <Navbar bg="dark" variant="dark">
      <Container>
    
        <Button onClick={() => navigate('/MainPage')}>쇼핑몰 로고+이름</Button>
        <Navbar.Toggle />
        <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-4"
              aria-label="Search"
            />
        <Button variant="outline-success">Search</Button>
        </Form>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
           <a onClick={() => navigate("/MyPage")}>Park님 환영합니다! </a>
          </Navbar.Text>
        </Navbar.Collapse>
         <Button variant="warning"> logout</Button>
      </Container>
    </Navbar>
  
      </header>
    );
  }
  
  export default Header;