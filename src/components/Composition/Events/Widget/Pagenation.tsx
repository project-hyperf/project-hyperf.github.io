import { useState } from "react";
import { Pagination as NextUIPagination } from "@nextui-org/react";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  return (
    <div className="flex justify-center mt-4">
      <NextUIPagination
        total={totalPages}
        initialPage={1}
        page={currentPage}
        onChange={handlePageChange}
        variant="light"
        radius="full"
        color="default"
      />
    </div>
  );
};
