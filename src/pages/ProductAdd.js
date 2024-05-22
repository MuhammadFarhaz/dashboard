import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Button } from "@mui/material";
import axios from "axios";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function ProductAdd() {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState();
  const [size, setSize] = useState("");
  const [stock, setStock] = useState("");
  const [costPrice, setCostPrice] = useState("");
  const [prePrice, setPrePrice] = useState();
  const [deal, setDeal] = useState();


  const [category, setCategory] = useState("");
  const [description, setDiscription] = useState("");
  const [image, setImage] = useState(null);

  console.log(image);

  const addData = async () => {
    const formData = new FormData();

    if (
      !title ||
      !image ||
      !category ||
      !size ||
      !price ||
      !stock ||
      !description
    ) {
      return toast.error("Please Enter a all data");
    }
    if (stock < 1) {
      return toast.error("please Enter a valid stock");
    }
    formData.append("title", title);
    formData.append("price", price);
    formData.append("image", image);
    formData.append("category", category);
    formData.append("size", size);
    formData.append("stock", stock);
    formData.append("prevPrice", prePrice || 0);
    formData.append("deal", deal);
    formData.append("description", description);
    console.log("formData",formData)
    try {
      const userData = await axios.post(
        "http://localhost:5001/groceries/createGroceries",
        formData
      );
      console.log("userData", userData);
      toast.success("New Product add successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <Box display="flex" justifyContent="center" mt="10%">
        <Grid
          container
          width={"70%"}
          justifyContent={"center"}
          spacing={5}
          style={{ backgroundColor: "white", borderRadius: 20 }}
          boxShadow={10}
          p={5}
          sx={{
            padding: 0,
            width: "80%",
            marginLeft: "3%",
            paddingRight: "2%",
          }}
        >
          <Grid item xs={12} sm={12}>
            <Typography
              sx={{ justifyContent: "center", display: "flex", mt: 5 }}
              fontSize={24}
              id="tableTitle"
              component="div"
              fontWeight={"bold"}
            >
              Add Product
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="title"
              name="title"
              label="Title"
              fullWidth
              autoComplete="given-name"
              variant="standard"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="price"
              name="price"
              label="Price"
              inputProps={{ inputMode: "numeric" }}
              fullWidth
              autoComplete="family-name"
              variant="standard"
              value={price}
              type="number"
              onChange={(e) => setPrice(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="size"
              name="size"
              label="Size"
              fullWidth
              autoComplete="given-name"
              variant="standard"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="category"
              name="category"
              label="Category"
              fullWidth
              autoComplete="given-name"
              variant="standard"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="stock"
              name="stock"
              label="Stock"
              fullWidth
              autoComplete="given-name"
              variant="standard"
              type="number"
              inputProps={{ min: 0 }}
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="description"
              name="description"
              label="Description"
              fullWidth
              autoComplete="given-name"
              variant="standard"
              value={description}
              multiline
              maxRows={4}
              onChange={(e) => setDiscription(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={6} mt={2.2}>
            <input
              accept="image/*"
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="prePrice"
              name="prePrice"
              label="Previous Price"
              fullWidth
              autoComplete="given-name"
              variant="standard"
              type="number"
              inputProps={{ min: 0 }}
              value={prePrice}
              onChange={(e) => setPrePrice(e.target.value)}
            />
          </Grid>
          {
            prePrice > 0 && <Grid item xs={12} sm={12}>
              <TextField
                required
                id="deal"
                name="deal"
                label="Deal No"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                type="number"
                inputProps={{ min: 0 }}
                value={deal}
                onChange={(e) => setDeal(e.target.value)}
              />
            </Grid>
          }


          <Box my={10} py={10}>
            <Button
              variant="contained"
              onClick={() => addData()}
              style={{
                backgroundColor: "#ffbf00",
                color: "#ffffff",
                padding: 8,
                borderRadius: 10,
              }}
            >
              Add Product
            </Button>
          </Box>
        </Grid>
      </Box>
    </React.Fragment>
  );
}
