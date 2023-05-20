import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import useAxios from "axios-hooks";
import MyUrls from "./MyUrls";

jest.mock("axios-hooks");

const mockUseAxios = useAxios as unknown as jest.Mock;

const setup = () =>
    render(
        <BrowserRouter>
            <MyUrls />
        </BrowserRouter>
    );

describe("MyUrls", () => {
    it("should display list of shortened url detail with given list of shortened urls.", async () => {
        const mockUrlsResponse = [
            {
                id: "test1",
                destination: "https://www.google.com/",
                created_at: "2022-01-21T11:31:23.116Z",
            },
            {
                id: "test2",
                destination: "https://www.bing.com/",
                created_at: "2022-01-21T11:13:31.547Z",
            },
        ];

        mockUseAxios.mockReturnValue([
            {
                data: mockUrlsResponse,
            },
        ]);

        setup();
        expect(
            await screen.findByText("http://localhost:3001/test1")
        ).toBeInTheDocument();
        expect(
            await screen.findByText("https://www.google.com/")
        ).toBeInTheDocument();
        expect(
            await screen.findByText("http://localhost:3001/test2")
        ).toBeInTheDocument();
        expect(
            await screen.findByText("https://www.bing.com/")
        ).toBeInTheDocument();
    });

    it('should display "You have no shortened URLs." when there is no shortened urls.', async () => {
        const mockEmptyUrlsResponse: never[] = [];

        mockUseAxios.mockReturnValue([
            {
                data: mockEmptyUrlsResponse,
            },
        ]);

        setup();
        expect(
            await screen.findByText("You have no shortened URLs.")
        ).toBeInTheDocument();
    });
    it("should display loading text when request still loading", async () => {
        mockUseAxios.mockReturnValue([
            {
                loading: true,
            },
        ]);

        setup();
        expect(await screen.findByText("Loading...")).toBeInTheDocument();
    });
    it("should display created at timestamp in correct format", async () => {
        const mockSingleUrlResponse = [
            {
                id: "test1",
                destination: "https://www.google.com/",
                created_at: "2022-01-21T11:31:23.116Z",
            },
        ];

        mockUseAxios.mockReturnValue([
            {
                data: mockSingleUrlResponse,
            },
        ]);

        setup();
        expect(
            await screen.findByText("Created at: 21 Jan 2022, 11:31")
        ).toBeInTheDocument();
    });
    it("should allow user to copy the shortened url by clicking the copy button", () => {
        Object.assign(window.navigator, {
            clipboard: {
                writeText: jest
                    .fn()
                    .mockImplementation(() => Promise.resolve()),
            },
        });

        const mockSingleUrlResponse = [
            {
                id: "test1",
                destination: "https://www.google.com/",
                created_at: "2022-01-21T11:31:23.116Z",
            },
        ];

        mockUseAxios.mockReturnValue([
            {
                data: mockSingleUrlResponse,
            },
        ]);

        setup();

        const copyButton = screen.getByRole("button");
        userEvent.click(copyButton);
        expect(window.navigator.clipboard.writeText).toHaveBeenCalledWith(
            "http://localhost:3001/test1"
        );
    });
});
