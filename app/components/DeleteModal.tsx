"use client";
import { Modal } from "flowbite-react";
import React from "react";
import { Button } from "./Button";
import { useDeleteTransaction } from "../Services/useDeleteTransaction";
import CircleSVG from "./CircleSVG";

type Props = {
  transactionId: number | undefined;
  handleOpen: boolean;
  onClose: () => void;
};

export default function DeleteModal({
  transactionId,
  handleOpen,
  onClose,
}: Props) {
  const deleteTransaction = useDeleteTransaction();

  const handleDeleteTransaction = () => {
    deleteTransaction.mutate(transactionId);
    onClose();
  };

  if (deleteTransaction.isLoading) {
    return (
      <div className="flex min-h-screen flex-1 align-middle justify-center px-6 py-12 lg:px-8">
        <CircleSVG />
      </div>
    );
  }
  
  return (
    <Modal
      dismissible
      show={handleOpen}
      onClose={onClose}
      className="w-auto p-2"
    >
      <Modal.Header>Delete transaction</Modal.Header>
      <Modal.Body>
        <div>Do you want to delete the transaction?</div>
      </Modal.Body>
      <Modal.Footer className="flex justify-center">
        <div className="flex justify-between w-2/3">
          <Button text="Cancel" type="button" color="red" onClick={onClose} />
          <Button
            text="Delete"
            type="button"
            onClick={handleDeleteTransaction}
          />
        </div>
      </Modal.Footer>
    </Modal>
  );
}
