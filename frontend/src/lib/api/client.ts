import axios from "axios";
import applyCaseMiddleware from "axios-case-converter";

const options = {
    ignoreHeaders: true
}

const client = applyCaseMiddleware(axios.create({
    baseURL: 'http://localhost:3000/api'
}), options)

export default client