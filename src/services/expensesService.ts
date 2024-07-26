import type { Expenses } from "@/type/ExpenseDetail";
import apiClient from "@/utils/apiClient";

class ExpensesService{
    addNewExpenses = (expense:Expenses): Promise<any> => {
        return apiClient
          .post(`/api/expenses/addNewExpenses`,expense)
          .then((response) => response.data['result']);
      };
    
    getRentalFeeByRoomId = (roomId:number): Promise<any> => {
        return apiClient.post(`/contract/getRepesentative?roomId=${roomId}`)
        .then((response) => response.data['result']);
    }
    getExpensesByRoomId = (year:any,roomId:number,pageNo:number): Promise<any> =>{
        if (pageNo == null) {
            pageNo = 0;
        }  
        return apiClient.get(`/api/expenses/getExpensesByRoom?pageNo=${pageNo}&year=${year}&roomId=${roomId}`)
        .then((response) => response.data['result'])
    }
    getExpensesByMonth = (year:any,month:number,pageNo:number): Promise<any> =>{
        if (pageNo == null) {
            pageNo = 0;
        }  
        return apiClient.get(`/api/expenses/getExpensesBymonth?pageNo=${pageNo}&year=${year}&month=${month}`)
        .then((response) => response.data['result'])
    }
}
export default new ExpensesService();