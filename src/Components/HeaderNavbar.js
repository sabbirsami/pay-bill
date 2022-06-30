import React, { useEffect, useState } from "react";
import { Navbar } from "react-bootstrap";
import Container from "react-bootstrap/Container";

const HeaderNavbar = () => {
    const [amount, setAmount] = useState([]);
    console.log(amount.email);

    useEffect(() => {
        fetch(`http://localhost:5000/bills`)
            .then((res) => res.json())
            .then((data) => {
                setAmount(data);
            });
    }, []);
    return (
        <header className="border-bottom">
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
        </header>
    );
};

export default HeaderNavbar;
