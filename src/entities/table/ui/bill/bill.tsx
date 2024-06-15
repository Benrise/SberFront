import { BaseDto } from "@/shared/api/types"

import { Button } from "@/shared/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
    } from "@/shared/ui/alert-dialog"

import IconTrash from '~icons/heroicons/trash?width=16px&height=16px';

import './styles.scss';
import { useState } from "react";
import { TableModel } from "../..";
import { useToast } from "@/shared/ui/use-toast";

type BillProps = {
    bill: BaseDto
}

export const Bill: React.FC<BillProps> = ({ bill }) => {
    const [open, setOpen] = useState(false);
    const tableStore = TableModel.tableStore;
    const { toast } = useToast();

    const deleteTable = async (e: Event) => {

        e.preventDefault()
        const message = await tableStore.deleteTable(bill.name);
        if (message) {
            toast({
                description: message,
            })
        }
        setOpen(false);
    }

    return (
        <div className="bill">
            <div className="bill__text">
                {bill.name}
            </div>
            <div className="bill__action">
                <AlertDialog open={open} onOpenChange={setOpen}>
                    <AlertDialogTrigger>
                        <Button variant='ghost' size='icon' className="hover:bg-destructive/10">
                            <IconTrash className="text-destructive" />
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Удалить {bill.name}?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Вы уверены, что хотите удалить счет?
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>
                                Отменить
                            </AlertDialogCancel>
                            <AlertDialogAction onClick={(e: any) => deleteTable(e)} className="bg-destructive hover:bg-destructive/90">
                                Удалить
                            </AlertDialogAction>
                        </AlertDialogFooter>          
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    )
}