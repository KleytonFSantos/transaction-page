import axios from "axios";
import { FormSchemaType } from "../login/page";

export const loginUser = async (user: FormSchemaType) => {
    const response = await axios.post('http://api-docker.online/api/login', user)
    return response.data;
}