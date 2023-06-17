"use client";

import { Table } from "flowbite-react";
import TransactionModal from "../Modal";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import DeleteModal from "../DeleteModal";
import Search from "./Search";

type Props = {
  transactions?: Array<object>;
};


const token: string | null = typeof window !== "undefined" ? localStorage.getItem("token") : null;

const config = {
  headers: {
    Authorization: "Bearer " + token,
  },
};

export default function TransactionTable({ transactions }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [transactionId, setTransactionId] = useState();
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);

  const queryClient = useQueryClient();

  const { data, isLoading, error } = useMutation(() => {  
    return axios.get(
      process.env.NEXT_PUBLIC_API_BASE_URL + `transactions?descriptions=${}`,
      config
    );
  },
  {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log('Error: ' +  error);
    },
    onSettled: () => {
      queryClient.invalidateQueries('create');
    }
  });
  const handleCloseModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleCloseModalDelete = () => {
    setModalDeleteOpen(!modalDeleteOpen);
  };

  const handleOpenModal = (id: any) => {
    setTransactionId(id);
    setModalOpen(true);
  };

  const handleModaOpenDelete = (id: any) => {
    setModalDeleteOpen(!modalDeleteOpen);
    setTransactionId(id);
  };

  return (
    <>
      <form>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Mockups, Logos..."
            required
          />
          <button
            type="submit"
            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>
      <Table>
        <Table.Head>
          <Table.HeadCell>Description</Table.HeadCell>
          <Table.HeadCell>Value</Table.HeadCell>
          <Table.HeadCell>Date</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {transactions &&
            transactions.map((transaction: any) => (
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
