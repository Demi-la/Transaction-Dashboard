import { CiSearch } from "react-icons/ci";
import Button from "@/components/Button";

interface DashboardHeaderProps {
  onOpenModal: () => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}
const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  onOpenModal,
  searchQuery,
  onSearchChange,
}) => {

  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-gray-100 p-4 mb-6 ">
      <div className="flex items-center border bg-white border-[#cde1e3] rounded-md w-[17.7rem] h-[2.5rem]">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search..."
          className="w-full border-none outline-none px-2"
        />
        <button className="h-[2.345rem] w-[2.5rem] bg-green-600 border border-[#4baa79] rounded-r-md text-white text-lg">
          <CiSearch className="ml-2" />
        </button>
      </div>
      <Button onClick={onOpenModal} className="mt-4 lg:mt-0">Add Transaction</Button>
    </div>
  );
};

export default DashboardHeader;
