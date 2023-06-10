import axios from "axios";
import { FormSchemaType } from "../register/page";

export const createUser = async (user: FormSchemaType) => {
    const response = await axios.post(process.env.NEXT_PUBLIC_BASE_URL + 'register', user)
    return response.data;
}