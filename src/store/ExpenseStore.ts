import {makeAutoObservable} from "mobx";
import {Expense} from "@/types/Types";

export class ExpenseStore {
    private _expenses: Expense[] = [];
    private _currentExpense: Expense | null = null;

    constructor() {
        makeAutoObservable(this)
    }

    get expenses(): Expense[] {
        return this._expenses;
    }

    set expenses(value: Expense[]) {
        this._expenses = value;
    }

    get currentExpense(): Expense | null {
        return this._currentExpense;
    }

    set currentExpense(value: Expense | null) {
        this._currentExpense = value;
    }
}