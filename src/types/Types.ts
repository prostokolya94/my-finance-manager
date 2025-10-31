export enum Page {
    HOME = 1,
    PLANNING = 2,
    EXPENSE = 3,
    DASHBOARD = 4
}

export type Expense = {
    date: [number, number, number], // [year, month, day]
    groceries: number,
    home: number,
    transport: number,
    clothes: number,
    restaurant: number,
    other: number,
}