import {Expense} from "@/types/Types";

const port = process.env.PORT || 8001;
const url = "http://localhost:" + port;

export class ExpenseService {

    public static async getExpenses() {
        return await fetch(`${url}/api/expenses`);
    }

    public static async postExpense(request: Expense) {
        return await fetch(`${url}/api/expenses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request)
        });
    }
    public static async deleteExpenses(date: [number, number, number]) {
        return await fetch(`${url}/api/expenses/${date.join(",")}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}