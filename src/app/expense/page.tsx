"use client";

import React, {useMemo, useState} from "react";
import { observer } from "mobx-react-lite";

import {stores} from "@/store";
import {getCurrentRowByDate, getDaysRows, onRowClick} from "@/app/expense/page.model";
import {ExpenseModalWindow} from "@/shared/ExpenseModal";

import styles from "./page.module.css";

const Page = observer(() => {
    const {expenses, currentExpense} = stores.expenseStore
    const [currentDateString, setCurrentDateString] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [year, month] = useMemo(() => {
        return currentDateString?.split("-") || []
    }, [currentDateString]);
    const filteredExpenses = useMemo(() => {
        return expenses.filter((expense) => expense.date[0] === +year && expense.date[1] === +month)
    }, [month, year, expenses]);

    const rows = useMemo(() => {
        return Array.from({length: getDaysRows(+year, +month)}).map((_, index) => {
            const expense = getCurrentRowByDate([+year, +month, index +  1])
                return (
                    <tr key={index} onClick={() => onRowClick([+year, +month, index +  1], setIsModalOpen)}>
                        <td>{`${index + 1}.${month}.${year}`}</td>
                        <td>{expense?.groceries || ""}</td>
                        <td>{expense?.home || ""}</td>
                        <td>{expense?.transport || ""}</td>
                        <td>{expense?.clothes || ""}</td>
                        <td>{expense?.restaurant || ""}</td>
                        <td>{expense?.other || ""}</td>
                    </tr>
                )
        })
    }, [filteredExpenses])

    return (
        <div className={styles.expensePageWrapper}>
            <h1>{currentDateString || "Выберите месяц"}</h1>
            <input defaultValue={undefined} type={"month"} onChange={(e) => setCurrentDateString(e.target.value)}/>
            {currentDateString &&
                <table className={styles.table}>
                    <thead>
                    <tr>
                        <th>Дата</th>
                        <th>Продукты</th>
                        <th>Дом</th>
                        <th>Транспорт</th>
                        <th>Одежда</th>
                        <th>Рестораны</th>
                        <th>Прочее</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rows}
                    </tbody>
                </table>
            }
            <ExpenseModalWindow open={isModalOpen} setOpen={setIsModalOpen} currentExpense={currentExpense}/>
        </div>
    );
});

export default Page;