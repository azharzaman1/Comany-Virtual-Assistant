import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectEmployeesList } from "../redux/slices/employeesSlice";
import { companyRoles, tableHeaderCells } from "./files/comapnyRoles";
import "./Table.css";

const TableComponent = () => {
  const employeesList = useSelector(selectEmployeesList);

  return (
    <Table className="table">
      <TableHead className="table__head">
        <TableRow className="table__row">
          {tableHeaderCells?.map((cell) => (
            <TableCell className="table__cell" key={cell.id}>
              {cell.label}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody className="table__body">
        {employeesList &&
          employeesList.map((employee) => (
            <TableRow className="table__row" key={employee.employeeID}>
              <TableCell className="table__cell">
                {employee.employeeName}
              </TableCell>
              <TableCell className="table__cell">
                {employee.employeeEmail}
              </TableCell>
              <TableCell className="table__cell">
                {employee.employeePhone}
              </TableCell>
              <TableCell className="table__cell">
                {
                  companyRoles?.find(
                    (role) => role.value === employee.employeeDepartment
                  )?.name
                }
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default TableComponent;
