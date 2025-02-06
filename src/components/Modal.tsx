interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, message, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-[#2d416f] ">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-[1.5rem]"
          >
            &times;
          </button>
        </div>
        <p className="text-[1rem]">{message}</p>
        {children}
      </div>
    </div>
  );
};

export default Modal;
