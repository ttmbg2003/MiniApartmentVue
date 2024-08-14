import type { Expenses } from "@/type/ExpenseDetail";
import apiClient from "@/utils/apiClient";

class ExpensesService {
    addNewExpenses = (expense: Expenses, createDate: Date, dueDate: Date): Promise<any> => {
        return apiClient
            .post(`/api/expenses/addNewExpenses`, {
                expense, createDate, dueDate
            })
            .then((response) => response.data['result']);
    };

    getRentalFeeByRoomId = (roomId: number): Promise<any> => {
        return apiClient.post(`/contract/getRepesentative?roomId=${roomId}`)
            .then((response) => response.data['result']);
    }
    getExpensesByRoomId = (year: any, roomId: number, pageNo: number): Promise<any> => {
        if (pageNo == null) {
            pageNo = 0;
        }
        return apiClient.get(`/api/expenses/getExpensesByRoom?pageNo=${pageNo}&year=${year}&roomId=${roomId}`)
            .then((response) => response.data['result'])
    }
    getExpensesByMonth = (year: any, month: number, pageNo: number): Promise<any> => {
        if (pageNo == null) {
            pageNo = 0;
        }
        return apiClient.get(`/api/expenses/getExpensesBymonth?pageNo=${pageNo}&year=${year}&month=${month}`)
            .then((response) => response.data['result'])
    }
    getExpensesByMonthAndRoom = (year: any, month: number, room: number): Promise<any> => {
        return apiClient.get(`/api/expenses/getExpensesByRoomAndMonth?roomId=${room}&year=${year}&month=${month}`)
            .then((response) => response.data['result'])
    }
    updateExpensesStatus = (expenses: any): Promise<any> => {
        return apiClient.post('/api/expenses/updateStatus', expenses)
            .then((response) => response.data)
    }
    deleteExpenses = (year: any, month: number, room: number): Promise<any> => {
        return apiClient.delete(`/api/expenses/deleteExpenses?roomId=${room}&year=${year}&month=${month}`)
            .then((response) => response.data['result'])
    }
    getExpensesCitizenByRoomId = (year: any, roomId: number, pageNo: number): Promise<any> => {
        if (pageNo == null) {
            pageNo = 0;
        }
        return apiClient.get(`/api/expenses_citizen/getExpensesByRoom?pageNo=${pageNo}&year=${year}&roomId=${roomId}`)
            .then((response) => response.data['result'])
    }
    getExpensesCitizenByMonth = (year:any,month:number,pageNo:number): Promise<any> =>{
        if (pageNo == null) {
            pageNo = 0;
        }
        return apiClient.get(`/api/expenses_citizen/getExpensesBymonth?pageNo=${pageNo}&year=${year}&month=${month}`)
            .then((response) => response.data['result'])
    }
    getExpensesCitizenByMonthAndRoom = (year:any,month:number,room:number): Promise<any> =>{
        return apiClient.get(`/api/expenses_citizen/getExpensesByRoomAndMonth?roomId=${room}&year=${year}&month=${month}`)
            .then((response) => response.data['result'])
    }
}
export default new ExpensesService();