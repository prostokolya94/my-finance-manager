import { AppStore } from "@/store/AppStore";
import { ExpenseStore } from "@/store/ExpenseStore";

export const stores = {
    appStore: new AppStore(),
    expenseStore: new ExpenseStore(),
}