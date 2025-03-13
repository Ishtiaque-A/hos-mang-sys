import React from "react";
import SimpleSelect from "./SimpleSelect";
import "./pagination.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
const Pagination = ({
  limit = 10,
  onChangePerPage,
  rowOptions = [10, 20, 30, 40, 50, 100, 150, 200],
  totalCount = 0,
  page = 1,
  menuPlacement = "top",
  onPageChange,
  isDisabled = false,
}) => {
  const pages = Math.ceil(totalCount / limit);
  //const pageOptions = Array.from({ length: pages }, (_, i) => i + 1);
  //console.log("pageOptions", pageOptions);

  const handleChangePerPage = (selectedOption) => {
    onChangePerPage(selectedOption.value);
  };

  // const handleChangePage = (selectedOption) => {
  //   console.log("selectedOption", selectedOption);
  // };

  const handleNextPage = () => {
    if (page < pages && !isDisabled) {
      onPageChange(page + 1);
    }
  };
  const handlePrevPage = () => {
    if (page > 1 && !isDisabled) {
      onPageChange(page - 1);
    }
  };

  const identifierText = (page, limit, totalCount) => {
    const start = (page - 1) * limit + 1;
    const end = Math.min(page * limit, totalCount);
    return `${start} - ${end} of ${totalCount}`;
  };

  return (
    <div
      style={{
        padding: "5px 15px",
      }}
    >
      <div className="d-flex justify-content-end gap-1 align-items-center">
        <SimpleSelect
          label="Rows per page"
          width="70px"
          placeholder="Rows"
          isDisabled={isDisabled}
          isClearable={false}
          isSearchable={false}
          menuPlacement={menuPlacement}
          radius="5px"
          value={{ value: limit, label: limit }}
          onChange={handleChangePerPage}
          options={rowOptions?.map((option) => ({
            value: option,
            label: option,
          }))}
          defaultValue={{ value: limit, label: limit }}
        />
        <button
          disabled={isDisabled || page === 1}
          className="page-prev"
          onClick={handlePrevPage}
        >
          <IoIosArrowBack />
        </button>
        <span
          style={{
            color: "gray",
            fontWeight: "medium",
            fontSize: "13px",
            padding: "0",
            margin: "0",
            marginBottom: "-3px",
          }}
        >
          {identifierText(page, limit, totalCount)}
        </span>
        <button
          disabled={isDisabled || page === pages}
          className="page-next"
          onClick={handleNextPage}
        >
          <IoIosArrowForward />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
