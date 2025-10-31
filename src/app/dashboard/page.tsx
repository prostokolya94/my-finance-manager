"use client";

import React, {useMemo, useState} from "react";
import {MyChart} from "@/shared/MyChart/MyChart";
import {observer} from "mobx-react-lite";
import {stores} from "@/store";
import {getFilteredExpensesDataSet} from "@/app/dashboard/page.model";

import styles from "./page.module.css";

const Page = observer(() => {
    const { expenses } = stores.expenseStore
    const [currentDateString, setCurrentDateString] = useState<string | null>(null);

    const memoizedByMonth = useMemo(() => {
         return getFilteredExpensesDataSet(currentDateString);
    }, [currentDateString, expenses]);

    const memoizedTotal = useMemo(() => {
        return getFilteredExpensesDataSet(null);
    }, [ expenses]);

    return (
        <div className={styles.dashboard}>
            <div className={styles.card}>
                {memoizedTotal &&
                    memoizedTotal.dataSet.data.length > 0 ?
                    <MyChart data={memoizedTotal}/>
                    :
                    <div>Недостаточно данных</div>
                }
            </div>
            <div className={styles.card}>
                <div className={styles.input}>
                    <span>Выберите месяц и год: </span>
                    <input defaultValue={undefined} type={"month"}
                           onChange={(e) => setCurrentDateString(e.target.value)}/>
                </div>
                {currentDateString && memoizedByMonth &&
                    memoizedByMonth.dataSet.data.length > 0 ?
                    <MyChart data={memoizedByMonth}/>
                    :
                    <span>Нет данных за выбранный месяц</span>
                }
            </div>
        </div>
    );
});

export default Page;