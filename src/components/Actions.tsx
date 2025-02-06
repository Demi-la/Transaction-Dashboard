"use client";
import { useState } from "react";
import { GoEye } from "react-icons/go";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import Link from "next/link";
import Modal from "./Modal";
import Button from "./Button";
import EditTransaction from "@/app/dashboard/EditTransaction";
import { TableData } from "@/app/dashboard/Table";


interface ActionsProps {
  id: number;
  onDelete: (id: number) => void;
  onEdit: (id: number, updatedTransaction: TableData) => void;
  transaction: TableData;
}

const Actions: React.FC<ActionsProps> = ({
  id,
  onDelete,
  onEdit,
  transaction,
}) => {
  const [isDeletModalOpen, setDeleteIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);

  const openDeleteModal = () => {
    setDeleteIsModalOpen(true);
    setIsDeleteSuccess(false);
  };
  const closeDeleteModal = () => {
    setDeleteIsModalOpen(false);
  };
  const handleConfirmDelete = () => {
    onDelete(id);
    setIsDeleteSuccess(true);
  };
  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);
  const handleSaveChanges = (updatedTransaction: TableData) => {
    onEdit(id, updatedTransaction);
    closeEditModal();
  };

  return (
    <div className="flex gap-2 lg:gap-4 justify-center text-black">
      <Link href={`/TransactionDetails/${id}`}>
        <div>
          <GoEye />
        </div>
      </Link>
      <div>
        <FaRegEdit onClick={openEditModal} />
      </div>
      <div>
        <RiDeleteBin6Line onClick={openDeleteModal} />
      </div>

      <Modal
        isOpen={isDeletModalOpen}
        onClose={closeDeleteModal}
        title="Confirm Deletion"
        message={
          isDeleteSuccess
            ? `Transaction with ID ${id} has been deleted successfully.`
            : "Are you sure you want to delete this transaction?"
        }
      >
        {!isDeleteSuccess ? (
          <div className="flex justify-center gap-8 mt-4">
            <Button
              onClick={handleConfirmDelete}
              className="bg-red-500 text-white px-4 py-2 rounded mr-2"
            >
              Yes, Delete
            </Button>
            <Button
              onClick={closeDeleteModal}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </Button>
          </div>
        ) : (
          <Button
            onClick={closeDeleteModal}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Close
          </Button>
        )}
      </Modal>
      <EditTransaction
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        onEditTransaction={handleSaveChanges}
        transaction={transaction}
      />
    </div>
  );
};

export default Actions;
