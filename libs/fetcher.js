import API from "./api";

const fetcher = (url) => API.get(url).then(res => res.data);

export default fetcher