import * as React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export const Navbars = () => {
    const Token=localStorage.getItem('token')

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand>Navbar</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/users">users</Nav.Link>


                        {
                            Token ?
                            <>
                                <Nav.Link href="/Dashbord">Dashbord</Nav.Link>
                                <Nav.Link href="/register">logOut</Nav.Link>
                            </>:
                                <>
                                    <Nav.Link href="/login">login</Nav.Link>
                                    <Nav.Link href="/register">register</Nav.Link>
                                </>

                        }

                    </Nav>
                </Container>
            </Navbar>
        </>
    );
};
