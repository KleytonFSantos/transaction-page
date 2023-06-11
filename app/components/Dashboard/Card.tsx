"use client";
import { Card } from "flowbite-react";
import { useState } from "react";
import TransactionModal from "../Modal";

type CardProps = {
  title: string;
  value: number | string;
};

export default function TransactionCard({ title, value }: CardProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleCloseModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  return (
    <>
      <Card className={"lg:w-1/3" + (title !== "Total" ? " cursor-pointer " : "") } onClick={handleOpenModal}>
        <a href="#">
          <h5 className="text-xs font-semibold tracking-tight text-gray-900 dark:text-white">
            <p>{title}</p>
          </h5>
        </a>
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-gray-900 dark:text-white">
            R$ {value?.toString().replace(".", ",")}
          </span>
        </div>
        {title !== "Total" ? <button className="text-xs">Add +</button> : ""}
      </Card>
      <TransactionModal title={title !== "Total" ? "Create " + title : "Total"} onClose={handleCloseModal} open={modalOpen} />
    </>
  );
}
