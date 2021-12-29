/* eslint-disable jsx-a11y/alt-text */
// eslint-disable-next-line jsx-a11y/alt-text
// eslint-disable-next-line
import "./App.css";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useState } from "react";
import data from "./data";

function App() {

  let [shoes, setShoes] = useState(data);

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="jumbotron">
        <h1>Hello, world!</h1>
        <p>
          This is a simple hero unit, a simple jumbotron-style component for
          calling extra attention to featured content or information.
        </p>
        <p>
          <Button variant="primary">Learn more</Button>
        </p>
      </div>

      <div className="container">
        <div className="row">
          {shoes.map( (a,i) => {
            return(
              <Card  shoes={shoes[i]} index = {i} key={i}/>
            )
          })}
        </div>
      </div>
    </div>
  );
  
}

const Card = (props) => {

  const {shoes,index} = props;
  
  return (
    <div className="col-md-4">
          <img src={'https://codingapple1.github.io/shop/shoes' +(index+1) +'.jpg'}  width="100%" />
          <h4>{shoes.title}</h4>
          <p>{shoes.content} & {shoes.price}원</p>
      </div>
  )
}

export default App;
