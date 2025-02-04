'use client'
import { ColumnDef } from "@tanstack/react-table";
import CustomTable, { TableData } from "./Table";
import { useEffect, useState } from "react";
import DashboardHeader from "./DashboardHeader";
import AddTransaction from "./AddTransaction";

const Dashboard = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [transactions, setTransactions] = useState<TableData[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
   useEffect(() => {
     const savedTransactions = localStorage.getItem("transactions");
     if (savedTransactions) {
       setTransactions(JSON.parse(savedTransactions));
     } else {
       fetch("/data.json")
         .then((response) => response.json())
         .then((data) => {
           setTransactions(data);
           localStorage.setItem("transactions", JSON.stringify(data));
         })
         .catch((error) =>
           console.error("Error fetching transactions:", error)
         );
     }
   }, []);

 const handleAddTransaction = (transaction: TableData) => {
   const newTransaction = {
     ...transaction,
     id: Date.now(),
     //  id: transactions.length + 1,
   };

   const updatedTransactions = [newTransaction, ...transactions];
   setTransactions(updatedTransactions);
   localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
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
  ];

  return (
    <div className="bg-white p-8 w-[100%]">
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
      {transactions.length > 0 ? (
        <CustomTable
          columns={TransactionsColumns}
          data={transactions}
          searchQuery={searchQuery}
        />
      ) : (
        <p>Loading transactions...</p>
      )}
    </div>
  );
};

export default Dashboard;
