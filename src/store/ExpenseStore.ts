import {makeAutoObservable} from "mobx";
import {Expense} from "@/types/Types";
import {LocalStorage} from "@/shared/LocalStorage/LocalStorage";

export class ExpenseStore {
    private _expenses: Expense[] = [];
    private _currentExpense: Expense | null = null;

    constructor() {
        makeAutoObservable(this)
        try {
            this._expenses = LocalStorage.get<Expense[]>('expenses') || []
        } catch (e) {
            console.error(e);
        }
    }

    get expenses(): Expense[] {
        return this._expenses;
    }

    set expenses(value: Expense[]) {
        try {
            this._expenses = value;
            LocalStorage.set('expenses', value)
        } catch (e) {
            console.error(e);
        }
    }

    get currentExpense(): Expense | null {
        return this._currentExpense;
    }

    set currentExpense(value: Expense | null) {
        this._currentExpense = value;
    }
}