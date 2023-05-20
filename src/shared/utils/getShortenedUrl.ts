import { SERVER_ENDPOINTS } from "../../config/config";

const getShortenedUrl = (id: string) => `${SERVER_ENDPOINTS}/${id}`;

export default getShortenedUrl;
