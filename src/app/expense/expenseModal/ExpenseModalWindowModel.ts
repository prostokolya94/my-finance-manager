import {Dispatch, SetStateAction} from "react";
import {action} from "mobx";

import {stores} from "@/store";
import {isEqual} from "@/utils/Utils";
import {Expense} from "@/types/Types";

export function closeModalWindow(setIsModalOpen: Dispatch<SetStateAction<boolean>>) {
    setIsModalOpen(false);
}

export function onSaveClick (setIsOpen: Dispatch<SetStateAction<boolean>>) {
    const { currentExpense, expenses} = stores.expenseStore
    if (!currentExpense) return;
    const index = expenses.findIndex((expense) => isEqual(expense.date, currentExpense.date));

    if (index !== -1) {
        action(() => {
            stores.expenseStore.expenses.splice(index, 1, currentExpense)
        })()
    } else {
        stores.expenseStore.expenses = [...stores.expenseStore.expenses, currentExpense]
    }
    stores.expenseStore.currentExpense = null;
    closeModalWindow(setIsOpen);
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