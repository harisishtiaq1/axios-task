import { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Container,
  Modal,
  Pagination,
  Stack,
} from "@mui/material";
import usePagination from "@mui/material/usePagination";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 500,
  bgcolor: "background.paper",
  borderColor: "white",
  boxShadow: 24,
  p: 4,
};

const App = () => {
  const [myData, setMyData] = useState([]);
  const [isError, setIsError] = useState("");
  const [imgCard, setImgCard] = useState();
  const [open, setOpen] = useState(false);
  const handleOpen = (url) => {
    setImgCard(url);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const getMyPostData = async () => {
    try {
      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/photos`
      );
      setMyData(res.data.slice(0, 500));
      console.log("data here", setMyData);
    } catch (error) {
      setIsError(error.message);
    }
  };

  useEffect(() => {
    getMyPostData();
  }, []);
  const [page, setPage] = useState(1);
  const PER_PAGE = 100;

  const count = Math.ceil(myData.length / PER_PAGE);
  const _DATA = usePagination(myData, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);

  };
  return (
    <>
      {isError !== "" && <h2>{isError}</h2>}
      <Container>
        <Grid container spacing={2} sx={{ display: "flex", mt: 2, mb: 2 }}>
          {myData.map((post, index) => {
            const { url, title } = post;

            return (
              <Grid item xs={3}>
                <Card sx={{ maxWidth: 300, height: "100%" }}>
                  <CardMedia
                    sx={{ height: 300 }}
                    id="image"
                    onClick={() => handleOpen(url)}
                    image={url}
                  />
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    closeAfterTransition
                  >
                    <CardMedia sx={style} image={imgCard} />
                  </Modal>
                  <CardContent>
                    <Typography
                      variant="p"
                      component="p"
                      color="text.secondary"
                    >
                      {title}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
        <Stack
          spacing={2}
          sx={{
            mt: 5,
            mb: 4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Pagination
            count={count}
            color="secondary"
            page={page}
            onChange={handleChange}
          />
        </Stack>
      </Container>
    </>
  );
};

export default App;
