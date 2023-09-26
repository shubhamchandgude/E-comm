import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
  colors,
} from "@mui/material";
import { Bolt } from "@mui/icons-material";

function Product() {
  const [apiData, setApiData] = useState([]);

  function getData() {
    axios
      .get("https://dummyjson.com/products")
      .then((responce) => {
        setApiData(responce.data);
        console.log(responce.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Box sx={{boxSizing:"border-box"}}>
        <Grid container>
          <Grid item md={12} display={"flex"} flexWrap={"wrap"}>
            {apiData?.products?.map((item) => {
              return (
                <>
                  <Card
                    sx={{
                      borderRadius: "5px",
                      height: "330px",
                      width: "330px",
                      marginLeft: "56px",
                      margin: 4,
                      backgroundColor: "#dbdbdb",
                    }}
                  >
                    <Typography sx={{paddingTop:2, fontWeight:"bold"}} variant="h6">{item.title}</Typography>
                    <Stack
                      justifyContent="center"
                      alignItems="center"
                      height="330px"
                    >
                      <img style={{paddingBottom:8}}
                        height={"200px"}
                        width={"280px"}
                        src={item.thumbnail}
                      />
                      <Button onClick={()=>{}}>Add Cart</Button>
                    </Stack>
                  </Card>
                </>
              );
            })}
          </Grid>
        </Grid>
      </Box> 
    </>
  );
}

export default Product;