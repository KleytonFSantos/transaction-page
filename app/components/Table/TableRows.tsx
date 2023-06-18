import { Table } from "flowbite-react";
import React from "react";

type Transaction = {
  id: number;
  description: string;
  type: string;
  amount: number;
  created_at: string;
};

type Props = {
  transaction: Transaction;
  handleOpenModal: (transactionId: number) => void;
  handleModaOpenDelete: (transactionId: number) => void;
};

export const TableRows = ({
  handleModaOpenDelete,
  handleOpenModal,
  transaction,
}: Props) => {
  return (
    <Table.Row
      title="click to edit transaction"
      className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer"
      key={transaction.id}
    >
      <Table.Cell
        className="whitespace-nowrap font-medium text-gray-900 dark:text-white text-xs"
        onClick={() => handleOpenModal(transaction.id)}
      >
        {transaction.description}
      </Table.Cell>
      <Table.Cell
        className="text-xs"
        onClick={() => handleOpenModal(transaction.id)}
      >
        {transaction.type === "expense" ? "-" : ""}{" "}
        {transaction.amount?.toString().replace(".", ",")}
      </Table.Cell>
      <Table.Cell
        className=" text-xs"
        onClick={() => handleOpenModal(transaction.id)}
      >
        {transaction.created_at}
      </Table.Cell>
      <Table.Cell onClick={() => handleModaOpenDelete(transaction.id)}>
        x
      </Table.Cell>
    </Table.Row>
  );
};
