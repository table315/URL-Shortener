import React from "react";
import { Link } from "react-router-dom";
import { Button, Flex, Heading, Spacer } from "@chakra-ui/react";

const NavBar = () => {
    return (
        <Flex as="nav" p="10px" alignItems="center">
            <Heading
                as="h1"
                color="teal.500"
                _hover={{
                    color: "teal.400",
                }}
            >
                <Link to="/">URL Shortener</Link>
            </Heading>
            <Spacer />
            <Button as={Link} colorScheme="teal" variant="ghost" to="/urls">
                My URLs
            </Button>
        </Flex>
    );
};

export default NavBar;
