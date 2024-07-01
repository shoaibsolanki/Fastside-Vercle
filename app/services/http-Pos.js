import axios from 'axios'
import {isDev} from '../Constant/URL.js'

export const BASEURL = {
   ENDPOINT_URL: isDev?"http://103.148.165.246:8088/test/api/v1/":"http://103.139.59.233:8089/prod/api/v1/",
}

// export const authToken = localStorage.getItem('token');

export default axios.create({
    baseURL: `${BASEURL.ENDPOINT_URL}`,
    // headers: {
    //     "Access-Control-Allow-Origin":"*",
    //     "authtoken": ${authToken}
    // }
});