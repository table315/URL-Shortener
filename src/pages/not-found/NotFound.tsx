import React from "react";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { QuestionOutlineIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

const NotFound = () => (
    <Box
        height="100dvh"
        display="flex"
        alignItems="center"
        justifyContent="center"
    >
        <Box borderWidth="1px" borderRadius="lg" p="40px">
            <QuestionOutlineIcon boxSize={55} />
            <Heading mt="30px">Page does not exist</Heading>
            <Flex justifyContent="flex-end" mt="30px">
                <Button as={Link} colorScheme="teal" variant="outline" to="/">
                    Return Home
                </Button>
            </Flex>
        </Box>
    </Box>
);

export default NotFound;
