import React, { useEffect, useState } from "react";
import { Navbar } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { useQuery } from "react-query";

const HeaderNavbar = () => {
    const [amount, setAmount] = useState([]);
    console.log(amount.email);

    const { isLoading, error, data } = useQuery("repoData", () =>
        fetch("http://localhost:5000/bill-list").then((res) => res.json())
    );
    console.log(data);
    if (isLoading) {
        return <p>Loading...</p>;
    }

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
                            Total Paid: <p className="d-inline">{data.total}</p>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default HeaderNavbar;
