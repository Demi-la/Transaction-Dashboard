"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Transaction {
  id: number;
  senderName: string;
  receiverName: string;
  amount: number;
  status: string;
  timestamp: string;
}

const TransactionDetails = () => {
  const { id } = useParams();
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransaction = () => {
      try {
        const savedTransactions = localStorage.getItem("transactions");
        if (!savedTransactions) {
          setError("No transactions found");
          return;
        }

        const transactions: Transaction[] = JSON.parse(savedTransactions);
        const foundTransaction = transactions.find(
          (trans) => trans.id === Number(id)
        );

        if (!foundTransaction) {
          setError("Transaction not found");
          return;
        }

        setTransaction(foundTransaction);
      } catch  {
        setError("Error loading transaction");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransaction();
  }, [id]);

  if (isLoading) {
    return <div className="p-8">Loading...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-500">{error}</div>;
  }

  if (!transaction) {
    return <div className="p-8">Transaction not found</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6 text-[#2d416f]">
        Transaction Details
      </h2>
      <div className="space-y-4 bg-white rounded-lg shadow p-6">
        <DetailRow label="Sender" value={transaction.senderName} />
        <DetailRow label="Receiver" value={transaction.receiverName} />
        <DetailRow
          label="Amount"
          value={`$${transaction.amount.toLocaleString()}`}
        />
        <DetailRow label="Status" value={transaction.status} />
        <DetailRow
          label="Date"
          value={new Date(transaction.timestamp).toLocaleDateString()}
        />
      </div>
    </div>
  );
};

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between border-b pb-2">
    <span className="font-medium text-gray-600">{label}:</span>
    <span className="text-gray-900">{value}</span>
  </div>
);

export default TransactionDetails;
