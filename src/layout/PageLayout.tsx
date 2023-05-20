import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/nav-bar/NavBar";
import { Container } from "@chakra-ui/react";

const PageLayout = () => {
    return (
        <>
            <NavBar />
            <Container>
                <Outlet />
            </Container>
        </>
    );
};

export default PageLayout;
