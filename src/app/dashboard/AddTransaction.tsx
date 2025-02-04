import React, { useState } from "react";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { TableData } from "./Table";

interface AddTransactionProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTransaction: (transaction: TableData) => void;
}
interface FormData {
  id: number;
  senderName: string;
  receiverName: string;
  amount: string;
  status: "Pending" | "Completed" | "Failed"; 
  timestamp: string;
}

const AddTransaction: React.FC<AddTransactionProps> = ({
  isOpen,
  onClose,
  onAddTransaction,
}) => {
  const [formData, setFormData] = useState<FormData>({
    id: Date.now(),
    senderName: "",
    receiverName: "",
    amount: "",
    status: "Pending",
    timestamp: new Date().toISOString(),
  });

 const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? parseFloat(value) : value, 
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTransaction(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Transaction">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          name="senderName"
          value={formData.senderName}
          onChange={handleChange}
          placeholder="Sender Name"
          className="border p-2 rounded outline-none"
        />
        <input
          type="text"
          name="receiverName"
          value={formData.receiverName}
          onChange={handleChange}
          placeholder="Receiver Name"
          className="border p-2 rounded outline-none"
        />
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Amount"
          className="border p-2 rounded outline-none"
        />
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="border p-2 rounded outline-none"
        >
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Failed">Failed</option>
        </select>
        <Button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Transaction
        </Button>
      </form>
    </Modal>
  );
};

export default AddTransaction;
