import React from "react";
import { Heading } from "@chakra-ui/react";
import UrlShortenerForm from "./url-shortener-form/UrlShortenerForm";

function Home() {
    return (
        <div>
            <Heading my="20px">A URL Shortener app</Heading>
            <UrlShortenerForm />
        </div>
    );
}

export default Home;
