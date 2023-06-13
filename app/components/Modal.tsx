"use client"
import { Modal } from "flowbite-react";
import React from "react";
import { Input } from "./Input";
import { CurrencyInput } from "react-currency-mask";
import { Controller, SubmitHandler, useForm, useFormContext } from "react-hook-form";
import { transactionSchema } from "../Schemas/EditTransaction";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./Button";
import { useSaveTransaction } from "../Services/useEditTransactionService";
import CircleSVG from "./CircleSVG";

type Props = {
  open: boolean;
  title: string;
  onClose: () => void;
  transactionId?: number;
};

export type EditTransactionFormSchemaType = z.infer<
  typeof transactionSchema
>;

export default function TransactionModal({
  open,
  onClose,
  title,
  transactionId,
}: Props) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<EditTransactionFormSchemaType>({
    resolver: zodResolver(transactionSchema),
  });

  const saveTransaction = useSaveTransaction();

  const onSubmit: SubmitHandler<EditTransactionFormSchemaType> = (data) => {
    data.id = transactionId;
    saveTransaction.mutate(data);
    onClose();
  };

  if (isSubmitting) {
    return (
      <div className="flex min-h-screen flex-1 align-middle justify-center px-6 py-12 lg:px-8">
        <CircleSVG />
      </div>
    );
  }

  return (
    <Modal dismissible show={open} onClose={onClose} className="w-auto p-2">
      <Modal.Header>{title}</Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-5">
            <Input
              label="Description"
              type="text"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-xs italic text-red-500 mt-2">
                {errors.description?.message}
              </p>
            )}
            <select
              {...register("type")}
              className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option disabled>Category</option>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
            {errors.type && (
              <p className="text-xs italic text-red-500 mt-2">
                {errors.type?.message}
              </p>
            )}
            <Controller
              name="amount"
              control={control}
              render={({ field }) => (
                <CurrencyInput
                  value={field.value}
                  onChangeValue={(_, value) => {
                    field.onChange(value);
                  }}
                  InputElement={
                    <Input label="Amount" type="text" name="amount" />
                  }
                />
              )}
            />
            <Button text="Submit" type="submit" />
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
