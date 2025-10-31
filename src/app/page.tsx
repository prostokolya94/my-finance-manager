"use client";

import Link from "next/link";
import {Button, Typography} from "@mui/material";

import styles from "./page.module.css";


export default function Home() {
  return (
    <div className={styles.page}>
        <Typography variant={"h1"}>My finance manager</Typography>
        <Button variant={"contained"}>
            <Link href={"/dashboard"}>Начать</Link>
        </Button>
    </div>
  );
}
