import apiClient from "@/utils/apiClient"
import type { User } from "@/type/User";
class UserService{
    getAllUser = (): Promise<User[]> =>{
        return apiClient.get("/getAllUser").then((response) => response.data);
    }
    getUserById = (id: any): Promise<User> => {
        return apiClient.get(`/getUserById?id=${id}`).then((response) => response.data);
    }
    editProfile = (user:User): Promise<User> => {
        return apiClient.post(`/editProfile`,user).then((response) => response.data);
    }
}

export default new UserService();