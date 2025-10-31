import {Expense} from "@/types/Types";

export const isEqual = (a: unknown, b: unknown) => {
    return JSON.stringify(a) === JSON.stringify(b)
}

export const getStringFromDate = (date: [number, number, number]) => `${date[2]}.${date[1]}.${date[0]}`

export const ExpenseTitlesByKeys: Record<keyof Expense,string> = {
    clothes: "Одежда",
    date: "Дата",
    groceries: "Продукты",
    home: "Дом",
    other: "Другое",
    restaurant: "Рестараны",
    transport: "Транспорт"
}