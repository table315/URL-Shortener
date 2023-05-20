import urls from "./urls.json";

// very very simple way to have a mock data store.
const sessionStorage = { ...urls };

export default sessionStorage;
