import * as yup from 'yup';
import { ConfigurationFormValues } from "./types";

export const schema: yup.ObjectSchema<ConfigurationFormValues> = yup.object().shape({
    configurations: yup.array().of(
        yup.object().shape({
            column: yup.string().required('Выбор столбца обязателен'),
            operations: yup.array().of(
                yup.object().shape({
                    value: yup.string(),
                    filter: yup.string(),
                    expression: yup.string(),
                })
            ).required().min(1),
        })
    ).required().min(1),
});