import axios from "axios";

const instace = axios.create({
    baseURL:import.meta.env.VITE_APP_BACKEND_URL
});

export default instace;