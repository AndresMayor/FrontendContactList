
import { BASEURL } from "../constants/Constants";


const post = async (url, data) => {
    let response = await fetch(
        BASEURL + url,
        {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );
    return response;
}

const deletee = async (url, data) => {
    let response = await fetch(
        BASEURL + url,
        {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );
    return response;
}
const patch = async (url, data) => {
    let response = await fetch(
        BASEURL + url,
        {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );
    return response;
}

const get = async (url) => {
    let response = await fetch(
        BASEURL + url,
        {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        }
    );
    return response;
}
export { post, get, deletee, patch};