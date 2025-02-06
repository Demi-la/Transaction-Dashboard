"use client";
import { ColumnDef } from "@tanstack/react-table";
import CustomTable, { TableData } from "./Table";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardHeader from "./DashboardHeader";
import AddTransaction from "./AddTransaction";
import Actions from "@/components/Actions";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState<TableData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const savedTransactions = localStorage.getItem("transactions");
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
      setIsLoading(false);
    } else {
      fetch("/data.json")
        .then((response) => response.json())
        .then((data) => {
          setTransactions(data);
          localStorage.setItem("transactions", JSON.stringify(data));
          setIsLoading(false);
        })
        .catch(() => {
          setError("Error fetching transactions. Please try again later.");
          setIsLoading(false);
        });
    }
  }, []);
  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  const handleAddTransaction = (transaction: TableData) => {
    const newTransaction = {
      ...transaction,
      id: Date.now(),
      //  id: transactions.length + 1,
    };
    toast.success(`Transaction has been added successfully.`);
    const updatedTransactions = [newTransaction, ...transactions];
    setTransactions(updatedTransactions);
    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
  };

  const handleDelete = (id: number) => {
    const updatedTransactions = transactions.filter(
      (transaction) => transaction.id !== id
    );
    toast.success(`Transaction has been deleted successfully.`);
    setTransactions(updatedTransactions);
    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
  };

  const handleEditTransaction = (id: number, updatedTransaction: TableData) => {
    const updatedTransactions = transactions.map((transaction) =>
      transaction.id === id ? updatedTransaction : transaction
    );
    toast.success(`Transaction has been updated successfully.`);
    setTransactions(updatedTransactions);
  };
  const TransactionsColumns: ColumnDef<TableData>[] = [
    {
      accessorKey: "id",
      header: "S/N",
      cell: (info) => <span>{info.row.index + 1}</span>,
      enableSorting: false,
    },
    {
      accessorKey: "senderName",
      header: "Sender",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "receiverName",
      header: "Receiver",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: (info) => `$${info.getValue()}`,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info) => (
        <p
          style={{
            color:
              info.getValue() === "Completed"
                ? "#009918"
                : info.getValue() === "Pending"
                ? "#FFA500"
                : "#990000",
          }}
        >
          {info.getValue() as string}
        </p>
      ),
    },
    {
      accessorKey: "timestamp",
      header: "Date",
      cell: (info) => new Date(info.getValue() as string).toLocaleDateString(),
    },
    {
      header: "Actions",
      cell: (info) => {
        const transactionid = info.row.original.id;
        return (
          <Actions
            id={transactionid}
            onDelete={handleDelete}
            onEdit={handleEditTransaction}
            transaction={info.row.original}
          />
        );
      },
    },
  ];

  return (
    <div className="bg-white lg:p-8 p-4 w-full">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
      />
      <h2 className="mb-8 font-bold text-[#2d416f] text-[1.2rem]">
        Transactions
      </h2>
      <DashboardHeader
        onOpenModal={() => setIsModalOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <AddTransaction
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTransaction={handleAddTransaction}
      />
      {isLoading ? (
        <p>Loading transactions...</p>
      ) : (
        <CustomTable
          columns={TransactionsColumns}
          data={transactions}
          searchQuery={searchQuery}
        />
      )}
    </div>
  );
};

export default Dashboard;
