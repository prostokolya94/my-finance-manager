import {stores} from "@/store";
import {ExpenseTitlesByKeys, isEqual} from "@/utils/Utils";
import {ChartData, Expense} from "@/types/Types";

export const getFilteredExpensesDataSet = (currentDateString: string | null): ChartData | null => {
    const { expenses } = stores.expenseStore

    const [year, month] = currentDateString?.split("-").map(e => +e) || [0,0]
    const filtered = expenses.filter((expense) => isEqual(expense.date?.[0], year) && isEqual(expense.date?.[1], month))
    const currentArray = (year > 0 && month > 0) ? filtered : expenses

    const totalExpense = {date: [1,1,1]} as Expense;
    currentArray.forEach((expense) => {
        totalExpense.groceries = totalExpense.groceries ? totalExpense.groceries +  expense.groceries : expense.groceries
        totalExpense.home = totalExpense.home ? totalExpense.home + expense.home : expense.home
        totalExpense.transport = totalExpense.transport ? totalExpense.transport + expense.transport : expense.transport
        totalExpense.clothes = totalExpense.clothes ? totalExpense.clothes + expense.clothes : expense.clothes
        totalExpense.other = totalExpense.other ? totalExpense.other + expense.other : expense.other
        totalExpense.restaurant = totalExpense.restaurant ? totalExpense.restaurant + expense.restaurant : expense.restaurant
    })
    delete totalExpense.date
    const arr = Object.entries(totalExpense as Omit<Expense, "date">)
    return {
        titles: arr.map(([k,v]) => ExpenseTitlesByKeys[k as keyof Expense]),
        dataSet: {data: arr.map(([_, v]) => v), label: "Траты"},
    }
}