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

export default function UpdateProduct() {
  const { id } = useParams();

  const [stock, setStock] = useState("");

  const addData = async () => {
    const formData = new FormData();
    if (stock < 1) {
      return toast.error("Please Enter a valid stock");
    }
    // Append the registration data to the FormData object
    formData.append("stock", stock);
    try {
      console.log(id);
      const userData = await axios.put(
        `http://192.168.0.103:5001/groceries/updateGroceries/${id}`,
        formData
      );
      console.log("userData", userData);
      toast.success("Update Stock successfully!");
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
            width: "40%",
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
              color={"black"}
            >
              Update Grocery (Stock)
            </Typography>
          </Grid>

          <Grid item xs={12} sm={12}>
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
          <Box my={10}>
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
              Update Stock
            </Button>
          </Box>
        </Grid>
      </Box>
    </React.Fragment>
  );
}
