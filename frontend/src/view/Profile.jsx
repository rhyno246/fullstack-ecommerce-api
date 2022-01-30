import { Avatar, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Layout from "../component/layout/Layout";
import MetaData from "../component/layout/MetaData";
import Loader from "../component/Loader";

const Profile = () => {
  const { users, loading } = useSelector((state) => state.user);
  return (
    <Layout>
      <MetaData title={`Profile - ${users?.name}`} />
      {loading ? (
        <Loader />
      ) : (
        <Container>
          <Box>
            <Typography sx={{ fontSize: "30px", textAlign: "center" }}>
              {users?.name}
            </Typography>
            <Avatar
              alt="Remy Sharp"
              src={users?.avatar?.url}
              sx={{ width: 130, height: 130, margin: "20px auto" }}
            />
          </Box>
          <Box sx={{ maxWidth: "400px", marginX: "auto" }}>
            <Link className="custom-link" to="/me/update">
              Edit Profile
            </Link>
            <Link className="custom-link" to="/password/update">
              Change Password
            </Link>
            <div className="group-text" style={{ marginBottom: "20px" }}>
              <h4
                className="heading"
                style={{ margin: "5px 0", fontSize: "20px" }}
              >
                Full Name
              </h4>
              <div className="text">{users?.name}</div>
            </div>
            <div className="group-text">
              <h4
                className="heading"
                style={{ margin: "5px 0", fontSize: "20px" }}
              >
                Email
              </h4>
              <div className="text">{users?.email}</div>
            </div>
          </Box>
        </Container>
      )}
    </Layout>
  );
};

export default Profile;
