import { useState } from "react";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { TableData } from "./Table";
import { transactionSchema } from "../../../src/Validation";

interface EditTransactionProps {
  isOpen: boolean;
  onClose: () => void;
  onEditTransaction: (updatedTransaction: TableData) => void;
  transaction: TableData;
}

const EditTransaction: React.FC<EditTransactionProps> = ({
  isOpen,
  onClose,
  onEditTransaction,
  transaction,
}) => {
  const [formData, setFormData] = useState<TableData>(transaction);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "amount" ? (value === "" ? "" : parseFloat(value)) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = transactionSchema.safeParse(formData);

    if (result.success) {
      onEditTransaction(formData);
      onClose();
      setErrors({});
    } else {
      const newErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path) {
          newErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(newErrors);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Transaction">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div>
          <input
            type="text"
            name="senderName"
            value={formData.senderName}
            onChange={handleChange}
            placeholder="Sender Name"
            className={`border p-2 rounded outline-none w-full ${
              errors.senderName ? "border-red-500" : ""
            }`}
          />
          {errors.senderName && (
            <p className="text-red-500 text-sm mt-1 text-left">
              {errors.senderName}
            </p>
          )}
        </div>
        <div>
          <input
            type="text"
            name="receiverName"
            value={formData.receiverName}
            onChange={handleChange}
            placeholder="Receiver Name"
            className={`border p-2 rounded outline-none w-full ${
              errors.receiverName ? "border-red-500" : ""
            }`}
          />
          {errors.receiverName && (
            <p className="text-red-500 text-sm mt-1 text-left">
              {errors.receiverName}
            </p>
          )}
        </div>
        <div>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Amount"
            className={`border p-2 rounded outline-none w-full ${
              errors.amount ? "border-red-500" : ""
            }`}
          />
          {errors.amount && (
            <p className="text-red-500 text-sm mt-1 text-left">
              {errors.amount}
            </p>
          )}
        </div>
        <div>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border p-2 rounded outline-none w-full"
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Failed">Failed</option>
          </select>
        </div>
        <Button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save Changes
        </Button>
      </form>
    </Modal>
  );
};

export default EditTransaction;
