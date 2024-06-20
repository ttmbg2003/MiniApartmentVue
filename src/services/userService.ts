import apiClient from "@/utils/apiClient";
import type { User } from "@/type/User";
class UserService {
  getAllUser = (): Promise<User[]> => {
    return apiClient
      .get("/api/user/getAllUser")
      .then((response) => response.data);
  };
  getUserById = (id: any): Promise<User> => {
    return apiClient
      .get(`/api/user/getUserById?id=${id}`)
      .then((response) => response.data);
  };
  getUserByEmail = (email: any): Promise<User> => {
    return apiClient
      .get(`/api/user/getUserByEmail?email=${email}`)
      .then((response) => response.data);
  };
  editProfile = (user: User): Promise<User> => {
    return apiClient
      .post(`/api/user/editProfile`, user)
      .then((response) => response.data);
  };
}

export default new UserService();