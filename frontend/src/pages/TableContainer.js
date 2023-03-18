import React, { Fragment } from "react";
import { Table, Row, Col, Button, Input } from "reactstrap";
import { useTable, useSortBy, useFilters, usePagination } from "react-table";

import { Filter, DefaultColumnFilter } from "./Filters";

const TableContainer = ({ columns, data, isTableLoading }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    visibleColumns,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn: { Filter: DefaultColumnFilter },
      initialState: {
        pageIndex: 0,
        pageSize: 5,
        hiddenColumns: ["contact_id"],
      },
    },
    useFilters,
    useSortBy,
    usePagination
  );

  const generateSortingIndicator = (column) => {
    return column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : "";
  };

  const onChangeInSelect = (event) => {
    setPageSize(Number(event.target.value));
  };

  const onChangeInInput = (event) => {
    const page = event.target.value ? Number(event.target.value) - 1 : 0;
    gotoPage(page);
  };

  return (
    <Fragment>
      <Table bordered hover {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  <div {...column.getSortByToggleProps()}>
                    {column.render("Header")}
                    {generateSortingIndicator(column)}
                  </div>
                  <Filter column={column} />
                </th>
              ))}
            </tr>
          ))}
        </thead>

        {!isTableLoading && (
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <Fragment key={row.getRowProps().key}>
                  <tr>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
                    })}
                  </tr>
                </Fragment>
              );
            })}
          </tbody>
        )}
      </Table>

      {!isTableLoading && (
        <Row style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
          <Col md={3}>
            <Button
              className="btn btn-primary btn-sm"
              color="primary"
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            >
              {"<<"}
            </Button>
            &nbsp;
            <Button
              className="btn btn-primary btn-sm"
              color="primary"
              onClick={previousPage}
              disabled={!canPreviousPage}
            >
              {"<"}
            </Button>
          </Col>
          <Col md={2} style={{ marginTop: 7 }}>
            Page {pageIndex + 1} of {pageOptions.length}
          </Col>
          <Col md={2}>
            <Input
              type="number"
              min={1}
              style={{ width: 70 }}
              max={pageOptions.length}
              defaultValue={pageIndex + 1}
              onChange={onChangeInInput}
            />
          </Col>
          <Col md={2}>
            <Input type="select" value={pageSize} onChange={onChangeInSelect}>
              {[5, 10, 25].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </Input>
          </Col>
          <Col md={3}>
            <Button
              className="btn btn-primary btn-sm"
              color="primary"
              onClick={nextPage}
              disabled={!canNextPage}
            >
              {">"}
            </Button>
            &nbsp;
            <Button
              className="btn btn-primary btn-sm"
              color="primary"
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {">>"}
            </Button>
          </Col>
        </Row>
      )}
    </Fragment>
  );
};

export default TableContainer;
