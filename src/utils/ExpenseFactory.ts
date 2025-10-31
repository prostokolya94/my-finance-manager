import {Expense} from "@/types/Types";

export class ExpenseFactory {

    public static createExpense(date: [number, number, number]): Expense {
        return {
            date: date || [0, 0, 0],
            groceries: 0,
            transport: 0,
            home: 0,
            clothes: 0,
            restaurant: 0,
            other: 0,
        }
    }
}