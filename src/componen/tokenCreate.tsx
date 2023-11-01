import { session } from "@/utils/config";
import { aesDenckripsi, aesEnkripsi } from "@/utils/enkripsi";
import momentDate, { Moment } from "moment-timezone";
const tokenCreate = () => {
    momentDate.tz.setDefault("Asia/Makassar");

    const date = momentDate().format('YYYY-MM-DD HH:mm:ss');

    var data: any = window.localStorage.getItem(session);
    data = aesDenckripsi(data);
    data = aesDenckripsi(data);
    data = JSON.parse(data);
    var token: Object = {
        username: data.username,
        token: data.token,
        random: data.random,
        exp: date,
    }
    const ctoken: string = aesEnkripsi(JSON.stringify(token));
    // const ctoken2: string = aesEnkripsi(ctoken);

    return "Bearer " + ctoken;
}

export default tokenCreate;