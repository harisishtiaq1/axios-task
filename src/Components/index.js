import { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Container,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import haris from "./img/haris.jpeg";
const App = () => {
  const [myData, setMyData] = useState([]);
  const [isError, setIsError] = useState("");

  const getMyPostData = async () => {
    try {
      const res = await axios.get(
        "https://jsonplaceholder.typicode.com/photos"
      );
      setMyData(res.data);
      console.log("data here", res.data);
    } catch (error) {
      setIsError(error.message);
    }
  };

  useEffect(() => {
    getMyPostData();
  }, []);
  return (
    <>
      {isError !== "" && <h2>{isError}</h2>}
      <Container>
        <Grid container spacing={2} sx={{ display: "flex", mt: 2, mb: 2 }}>
          {/* {myData.slice(0, 100).map((post) => {
            const { url, title } = post;
            return (
              
            );
          })} */}
          <Grid item xs={3}>
            <Card sx={{ maxWidth: 300, height: "100%" }}>
              <CardMedia sx={{ height: 300 }} id="image" image={haris} />
              <CardContent>
                <Typography variant="p" component="p" color="text.secondary">
                  abcd1234
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <CardMedia
            sx={{ width: 500, height: 500 }}
            id="resizeImg"
            image={haris}
          />
          <CloseIcon sx={{ position: "fixed", right: 30, cursor: "pointer" }} />
        </Grid>
      </Container>
    </>
  );
};

export default App;
