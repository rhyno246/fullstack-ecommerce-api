import Layout from './Layout';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
const SlideShow = () => {
    const columns = [
        { field: "id", headerName: "Slider ID", minWidth: 200, flex: 0.5 },
        {
            field: "image",
            headerName: "Image",
            minWidth: 250,
            flex: 1,
        },
        {
            field: "heading",
            headerName: "Heading",
            minWidth: 150,
            flex: 1
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
                        <EditIcon />
                        <Button>
                            <DeleteIcon />
                        </Button>
                    </>
                );
            },
        },
    ];
    const rows = [];
    return <Layout title="Slider">
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
    </Layout>;
};

export default SlideShow;
