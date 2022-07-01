import React, { useEffect, useState } from "react";
import { Navbar } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { useQuery } from "react-query";
import Loading from "./Loading";

const HeaderNavbar = () => {
    const { isLoading, error, data } = useQuery(["amount"], () =>
        fetch("https://pay-bill-2022.herokuapp.com/bill-list").then((res) =>
            res.json()
        )
    );

    if (isLoading) {
        return <Loading></Loading>;
    }

    return (
        <header className="border-bottom">
            <Navbar>
                <Container>
                    <Navbar.Brand className="" href="/billing">
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
