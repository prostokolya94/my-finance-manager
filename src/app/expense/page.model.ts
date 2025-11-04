import {stores} from "@/store";
import {ExpenseFactory} from "@/utils/ExpenseFactory";
import {Dispatch, SetStateAction} from "react";
import {isEqual} from "@/utils/Utils";
import {ExpenseService} from "@/service/ExpenseService";
import {Expense} from "@/types/Types";

export const getDaysRows = (year: number, month: number) => {
    const date = new Date(year, month, 0);
    return date.getDate();
}

export const getCurrentRowByDate = (date: [number, number, number]) => {
    const { expenses } = stores.expenseStore;
    return expenses.find((item) => isEqual(item.date, date));
}

export function onRowClick(date: [number, number, number], setIsModalOpen: Dispatch<SetStateAction<boolean>>) {
    stores.expenseStore.currentExpense = getCurrentRowByDate(date) ?? ExpenseFactory.createExpense(date)
    setIsModalOpen(true);
}

export function fetchExpenses() {
    ExpenseService.getExpenses()
        .then(async (res) => {
            try {
                stores.expenseStore.expenses = await res.json() as Expense[]
            } catch (e) {
                throw new Error(e as string)
            }
        })
        .catch((err) => {
            console.log(err);
        })
}
