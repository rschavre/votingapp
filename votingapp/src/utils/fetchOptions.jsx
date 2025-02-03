import axios from "axios";

export const getOptions = async (ip, port, path) => {
    try {
        const response = await axios.get(`http://${ip}:${port}/${path}`);
        return response.data;
    } catch (error) {
        return { error };
    }
}
