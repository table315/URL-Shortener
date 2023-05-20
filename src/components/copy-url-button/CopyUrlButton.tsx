import React from "react";
import { Button } from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";

const CopyUrlButton = ({ url }: { url: string }) => {
    const handleClick = () => navigator.clipboard.writeText(url);

    return (
        <Button
            leftIcon={<CopyIcon />}
            colorScheme="teal"
            variant="solid"
            size="sm"
            onClick={handleClick}
        >
            Copy
        </Button>
    );
};

export default CopyUrlButton;
