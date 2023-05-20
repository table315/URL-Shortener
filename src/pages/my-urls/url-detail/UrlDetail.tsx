import React from "react";
import { Box, Flex, Link, Text } from "@chakra-ui/react";
import { format, parseISO } from "date-fns";
import getShortenedUrl from "../../../shared/utils/getShortenedUrl";
import CopyUrlButton from "../../../components/copy-url-button/CopyUrlButton";

interface Props {
    id: string;
    destination: string;
    createdAt: string;
}
/**
 * Url detail component that display the shortened URL,
 * original destination, the created_at timestamp,
 * and a copy button that allow user to copy the shortened URL.
 */
const UrlDetail = ({ id, destination, createdAt }: Props) => {
    const shortenedUrl = getShortenedUrl(id);
    return (
        <Box>
            <Flex direction="column" gap="10px">
                <Link
                    fontSize="xl"
                    fontWeight="bold"
                    target="_blank"
                    rel="noreferrer"
                    href={shortenedUrl}
                >
                    {shortenedUrl}
                </Link>
                <Link
                    color="teal.500"
                    fontSize="md"
                    target="_blank"
                    rel="noreferrer"
                    href={destination}
                >
                    {destination}
                </Link>
            </Flex>
            <Flex alignItems="center" justifyContent="space-between">
                <Text fontSize='sm' color="gray.500">
                    Created at:{" "}
                    {format(parseISO(createdAt), "dd MMM yyyy, HH:mm")}
                </Text>
                <CopyUrlButton url={shortenedUrl} />
            </Flex>
        </Box>
    );
};

export default UrlDetail;
