import React, { useState } from "react";
import {
    Box,
    Button,
    Divider,
    Flex,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Heading,
    Input,
    Link,
} from "@chakra-ui/react";
import useAxios from "axios-hooks";
import { AxiosError } from "axios";
import { SERVER_ENDPOINTS } from "../../../config/config";
import getShortenedUrl from "../../../shared/utils/getShortenedUrl";
import CopyUrlButton from "../../../components/copy-url-button/CopyUrlButton";

/**
 * 
 * A simple form to allow user to enter an url string and returns
 * a shortened url. user can also copy the shortened url with copy button
 * 
 */
const UrlShortenerForm = () => {
    const [url, setUrl] = useState("");
    const [shortenedUrlId, setShortenedUrlId] = useState("");
    const [error, setError] = useState<string>("");

    const [{ loading }, executeShortenUrl] = useAxios(
        {
            url: `${SERVER_ENDPOINTS}/api/url`,
            method: "PUT",
        },
        { manual: true }
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(e.target.value);
        setError("");
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await executeShortenUrl({
                data: { destination: url },
            });
            setShortenedUrlId(response.data.id);
            setUrl("");
        } catch (error) {
            // validation done in backend.
            const err = error as AxiosError;
            if (err.response?.status === 409) {
                setError("Looks like this url is already shortened before");
            } else if (err.response?.status === 400) {
                setError(
                    "Please enter a valid URL, like https://example.com/"
                );
            }
        }
    };

    const shortenedUrl = getShortenedUrl(shortenedUrlId);

    return (
        <Box maxW="500px" borderWidth="1px" borderRadius="lg" p="20px">
            <form onSubmit={handleSubmit}>
                <FormControl mb="10px" isInvalid={!!error}>
                    <FormLabel>Destination</FormLabel>
                    <Input
                        value={url}
                        type="text"
                        onChange={handleChange}
                        placeholder="https://example.com/my-url-to-shorten"
                    />
                    {error ? (
                        <FormErrorMessage>{error}</FormErrorMessage>
                    ) : (
                        <FormHelperText>
                            Please enter a site url you wanted shorten
                        </FormHelperText>
                    )}
                </FormControl>
                <Button
                    isLoading={loading}
                    colorScheme="teal"
                    variant="outline"
                    type="submit"
                >
                    Shorten
                </Button>
            </form>
            {shortenedUrlId && (
                <>
                    <Divider my="20px" />
                    <Heading as="h4" size="md">
                        Shortened URL:{" "}
                    </Heading>
                    <Flex alignItems="center" gap="5px">
                        <Link
                            color="teal.500"
                            target="_blank"
                            rel="noreferrer"
                            href={shortenedUrl}
                        >
                            {shortenedUrl}
                        </Link>
                        <CopyUrlButton url={shortenedUrl} />
                    </Flex>
                </>
            )}
        </Box>
    );
};

export default UrlShortenerForm;
