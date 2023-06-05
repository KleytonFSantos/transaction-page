"use client";

import { Table } from "flowbite-react";
import TransactionModal from "../Modal";
import { useState } from "react";

type Props = {
  data?: Array<object>;
};
export default function TransactionTable({ data }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [transactionId, setTransactionId] = useState();

  const handleCloseModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleOpenModal = (id: any) => {
    setModalOpen(true);
    setTransactionId(id);
  }
  return (
    <>
      <Table>
        <Table.Head>
          <Table.HeadCell>Description</Table.HeadCell>
          <Table.HeadCell>Value</Table.HeadCell>
          <Table.HeadCell>Date</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {data &&
            data.map((transaction: any) => (
              <Table.Row
                onClick={() => handleOpenModal(transaction.id)}
                title="click to edit transaction"
                className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer"
                key={transaction.id}
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {transaction.description}
                </Table.Cell>
                <Table.Cell>
                  {transaction.type === "expense" ? "-" : ""}
                  {transaction.amount.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </Table.Cell>
                <Table.Cell>{transaction.created_at}</Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
      <TransactionModal onClose={handleCloseModal} open={modalOpen} transactionId={transactionId}/>
    </>
  );
}
