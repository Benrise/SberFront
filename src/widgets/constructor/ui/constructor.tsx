import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/shared/ui/tabs"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/ui/select"

import { Button } from "@/shared/ui/button"
import { useState } from "react"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"

import IconPlus from '~icons/lucide/plus';

import { useForm, useFieldArray, Controller, SubmitHandler } from 'react-hook-form';

import { Input } from "@/shared/ui/input"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/shared/ui/form"

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/shared/ui/dropdown-menu"

import './styles.scss'

import { observer } from "mobx-react-lite"
import { TableModel } from "@/entities/table"
import { getColumns } from "@/features/datatable/model"
import { ConfigurationDto } from "../model/types"

type Checked = DropdownMenuCheckboxItemProps["checked"]

const functionsList = [
    { label: 'Значение', value: 'VAL',  _value: 'value' },
    { label: 'Фильтр', value: 'FILTER',  _value: 'filter' },
    { label: 'Выражение', value: 'EXP',  _value: 'expression' },
    // { label: 'Доп. операция', value: 'SUB' },
  ];

  const schema = yup.object().shape({
    configurations: yup.array().of(
        yup.object().shape({
            column: yup.string().required('Выбор столбца обязателен'),
            operations: yup.array().of(
                yup.object().shape({
                    value: yup.string(),
                    filter: yup.string(),
                    expression: yup.string(),
                })
            ),
        })
    ),
});

export const Constructor: React.FC = observer(() => {
    const [functions, setFunctions] = useState<string[]>([]);
    const [configurations, setConfigurations] = useState<ConfigurationDto[]>([]);
    const tableStore = TableModel.tableStore;
    
    const columns = getColumns(tableStore.tableData.data);

    const handleAddFunction = (index: number, value: string) => {
        const newFunctions = [...functions];
        if (!newFunctions[index]) {
            newFunctions[index] = value;
        } else {
            newFunctions[index] = `${newFunctions[index]},${value}`;
        }
        setFunctions(newFunctions);
    };

    const handleAddConfiguration = () => {
        append({ column: '', operations: [] });
    };

    const form = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            configurations: [],
        },
    });

    const { fields, append } = useFieldArray({
        control: form.control,
        name: 'configurations',
    });

    const onSubmit: SubmitHandler<any> = data => {
        console.log(data);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-between h-full">
                <Tabs className="flex flex-col gap-2" defaultValue="configuration">
                    <TabsList className="w-full">
                        <TabsTrigger className="w-full" value="configuration">Операции</TabsTrigger>
                        <TabsTrigger className="w-full" value="history">История</TabsTrigger>
                    </TabsList>
                    <TabsContent value="configuration">
                        <div className="flex flex-col gap-2">
                            <div className="configurations">
                                {fields.map((field, configIndex) => (
                                    <div className="configurations__item" key={field.id}>
                                        <div className="configurations__block">
                                            <div className="configurations__label">
                                                Столбец
                                            </div>
                                            <Controller
                                                control={form.control}
                                                name={`configurations[${configIndex}].column`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Select defaultValue={field.value} onValueChange={field.onChange}>
                                                                <SelectTrigger className="bg-secondary">
                                                                    <SelectValue placeholder="Выбрать" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    {columns.map((column, index) => (
                                                                        <SelectItem key={index} value={column.header}>
                                                                            {column.header}
                                                                        </SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="configurations__block">
                                            <div className="configurations__label">
                                                Функции
                                            </div>
                                            {functions[configIndex] && (
                                                <div className="configurations__block">
                                                {functions[configIndex] && functions[configIndex].split(',').map((func, funcIndex) => (
                                                    <div key={funcIndex} className="relative w-full max-w-sm items-center">
                                                        <Controller
                                                            control={form.control}
                                                            name={`configurations[${configIndex}].operations[${funcIndex}].${func}`}
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormControl>
                                                                        <Input className='pl-14' placeholder={functionsList.find((item) => item._value === func)?.label} {...field} />
                                                                    </FormControl>
                                                                </FormItem>
                                                            )}
                                                        />
                                                        <span className="absolute start-0 inset-y-0 flex items-center justify-center px-1">
                                                            <div className="configurations__function">
                                                                {functionsList.find((item) => item._value === func)?.value}
                                                            </div>
                                                        </span>
                                                    </div>
                                                ))}
                                                </div>
                                            )}
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="secondary" size="icon">
                                                        <IconPlus />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    {functionsList.map((item) => (
                                                        <DropdownMenuItem
                                                            key={item.value}
                                                            onSelect={() => handleAddFunction(configIndex, item._value)}
                                                        >
                                                            <span className="configurations__function">
                                                                {item.value}
                                                            </span>
                                                            {item.label}
                                                        </DropdownMenuItem>
                                                    ))}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Button variant="secondary" onClick={handleAddConfiguration}>Добавить операцию</Button>
                        </div>
                    </TabsContent>
                    <TabsContent value="history">История</TabsContent>
                </Tabs>
                <div className="flex flex-row gap-2">
                    <Button className="w-full" variant={"secondary"}>Сбросить</Button>
                    <Button type="submit" className="w-full" variant={"outline"}>Применить</Button>
                </div>
            </form>
        </Form>
    )
})