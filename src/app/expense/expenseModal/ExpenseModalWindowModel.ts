import {Dispatch, SetStateAction} from "react";
import {action} from "mobx";

import {stores} from "@/store";
import {Expense} from "@/types/Types";
import {ExpenseService} from "@/service/ExpenseService";
import {fetchExpenses} from "@/app/expense/page.model";

export function closeModalWindow(setIsModalOpen: Dispatch<SetStateAction<boolean>>) {
    setIsModalOpen(false);
}

export function onSaveClick (setIsOpen: Dispatch<SetStateAction<boolean>>) {
    const { currentExpense} = stores.expenseStore
    if (!currentExpense) return;
    ExpenseService.postExpense(currentExpense)
        .then(() => {
            ExpenseService.getExpenses().then(async (resp) => {
                stores.expenseStore.expenses = await resp.json() as Expense[]
                stores.expenseStore.currentExpense = null;
                closeModalWindow(setIsOpen);
            })

        })
        .catch((er) => {
            console.error(er);
        })
}

export function onCancelClick (setIsOpen: Dispatch<SetStateAction<boolean>>) {
    stores.expenseStore.currentExpense = null;
    setIsOpen(false)
}

export function changeField(key: keyof Omit<Expense, "date">, value: string) {
    action(() => {
        if (stores.expenseStore.currentExpense) {
            stores.expenseStore.currentExpense[key] = +value;
        }
    })();
}

export function deleteField(setIsOpen: Dispatch<SetStateAction<boolean>>) {
    const { currentExpense } = stores.expenseStore;
    if (!currentExpense?.date) return;
    ExpenseService.deleteExpenses(currentExpense.date)
        .then(() => {
            setIsOpen(false)
            fetchExpenses()
        })
        .catch((er) => {
            console.error(er);
        })
}