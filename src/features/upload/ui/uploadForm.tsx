import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/shared/ui/drawer"

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

import IconPencil from '~icons/heroicons/pencil';
import IconCloud from '~icons/heroicons/cloud-arrow-up-solid';
import IconXmark from '~icons/heroicons/x-mark-20-solid';

import { Button } from "@/shared/ui/button"
import { Input } from '@/shared/ui/input';
import { useState } from "react";

import './styles.scss'


export const UploadForm: React.FunctionComponent = () => {
    const uploadedFile = useState<File>();

    const calculateFileSize = (bytes: number) => {
        const sizes = ['Байт', 'КБ', 'МБ', 'ГБ', 'ТБ'];
        if (bytes === 0) {
          return '0 Байт';
        }
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
    }

    return (
        <div>
          <Drawer>
            <DrawerTrigger asChild>
              <Button className="w-full">
                Загрузить
              </Button>
            </DrawerTrigger>
            <DrawerContent className="upload-form">
              <DrawerHeader className="flex flex-col gap-2">
                <DrawerTitle>Загрузка файла Excel</DrawerTitle>
                <DrawerDescription>
                  Поддерживаемые форматы: XLSX, XLS. Максимальный размер: 2 МБ
                </DrawerDescription>
              </DrawerHeader>
              <div className="upload__delete">
                {uploadedFile && (
                  <div>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive">Удалить файл</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Удалить файл?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Действие нельзя будет отменить, и оно будет выполнено немедленно.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>
                            Отмена
                          </AlertDialogCancel>
                          <AlertDialogAction className="bg-destructive hover:bg-destructive/90">
                            Удалить
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                )}
              </div>
              <label htmlFor="excel-file" className="upload-form__upload upload">
                <Input accept=".xlsx, .xls" id="excel-file" type="file" />
                <div className="upload__area">
                  <IconCloud className="upload__icon" />
                  <div className="upload__body">
                    <p className="upload__text">Перетащите файл для загрузки</p>
                    <p className="upload__text">или</p>
                    <Button onClick={(e: any) => e.target?.parentElement?.click()} className="text-foreground" variant="link">выберите с устройства</Button>
                  </div>
                </div>
              </label>
              {uploadedFile[0] && (
                <div className="upload__uploaded">
                  <div className="upload__file file">
                    <div className="file__main">
                      <div className="file__format">
                        {uploadedFile[0].type.split('/')[1]}
                      </div>
                      <div className="file__text">
                        <div className="file__name">
                          {uploadedFile[0].name}
                        </div>
                        <div className="file__size">
                          {calculateFileSize(uploadedFile[0].size || 0)}
                        </div>
                      </div>
                    </div>
                    <Button className="text-foreground" size="icon" variant="destructive">
                      <IconXmark />
                    </Button>
                  </div>
                  <Button className="w-full">
                    Загрузить
                  </Button>
                </div>
              )}
            </DrawerContent>
          </Drawer>
        </div>
      );
}