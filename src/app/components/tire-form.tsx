'use client';

   import React from 'react';
   import { Form, Formik, Field } from 'formik';
   import Button from './button';
   import InputField from './input-field';

   export type TireFieldValues = {
     size: string;
     brand: string;
     model: string;
     axle: string;
     price: number | null;
     country: string;
     type: string;
   };

   const initialValues: TireFieldValues = {
     size: '',
     brand: '',
     model: '',
     axle: '',
     price: null,
     country: '',
     type: 'ШИНА',
   };

   export interface TireFormProps {
     onSubmit: (values: TireFieldValues) => void;
   }

   export default function TireForm({ onSubmit }: TireFormProps) {
     return (
       <Formik
         initialValues={initialValues}
         onSubmit={(values) => onSubmit({
           ...values,
           axle: values.type === 'ДИСК' ? '' : values.axle,
           model: values.type === 'ДИСК' ? '' : values.model,
         })}
       >
         {({ values }) => (
           <Form className="flex flex-col gap-6">
             <p className="text-xl">Додати шину/диск</p>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <InputField label="Розмір" placeholder="Напр. 215/75R17.5" name="size" />
               <InputField label="Бренд" placeholder="Напр. Windforce" name="brand" />
               <InputField label="Модель" placeholder="Напр. wd2020" name="model" disabled={values.type === 'ДИСК'} />
               <InputField label="Країна" placeholder="Напр. Китай" name="country" />
               <div className="flex flex-col">
                 <label className="mb-2 text-base text-gray-900">Тип</label>
                 <Field as="select" name="type" className="p-3 h-11 text-sm rounded border border-gray-300 shadow">
                   <option value="ШИНА">Шина</option>
                   <option value="ДИСК">Диск</option>
                 </Field>
               </div>
               <InputField label="Вісь" placeholder="Напр. ВЕДУЧА" name="axle" disabled={values.type === 'ДИСК'} />
               <InputField label="Ціна (безгот. з ПДВ)" placeholder="Напр. 5800" name="price" type="number" />
             </div>
             <Button type="submit">Додати</Button>
           </Form>
         )}
       </Formik>
     );
   }