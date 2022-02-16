export const apiUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5000/api/v1"
    : "https://calm-reaches-17604.herokuapp.com/api/v1";
