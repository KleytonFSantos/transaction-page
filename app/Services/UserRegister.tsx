import axios from "axios";
import { FormSchemaType } from "../register/page";

export const createUser = async (user: FormSchemaType) => {
    const response = await axios.post("https://transaction-api-ma1f.onrender.com/api/" + 'register', user)
    return response.data;
}