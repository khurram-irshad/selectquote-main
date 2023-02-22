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
    async getScode(sCode) {
        try {
            const response = await HttpService.get(
              `https://d9fs82ix42pq1.cloudfront.net/dev/sqcmp1/get_campaigns_table_csv?campaignKey=${sCode}`
            );
            if (response && response.data) {
              return response.data[0];
            }
          } catch (error) {
            console.log(error);
          }
          return null;
    }
}

export const appService = new AppService();
