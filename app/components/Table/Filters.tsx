import React, { useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { FormEditTransaction } from "../Dashboard/TransactionTable";

type Props = {
  onSubmitHandler: any;
  register: UseFormRegister<FormEditTransaction>;
};

export const Filters = ({ onSubmitHandler, register }: Props) => {
  const [isInputActive, setInputActive] = useState(false);

  const handleInputFocus = () => {
    setInputActive(true);
  };

  const handleInputBlur = () => {
    setInputActive(true);
  };

  return (
    <form onSubmit={onSubmitHandler} className="bg-gray-50 rounded-lg">
      <div className="relative">
        <div>
          <select
            id="default-search"
            {...register("type")}
            className="w-1/5 rounded-l-lg p-4 pl-10 text-sm text-gray-900 border border-gray-300  bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="" selected disabled>
              Category
            </option>
            <option value="">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select
            id="default-search"
            {...register("orderBy")}
            className="w-1/5 p-4 pl-10 text-sm text-gray-900 border border-gray-300  bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="" selected disabled>
              Order By
            </option>
            <option value="type">Type</option>
            <option value="amount">Amount</option>
            <option value="created_at">Date</option>
          </select>
          <select
            id="default-search"
            {...register("orderTo")}
            className="w-1/5 p-4 pl-10 text-sm text-gray-900 border border-gray-300  bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="" selected disabled>
              Order To
            </option>
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
          {isInputActive ? (
            <input
              id="default-search"
              placeholder="From Date"
              className="w-1/5 p-4 pl-10 text-sm text-gray-900 border border-gray-300  bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="date"
              {...register("dateFrom")}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
          ) : (
            <input
              id="startDate"
              placeholder="To Date"
              {...register("dateFrom")}
              className="w-1/5 p-4 pl-10 text-sm text-gray-900 border border-gray-300  bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
          )}
          {isInputActive ? (
            <input
              id="endDate"
              placeholder="End Date"
              className="w-1/5 p-4 pl-10 text-sm text-gray-900 border border-gray-300  bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="date"
              {...register("dateTo")}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
          ) : (
            <input
              id="default-search"
              placeholder="End date"
              {...register("dateTo")}
              className="w-1/5 rounded-r-lg p-4 pl-10 text-sm text-gray-900 border border-gray-300  bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
          )}
        </div>
      </div>
      <div className="w-full block relative">
        <button
          type="submit"
          className="w-full text-white absolute right-2.3 bottom-0.6 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Filter
        </button>
      </div>
    </form>
  );
};
