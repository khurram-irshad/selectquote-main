import { HttpService } from "./http";
import axios from "axios";

interface Partnership {
    email: string;
    firstName: string;
    lastName: string;
    companyName: string;
    title: string;
    phoneNumber: string;
    comments: string;
    attachment : string
}

class AppService {
    async sendPartnership(model: Partnership) {
        return await HttpService.post('/api/partnership', model);
    }
    async sendFoundation(model: Partnership) {
        return await HttpService.post('api/foundation', model);
    }
    async deleteImg (filepath : any) {
        await axios.post("/api/delete", {filepath: filepath})
    }
    async  uploadImg (formData: any){
        return await HttpService.post("/api/upload", formData)

    }
}

export const appService = new AppService();
