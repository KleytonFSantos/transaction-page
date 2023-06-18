"use client";

import { Table } from "flowbite-react";
import TransactionModal from "../Modal";
import { useState } from "react";
import DeleteModal from "../DeleteModal";
import Search from "./Search";
import { filterTransactionSchema } from "@/app/Schemas/FilterTransactions";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CircleSVG from "../CircleSVG";
import { useFilterTransactions } from "@/app/Services/useFilterTransactions";
import { Filters } from "../Table/Filters";
import { SearchInput } from "../Table/SearchInput";
import { TableRows } from "../Table/TableRows";

type Props = {
  transactions?: Array<object>;
};

export type FormEditTransaction = z.infer<typeof filterTransactionSchema>;

export default function TransactionTable({ transactions }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [transactionId, setTransactionId] = useState<number>();
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<FormEditTransaction>({
    resolver: zodResolver(filterTransactionSchema),
  });
  console.log(transactions);
  const filterTransactions = useFilterTransactions();

  const handleCloseModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleCloseModalDelete = () => {
    setModalDeleteOpen(!modalDeleteOpen);
  };

  const handleOpenModal = (id: number) => {
    setTransactionId(id);
    setModalOpen(true);
  };

  const handleModaOpenDelete = (id: number) => {
    setModalDeleteOpen(!modalDeleteOpen);
    setTransactionId(id);
  };

  const onSubmit: SubmitHandler<FormEditTransaction> = (data) => {
    filterTransactions.mutate(data);
    resetField('dateFrom')
    resetField('dateTo')
  };

  if (filterTransactions.isLoading) {
    return (
      <div className="flex min-h-screen flex-1 align-middle justify-center px-6 py-12 lg:px-8">
        <CircleSVG />
      </div>
    );
  }

  return (
    <>
      <Filters onSubmitHandler={handleSubmit(onSubmit)} register={register} />
      <SearchInput
        onSubmitHandler={handleSubmit(onSubmit)}
        register={register}
      />
      <Table>
        <Table.Head>
          <Table.HeadCell>Description</Table.HeadCell>
          <Table.HeadCell>Value</Table.HeadCell>
          <Table.HeadCell>Date</Table.HeadCell>
          <Table.HeadCell></Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {!filterTransactions.data?.data
            ? transactions &&
              transactions.map((transaction: any) => (
                <TableRows
                  key={transaction.id}
                  handleModaOpenDelete={handleModaOpenDelete}
                  handleOpenModal={handleOpenModal}
                  transaction={transaction}
                />
              ))
            : filterTransactions.data.data &&
              filterTransactions.data.data.map((transaction: any) => (
                <TableRows
                  key={transaction.id}
                  handleModaOpenDelete={handleModaOpenDelete}
                  handleOpenModal={handleOpenModal}
                  transaction={transaction}
                />
              ))}
        </Table.Body>
      </Table>
      <TransactionModal
        title="Edit Transaction"
        onClose={handleCloseModal}
        open={modalOpen}
        transactionId={transactionId}
      />
      <DeleteModal
        handleOpen={modalDeleteOpen}
        transactionId={transactionId}
        onClose={handleCloseModalDelete}
      />
    </>
  );
}
