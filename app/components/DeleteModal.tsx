"use client";
import { Modal } from "flowbite-react";
import React from "react";
import { Button } from "./Button";
import { useDeleteTransaction } from "../Services/useDeleteTransaction";

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
        deleteTransaction.mutate(transactionId)
        onClose();
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
