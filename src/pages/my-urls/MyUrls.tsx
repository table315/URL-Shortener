import React from "react";
import useAxios from "axios-hooks";
import {
    Card,
    CardBody,
    CardHeader,
    Heading,
    Spinner,
    Stack,
    StackDivider,
    Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { SERVER_ENDPOINTS } from "../../config/config";
import { shortenedUrl } from "../../../shared/interfaces";
import UrlDetail from "./url-detail/UrlDetail";

const MyUrls = () => {
    const navigate = useNavigate();
    const [{ data, loading, error }] = useAxios(`${SERVER_ENDPOINTS}/api/urls`);

    if (loading) return <Spinner size="lg" />;
    if (error) navigate("/error");

    return (
        <Card>
            <CardHeader>
                <Heading size="md">My URLs</Heading>
            </CardHeader>
            <CardBody>
                {data?.length === 0 ? (
                    <Text pt="2" fontSize="sm">
                        You have no shortened URLs.
                    </Text>
                ) : (
                    <Stack divider={<StackDivider />} spacing="4">
                        {data?.map(
                            ({ id, destination, created_at }: shortenedUrl) => (
                                <UrlDetail
                                    key={id}
                                    id={id}
                                    destination={destination}
                                    createdAt={created_at}
                                />
                            )
                        )}
                    </Stack>
                )}
            </CardBody>
        </Card>
    );
};

export default MyUrls;
