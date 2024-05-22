import React, { useRef, useState, useEffect } from "react";
import ReactToPrint from "react-to-print";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Typography,
  Paper,
  Grid,
  makeStyles,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: "#f5f5f5",
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: theme.spacing(1),
  },
}));

const OrderDeatil = () => {
  const componentRef = useRef();
  const classes = useStyles();

  const { id } = useParams();
  const [list, setList] = useState(null);

  const getDataDetail = async () => {
    try {
      const dataFilter = await axios.get(
        `http://192.168.0.103:5001/groceries/getOrderDetail/${id}`
      );
      console.log("data", dataFilter);
      setList([dataFilter?.data]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataDetail();
  }, []);
  console.log("list", list);
  const calculateTotal = (item) => {
    let total = 0;
    item?.orderItems?.map((it) => {
      total += it?.quantity * it?.product?.price;
    });
    return total >= 20 ? total : total + 1;
  };

  const listGenerate = list?.map((item) => {
    return item;
  });

  const generateOrderContent = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // Generate the order content as a string or JSX
    return (
      <Paper
        className={classes.root}
        style={{ margin: "2%", backgroundColor: "white" }}
      >
        <Typography
          variant="h6"
          className={classes.title}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            fontSize: 26,
            fontWeight: "bold",
          }}
        >
          Invoice Slip
        </Typography>
        {list?.map((item) => (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div className={classes.item}>
                <Typography style={{ fontWeight: "bold", color: "black" }}>
                  Invoice Number:
                </Typography>
                <Typography style={{ color: "black" }}>{item?._id}</Typography>
              </div>
              <div className={classes.item}>
                <Typography style={{ fontWeight: "bold", color: "black" }}>
                  Issue Date:
                </Typography>
                <Typography>{new Date().toLocaleString()}</Typography>
              </div>
              <div className={classes.item}>
                <Typography style={{ fontWeight: "bold", color: "black" }}>
                  Order ID:
                </Typography>
                <Typography>{item?._id}</Typography>
              </div>
              <div className={classes.item}>
                <Typography style={{ fontWeight: "bold", color: "black" }}>
                  Order Date:
                </Typography>
                <Typography>
                  {new Date(item?.dateOrdered).toLocaleString()}
                </Typography>
              </div>
              <div className={classes.item}>
                <Typography style={{ fontWeight: "bold", color: "black" }}>
                  Payment Status:
                </Typography>
                <Typography>
                  {item?.paymentStatus == false ? "Unpaid" : "Paid"}
                </Typography>
              </div>
            </Grid>
            <Typography
              variant="h6"
              className={classes.title}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                width: "100%",
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              Customer Detail
            </Typography>
            <Grid item xs={12}>
              <div className={classes.item}>
                <Typography style={{ fontWeight: "bold", color: "black" }}>
                  Customer:
                </Typography>
                <Typography style={{ color: "black" }}>
                  {item?.user?.name}
                </Typography>
              </div>
              <div className={classes.item}>
                <Typography style={{ fontWeight: "bold", color: "black" }}>
                  Email:
                </Typography>
                <Typography style={{ color: "black" }}>
                  {item?.user?.email}
                </Typography>
              </div>
              <div className={classes.item}>
                <Typography style={{ fontWeight: "bold", color: "black" }}>
                  Phone No:
                </Typography>
                <Typography style={{ color: "black" }}>
                  {item?.phone}
                </Typography>
              </div>{" "}
              <div className={classes.item}>
                <Typography style={{ fontWeight: "bold", color: "black" }}>
                  Address:
                </Typography>
                <Typography style={{ color: "black" }}>
                  {item?.shippingAddress1}
                </Typography>
              </div>
              <div className={classes.item}>
                <Typography style={{ fontWeight: "bold", color: "black" }}>
                  City & PostCode:
                </Typography>
                <Typography style={{ color: "black" }}>
                  {item?.city} & {item?.zip}
                </Typography>
              </div>
            </Grid>
            <TableContainer className={classes.tableContainer}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      style={{
                        fontWeight: "bold",
                        color: "black",
                        fontSize: 16,
                      }}
                    >
                      Product Id
                    </TableCell>
                    <TableCell
                      align="right"
                      style={{
                        fontWeight: "bold",
                        color: "black",
                        fontSize: 16,
                      }}
                    >
                      Title
                    </TableCell>
                    <TableCell
                      align="right"
                      style={{
                        fontWeight: "bold",
                        color: "black",
                        fontSize: 16,
                      }}
                    >
                      {" "}
                      Price
                    </TableCell>
                    <TableCell
                      align="right"
                      style={{
                        fontWeight: "bold",
                        color: "black",
                        fontSize: 16,
                      }}
                    >
                      Quantity
                    </TableCell>

                    <TableCell
                      align="right"
                      style={{
                        fontWeight: "bold",
                        color: "black",
                        fontSize: 16,
                      }}
                    >
                      Total
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {item?.orderItems?.map((show) => (
                    <TableRow>
                      <TableCell style={{ color: "black" }}>
                        {show?.product?._id}
                      </TableCell>
                      <TableCell align="right" style={{ color: "black" }}>
                        {show?.product?.title}
                      </TableCell>
                      <TableCell align="right" style={{ color: "black" }}>
                        {show?.product?.price}
                      </TableCell>
                      <TableCell align="right" style={{ color: "black" }}>
                        {show?.quantity}
                      </TableCell>

                      <TableCell align="right" style={{ color: "black" }}>
                        {show?.quantity * show?.product?.price}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={3} align="right">
                      Total
                    </TableCell>
                    <TableCell align="right">
                      {calculateTotal(item)} {"  ( Delivery Fee  "}
                      {calculateTotal(item) >= 1000 ? "Free )" : "Rs 100 )"}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignSelf: "center",
                width: "100%",
                marginTop: "2%",
              }}
            >
              <Typography style={{ fontWeight: "bold", color: "black" }}>
                If Any Query Please Contact Us :
              </Typography>
              <Typography style={{ fontWeight: "bold", color: "black" }}>
                {" "}
                04100000000 & +923147602590 (WhatsApp)
              </Typography>
            </div>
          </Grid>
        ))}
      </Paper>
    );
  };
  return (
    <div>
      {/* Your order content */}

      {/* Add a button to trigger printing */}

      {/* Hidden div containing the order content */}
      <div ref={componentRef}>{generateOrderContent()}</div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <ReactToPrint
          trigger={() => (
            <button
              style={{
                backgroundColor: "#ffbf00 ",
                color: "white",
                padding: 10,
                marginTop: 20,
                paddingLeft: 20,
                paddingRight: 20,
                borderRadius: 5,
              }}
            >
              Generate Slip
            </button>
          )}
          content={() => componentRef.current}
        />
      </div>
    </div>
  );
};

export default OrderDeatil;
