import axios from "axios";
import { FormSchemaType } from "../register/page";

export const createUser = async (user: FormSchemaType) => {
    const response = await axios.post("http://api-docker.online/api/" + 'register', user)
    return response.data;
}