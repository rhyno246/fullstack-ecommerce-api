import Layout from "./Layout";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getAllSlider } from "../../redux/actions/bannerAction";
import { DELETE_SLIDER_RESET } from "../../redux/types";
import Loader from "../../component/Loader";
const SlideShow = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { sliders, loading, error, isDeleted } = useSelector(
    (state) => state.banner
  );
  const columns = [
    { field: "id", headerName: "Slider ID", minWidth: 200, flex: 0.5 },
    {
      field: "image",
      headerName: "Image",
      minWidth: 100,
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <img
              src={params.formattedValue}
              alt={params.id}
              style={{ width: "50px", objectFit: "cover" }}
            />
          </>
        );
      },
    },
    {
      field: "heading",
      headerName: "Heading",
      minWidth: 250,
      flex: 1,
    },
    {
      field: "description",
      headerName: "Description",
      minWidth: 350,
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
            <Link
              to={`/admin/slider/${params.id}`}
              style={{ color: "#1976d2" }}
            >
              <EditIcon />
            </Link>
            <Button>
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];
  const rows = [];
  sliders &&
    sliders.forEach((item) => {
      rows.push({
        id: item.id,
        heading: item.heading,
        description: item.description,
        image: item.image.url,
      });
    });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert.success("Product Deleted Successfully");
      dispatch({ type: DELETE_SLIDER_RESET });
    }
    dispatch(getAllSlider());
  }, [dispatch, alert, error, isDeleted]);
  return (
    <Layout title="Slider">
      {loading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage">
          <Link
            to="/admin/slider/new"
            style={{
              textDecoration: "none",
              background: "#1976d2",
              color: "#fff",
              padding: "10px 25px",
            }}
          >
            Add New Slider
          </Link>
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

export default SlideShow;
