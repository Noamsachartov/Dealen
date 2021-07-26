import React from 'react'
import {Link, withRouter} from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';

 function FCHeader () {
    return (
     /*   <div>
            <Link to="/">ראשי</Link> |
            <Link to="/Report">דוחות </Link> |
            <Link to="/Settings">הגדרות</Link> |
            <Link to="/Login">התחברות</Link> |
            <Link to="/SignUp">הרשמה</Link> |
            <Link to="/Coupon">קוד קופון</Link> |
        </div>*/
        <>
  <Navbar expand="md" bg="light" variant="light">
    <Container>
    
    <Nav className="ml-auto my-2 my-lg-0"  style={{ direction:'rtl'}}>
      <Nav.Link style={{ fontSize: '24px', fontWeight:'bold' }} href="#/">בית</Nav.Link>
      <Nav.Link style={{ fontSize: '24px' }} href="#Report">דוחות</Nav.Link>
      <Nav.Link style={{ fontSize: '24px' }} href="#Coupon">קוד קופון</Nav.Link>
      <Nav.Link style={{ fontSize: '24px' }} href="#Settings">הגדרות</Nav.Link>
      <Nav.Link style={{ fontSize: '24px' }} href="#Login">התחברות</Nav.Link>
      <Nav.Link style={{ fontSize: '24px' }} href="#SignUp">הרשמה</Nav.Link>
    </Nav>
    </Container>
  </Navbar>
      </>
    )
}
export default withRouter(FCHeader);
