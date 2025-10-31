"use client"

import React, {FC, useEffect, useRef} from "react";
import { Chart, registerables } from 'chart.js';
import {ChartData} from "@/types/Types";

Chart.register(...registerables);

interface IMyChart {
    data: ChartData
}

const MyChart:FC<IMyChart> = ({data}) => {
    const chartRef = useRef(null);

    const {titles, dataSet} = data;

    useEffect(() => {
        if (!chartRef.current) return
        const chart = new Chart(chartRef.current, {
            type: 'doughnut',
            data: {
                labels: titles,
                datasets: [{
                    label: dataSet.label,
                    data: dataSet.data,
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.8)',
                        'rgba(95, 162, 162, 0.8)',
                        'rgba(115, 132, 132, 0.8)',
                        'rgba(135, 102, 102, 0.8)',
                        'rgba(155, 72, 72, 0.8)',
                        'rgba(175, 42, 42, 0.8)'],
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        if (titles.length === 0) {
            chart.destroy();
        }

        return () => {
            if (chart) {
                chart.destroy();
            }
        };
    }, []);

    return (
        <div style={{ width: '600px', height: '400px' }}>
            <canvas ref={chartRef} />
        </div>
    );
};

export { MyChart };