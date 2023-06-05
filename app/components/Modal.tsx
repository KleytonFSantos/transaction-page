import { Modal } from "flowbite-react";
import React from "react";
import { Input } from "./Input";
import { CurrencyInput } from "react-currency-mask";

type Props = {
  open: boolean;
  onClose: () => void;
  transactionId?: number;
};


export default function TransactionModal({ open, onClose, transactionId }: Props) {

  return (
    <Modal dismissible show={open} onClose={onClose} className="w-auto p-2">
      <Modal.Header>Edit Transaction</Modal.Header>
      <Modal.Body>
        <div className="space-y-5">
          <Input label="Description" type="text" name="description"/>
          <select
            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            <option disabled>Category</option>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
          <CurrencyInput
            onChangeValue={(event, originalValue, maskedValue) => {
            }}
            InputElement={<Input label="Amount" name="" type="text" />}
          />
        </div>
      </Modal.Body>
    </Modal>
  );
}
