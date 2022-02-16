import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  allUserAdmin,
  clearErrors,
  deleteUser,
} from "../../redux/actions/userAction";
import Layout from "./Layout";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid } from "@mui/x-data-grid";
import Loader from "../../component/Loader";
import { DELETE_USER_RESET } from "../../redux/types";

const ListUsers = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, allUsersAdmin, loading, isDeleted } = useSelector(
    (state) => state.user
  );
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert.success("Delete user successfully");
      dispatch({ type: DELETE_USER_RESET });
    }
    dispatch(allUserAdmin());
  }, [dispatch, alert, error, isDeleted]);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },

    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) => {
        return params.formattedValue === "admin" ? "greenColor" : "purpleColor";
      },
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            {params.row.role === "user" && (
              <Link
                to={`/admin/users/${params.id}`}
                style={{ color: "#1976d2" }}
              >
                <EditIcon />
              </Link>
            )}
            {params.row.role === "user" && (
              <Button onClick={() => deleteUserHandler(params.id)}>
                <DeleteIcon />
              </Button>
            )}
          </>
        );
      },
    },
  ];
  const rows = [];
  allUsersAdmin &&
    allUsersAdmin.forEach((item) => {
      rows.push({
        id: item.id,
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });

  return (
    <Layout title="Users">
      {loading ? (
        <Loader />
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableSelectionOnClick
          className="myOrdersTable"
          autoHeight
          sx={{ marginTop: 3 }}
        />
      )}
    </Layout>
  );
};

export default ListUsers;
