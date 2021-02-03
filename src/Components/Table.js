import React, { useState } from "react";
import {
  Button,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Toolbar,
  makeStyles,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import {
  selectEmployeesList,
  SET_EMPLOYEE_TO_EDIT,
  SET_EMPLOYEE_EDIT_MODE,
  selectEmployeeDepartments,
} from "../redux/slices/employeesSlice";
import { tableHeaderCells } from "./files/comapnyRoles";
import "./Table.css";
import {
  Add,
  Close,
  EditOutlined,
  PanoramaFishEye,
  Search,
  Visibility,
  Watch,
} from "@material-ui/icons";
import { db } from "../Files/firebase";
import { collectionName } from "./files/utils";
import {
  selectCurrentUserInDB,
  selectCurrentUserRole,
  selectUser,
} from "../redux/slices/userSlice";
import { useStateValue } from "../context/StateProvider";

const useStyles = makeStyles((theme) => ({
  table: {
    "& thead th": {
      color: theme.palette.primary.main,
    },
  },
}));

const TableComponent = ({ setOpenPopup, setOpenEmployeePopup }) => {
  const dispatch = useDispatch();
  const currentUserInDB = useSelector(selectCurrentUserInDB);
  const currentUser = useSelector(selectUser);
  const currentUserRole = useSelector(selectCurrentUserRole);
  const employeesList = useSelector(selectEmployeesList);
  const companyRoles = useSelector(selectEmployeeDepartments);
  const pages = [5, 10, 25];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
  const [filterFunc, setfilterFunc] = useState({
    func: (items) => {
      return items;
    },
  });
  const classes = useStyles();
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value));
    setPage(0);
  };

  const recordsAfterPagingAndSorting = () => {
    return filterFunc
      .func(employeesList)
      .slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  };

  const handleSearch = (e) => {
    let querry = e.target.value;

    setfilterFunc({
      func: (items) => {
        if (querry == "") {
          return items;
        } else {
          return items?.filter((x) =>
            x.employeeName.toLowerCase().includes(querry)
          );
        }
      },
    });
  };

  const deleteEmployeeFromDB = (argID) => {
    let subscribe = () => {};
    if (currentUserInDB) {
      subscribe = db
        .collection(currentUserInDB.userData.usersCat)
        .doc(currentUser?.uid)
        .collection("employeesList")
        .doc(
          employeesList?.find(
            (employeeInStore) =>
              employeeInStore.employeeDetails.employeeID == argID
          )?.id
        )
        .delete()
        .then(() => {
          alert("Employee delete succesfully!");
        })
        .catch((error) => {
          alert(error);
        });
    }

    return () => {
      subscribe();
    };
  };

  const editEmployeeAndPushDB = (argID) => {
    let employeeToEdit = employeesList?.find(
      (employeeInStore) => employeeInStore.employeeDetails.employeeID == argID
    );
    let employeeToEditId = employeeToEdit.id;
    dispatch(
      SET_EMPLOYEE_TO_EDIT({
        ...employeeToEdit.employeeDetails,
        employeeToEditId,
      })
    );
    dispatch(SET_EMPLOYEE_EDIT_MODE(true));
    setOpenPopup(true);
  };

  const viewEmployeeDetails = (para, id) => {
    setOpenEmployeePopup(true);
  };

  return (
    <>
      <Toolbar className="table__header">
        <TextField
          className="table__formInput"
          variant="outlined"
          label="Search Employees"
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <Button
          className="tableHeader__button"
          color="secondary"
          variant="outlined"
          startIcon={<Add />}
          onClick={() => setOpenPopup(true)}
        >
          Add New
        </Button>
      </Toolbar>
      {employeesList?.length > 0 ? (
        <Table className={`${classes.table} table`}>
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
              recordsAfterPagingAndSorting().map(({ id, employeeDetails }) => (
                <TableRow className="table__row" key={id}>
                  <TableCell className="table__cell">
                    {employeeDetails.employeeName}
                  </TableCell>
                  <TableCell className="table__cell">
                    {employeeDetails.employeeEmail}
                  </TableCell>
                  <TableCell className="table__cell">
                    {employeeDetails.employeePhone}
                  </TableCell>
                  <TableCell className="table__cell">
                    {
                      companyRoles?.find(
                        (role) =>
                          role.value === employeeDetails.employeeDepartment
                      )?.name
                    }
                  </TableCell>
                  <TableCell className="table__cell">
                    <Button
                      className="tableRow__actionBtn"
                      variant="outlined"
                      color="primary"
                      onClick={() => {
                        viewEmployeeDetails(employeeDetails.employeeID, id); // id=> ln:156
                      }}
                    >
                      <Visibility fontSize="small" />
                    </Button>
                    <Button
                      className="tableRow__actionBtn"
                      variant="outlined"
                      color="primary"
                      onClick={() => {
                        editEmployeeAndPushDB(employeeDetails.employeeID, id); // id=> ln:156
                      }}
                    >
                      <EditOutlined fontSize="small" />
                    </Button>
                    <Button
                      className="tableRow__actionBtn"
                      variant="outlined"
                      color="secondary"
                      onClick={() => {
                        deleteEmployeeFromDB(employeeDetails.employeeID);
                      }}
                    >
                      <Close fontSize="small" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      ) : (
        <h3 className="noEmployees__tagline">Currently no employees added</h3>
      )}
      {employeesList?.length > 0 && (
        <TablePagination
          component="div"
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={pages}
          count={employeesList?.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
        />
      )}
    </>
  );
};

export default TableComponent;
