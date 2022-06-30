import React from "react";
import { Navbar } from "react-bootstrap";
import Container from "react-bootstrap/Container";

const HeaderNavbar = () => {
    return (
        <div className="border-bottom">
            <Navbar>
                <Container>
                    <Navbar.Brand className="" href="#home">
                        <i className="fs-2">Pay Bill</i>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text className="text-dark fs-5 ">
                            Total Paid: <p className="d-inline">31</p>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default HeaderNavbar;
