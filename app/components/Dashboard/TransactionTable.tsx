"use client";

import { Table } from "flowbite-react";
import TransactionModal from "../Modal";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import DeleteModal from "../DeleteModal";

type Props = {
  data?: Array<object>;
};

export default function TransactionTable({ data }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [transactionId, setTransactionId] = useState();
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);

  const handleCloseModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleCloseModalDelete = () => {
    setModalDeleteOpen(!modalDeleteOpen);
  };

  const handleOpenModal = (id: any) => {
    setModalOpen(true);
    setTransactionId(id);
  };

  const handleModaOpenDelete = (id: any) => {
    setModalDeleteOpen(!modalDeleteOpen);
    setTransactionId(id);
  };

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
                <Table.Cell
                  onClick={() => handleModaOpenDelete(transaction.id)}
                >
                  x
                </Table.Cell>
              </Table.Row>
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
