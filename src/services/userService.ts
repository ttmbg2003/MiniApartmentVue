import apiClient from "@/utils/apiClient";
import type { User } from "@/type/User";
import { jwtDecode } from "jwt-decode";

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
  getTokenUser() {
    return localStorage.getItem("token");
  }
  getEmailCurrentUser() {
    const token = this.getTokenUser();
    if (token) {
      const decoded = jwtDecode(token);
      return decoded.sub;
    } else {
      return null;
    }
  }
  data() {
    return {
      selectedFile: null,
      fileUrl: "",
    };
  }
  async uploadImage(selectedFile: File, email: any): Promise<string> {
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('email', email);

    

    // const token = this.getCurrentUser();
    try {
      const response = await 
      apiClient.post("/api/file/upload", 
        formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          // 'Authorization': 'Bearer ' + token
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  }
  
  changePassword(email:string, currentPass:string, newPass:string){    
    const token = this.getTokenUser();  
    console.log(token);
    
    const formData = new FormData();
    formData.append('email', email);
    formData.append('currentPassword', currentPass);
    formData.append('newPassword', newPass);
    try {
      return apiClient.post('/api/user/changePassword', formData, {
        headers: {
          // 'Access-Control-Allow-Origin': true,
          // 'Content-Type': 'application/json',
          // 'x-access-token': token,
          // 'Token': 'Bearer ' + token
        }
      }).then((response) => response.data);
      } catch (error) {
      console.error('Error change password:', error);
      throw error;
    }
  }
  // dataChangePass(){
  //   return{
  //     email:"",
  //     currentPass:"",
  //     newPass:""
  //   }
  // }
}

export default new UserService();