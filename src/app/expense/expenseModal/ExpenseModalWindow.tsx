import React, {Dispatch, FC, SetStateAction} from "react";
import Dialog from '@mui/material/Dialog';
import {Button, DialogActions, DialogContent, DialogContentText, DialogTitle, Input, Slide} from "@mui/material";
import {TransitionProps} from "@mui/material/transitions";
import {changeField, closeModalWindow, onCancelClick, onSaveClick} from "./ExpenseModalWindowModel";
import {Expense} from "@/types/Types";
import {ExpenseTitlesByKeys, getStringFromDate} from "@/utils/Utils";
import styles from "./ExpenseModalWindow.module.css";
import {observer} from "mobx-react-lite";

interface IExpenseModalWindow {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    currentExpense: Expense | null;
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<unknown, "">;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ExpenseModalWindow:FC<IExpenseModalWindow> = observer(({open, setOpen, currentExpense}) => {
    return (
        <Dialog
            open={open}
            slots={{
                transition: Transition,
            }}
            keepMounted
            onClose={() => closeModalWindow(setOpen)}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{getStringFromDate(currentExpense?.date || [0, 0, 0])}</DialogTitle>
            <DialogContent>
                {Object.keys(currentExpense || {})
                    .filter((key) => key !== 'date')
                    .map((key) => {
                        const title = ExpenseTitlesByKeys[key as keyof Expense];
                        return (
                            <div key={key} className={styles.row}>
                                <span>{title}</span>
                                <Input
                                    value={currentExpense?.[key as keyof Expense] || ''}
                                    placeholder={title}
                                    title={title}
                                    type={"number"}
                                    onChange={(e) => {
                                        changeField(key as keyof Omit<Expense, "date">, e.target.value)
                                    }}
                                />
                            </div>
                        )
                    })}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onSaveClick(setOpen)}>Сохранить</Button>
                <Button onClick={() => onCancelClick(setOpen)}>Отменить</Button>
            </DialogActions>
        </Dialog>
    );
});

export {ExpenseModalWindow};
