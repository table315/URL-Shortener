import { render, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import useAxios from "axios-hooks";
import UrlShortenerForm from "./UrlShortenerForm";

jest.mock("axios-hooks");

const mockUseAxios = useAxios as unknown as jest.Mock;

const setup = () => render(<UrlShortenerForm />);

describe("UrlShortenerForm", () => {
    it("should submit the form and display the shortened URL", async () => {
        const mockExecuteShortenUrl = jest.fn();
        mockUseAxios.mockReturnValue([
            {},
            mockExecuteShortenUrl.mockResolvedValue({
                data: { id: "abcd1234" },
            }),
        ]);

        setup();

        const input = screen.getByLabelText("Destination");
        const submitButton = screen.getByText("Shorten");

        userEvent.type(input, "https://example.com/my-url-to-shorten");
        userEvent.click(submitButton);

        await waitFor(() => {
            const shortenedUrlText = screen.getByText(
                "http://localhost:3001/abcd1234"
            );
            expect(shortenedUrlText).toBeInTheDocument();
        });
    });

    it("should display an error message for an already shortened URL", async () => {
        const mockExecuteShortenUrl = jest.fn();
        mockUseAxios.mockReturnValue([
            {},
            // mock an 409 error thrown by backend
            mockExecuteShortenUrl.mockRejectedValue({
                response: { status: 409 },
            }),
        ]);

        setup();

        const input = screen.getByLabelText("Destination");
        const submitButton = screen.getByText("Shorten");

        userEvent.type(input, "https://example.com/my-url-to-shorten");
        userEvent.click(submitButton);

        await waitFor(() => {
            expect(
                screen.getByText(
                    "Looks like this url is already shortened before"
                )
            ).toBeInTheDocument();
        });
    });

    it("should display an error message for an invalid URL", async () => {
        const mockExecuteShortenUrl = jest.fn();
        mockUseAxios.mockReturnValue([
            {},
            // mock an 400 error thrown by backend
            mockExecuteShortenUrl.mockRejectedValue({
                response: { status: 400 },
            }),
        ]);

        setup();

        const input = screen.getByLabelText("Destination");
        const submitButton = screen.getByText("Shorten");

        userEvent.type(input, "invalid-url");
        userEvent.click(submitButton);

        await waitFor(() => {
            expect(
                screen.getByText(
                    "Please enter a valid URL, like https://example.com/"
                )
            ).toBeInTheDocument();
        });
    });
});
