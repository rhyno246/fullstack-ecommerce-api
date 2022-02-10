import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect } from "react";
import Layout from "./Layout";
import { useDispatch, useSelector } from "react-redux";
import { DELETE_CONTACT_RESET } from "../../redux/types";
import Loader from "../../component/Loader";
import { DataGrid } from "@mui/x-data-grid";
import {
  clearErrors,
  deleteAdminContact,
  getAllContact,
} from "../../redux/actions/contactAction";
import { useAlert } from "react-alert";
const ContactAdmin = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { contacts, loading, error, isDeleted } = useSelector(
    (state) => state.contact
  );
  const handleDeleteContact = (id) => {
    dispatch(deleteAdminContact(id));
  };

  const columns = [
    { field: "id", headerName: "Slider ID", minWidth: 200, flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "phone",
      headerName: "Phone",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "nodeted",
      headerName: "Comment",
      minWidth: 450,
      flex: 0.3,
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
            <Button onClick={() => handleDeleteContact(params.id)}>
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];
  const rows = [];
  contacts &&
    contacts.forEach((item) => {
      rows.push({
        id: item.id,
        name: item.name,
        email: item.email,
        phone: item.phone,
        nodeted: item.nodeted,
      });
    });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert.success("Commnet Deleted Successfully");
      dispatch({ type: DELETE_CONTACT_RESET });
    }
    dispatch(getAllContact());
  }, [dispatch, alert, error, isDeleted]);
  return (
    <Layout title="Contact">
      {loading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage">
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
        </div>
      )}
    </Layout>
  );
};

export default ContactAdmin;
