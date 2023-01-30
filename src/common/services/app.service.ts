import { HttpService } from "./http";

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
}

export const appService = new AppService();
