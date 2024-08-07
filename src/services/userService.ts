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
      .then((response) => response.data['result'])
  };
  getUserByEmail = (email: any): Promise<User> => {
    return apiClient
      .get(`/api/user/getUserByEmail?email=${email}`)
      .then((response) => response.data['result']);
  };
  editProfile = (user: User): Promise<any> => {
    return apiClient
      .post(`/api/user/editProfile`, user)
      .then((response) => response.data.result);
  };
  getTokenUser() {
    return localStorage.getItem("accessToken");
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
  
  changePassword(email:any, currentPass:string, newPass:string){    
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
      }).then((response) => response.data.result);
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