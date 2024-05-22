import React from "react";
import MUIDataTable from "mui-datatables";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "../slice/GetSlice";
import IconButton from "@material-ui/core/IconButton";
import axios from "axios";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { Spin } from "antd";

const rowsPerPageOptions = [10, 25, 50, 100]; // Set the desired page size options

const options = {
  responsive: "Standard",
  selectableRows: "none",
  rowsPerPageOptions,
  customBodyRender: (value) => (
    <div style={{ textAlign: "center", color: "red", backgroundColor: "red" }}>
      {value}
    </div>
  ),
  search: false,
  filter: true,
  download: false,
};
export default function AllProducts() {
  const dispatch = useDispatch();
  const [list, setList] = useState([]);
  const { posts, isLoading } = useSelector((state) => state.post);
  console.log("posts", posts);
  useEffect(() => {
    dispatch(getPost());
  }, []);

  //
  const useStyles = makeStyles({
    tableRow: {
      fontSize: "2px",
      // Adjust the value to your desired font size
    },
  });
  const columns = [
    {
      name: "IMAGE",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customHeadLabelRender: () => (
          <span style={{ fontWeight: "bold", color: "black", fontSize: 15 }}>
            IMAGE
          </span>
        ),
        customBodyRenderLite: (dataIndex) => {
          return (
            <img
              src={posts[dataIndex]?.image}
              alt={`Image for ID ${posts[dataIndex].id}`}
              style={{ width: "50px", height: "50px" }}
            />
          );
        },
      },
    },
    {
      name: "title",
      label: "Title",
      options: {
        filter: true,
        sort: true,
        customHeadLabelRender: () => (
          <span style={{ fontWeight: "bold", color: "black", fontSize: 15 }}>
            TITLE
          </span>
        ),
        customBodyRenderLite: (dataIndex) => {
          let title = posts[dataIndex]?.title;
          return (
            <span
              style={{
                color: "black",
                fontSize: 14,
                marginLeft: 10,
                fontWeight: 500,
              }}
            >
              {title}
            </span>
          );
        },
      },
    },
    {
      name: "category",
      label: "Category",
      options: {
        filter: true,
        sort: true,
        customHeadLabelRender: () => (
          <span style={{ fontWeight: "bold", color: "black", fontSize: 15 }}>
            CATEGORY
          </span>
        ),
        customBodyRenderLite: (dataIndex) => {
          let category = posts[dataIndex]?.category;
          return (
            <span
              style={{
                color: "black",
                fontSize: 14,
                marginLeft: 10,
                fontWeight: 500,
              }}
            >
              {category}
            </span>
          );
        },
      },
    },
    {
      name: "price",
      label: "Price",
      options: {
        filter: true,
        sort: true,
        customHeadLabelRender: () => (
          <span style={{ fontWeight: "bold", color: "black", fontSize: 15 }}>
            PRICE
          </span>
        ),
        customBodyRenderLite: (dataIndex) => {
          let price = posts[dataIndex]?.price;
          return (
            <span
              style={{
                color: "black",
                fontSize: 14,
                marginLeft: 10,
                fontWeight: 500,
              }}
            >
              {price}
            </span>
          );
        },
      },
    },
    {
      name: "size",
      label: "Size",
      options: {
        filter: true,
        sort: true,
        customHeadLabelRender: () => (
          <span style={{ fontWeight: "bold", color: "black", fontSize: 15 }}>
            SIZE
          </span>
        ),
        customBodyRenderLite: (dataIndex) => {
          let size = posts[dataIndex]?.size;
          return (
            <span
              style={{
                color: "black",
                fontSize: 14,
                marginLeft: 10,
                fontWeight: 500,
              }}
            >
              {size}
            </span>
          );
        },
      },
    },
    {
      name: "stock",
      label: "Stock",
      options: {
        filter: true,
        sort: true,
        customHeadLabelRender: () => (
          <span style={{ fontWeight: "bold", color: "black", fontSize: 15 }}>
            STOCK
          </span>
        ),
        customBodyRenderLite: (dataIndex) => {
          let stock = posts[dataIndex]?.stock;
          return (
            <span
              style={{
                color: "black",
                fontSize: 14,
                marginLeft: 10,
                fontWeight: 500,
              }}
            >
              {stock}
            </span>
          );
        },
      },
    },
    {
      name: "update",
      label: "Detail",
      options: {
        filter: false,
        sort: false,
        customHeadLabelRender: () => (
          <span style={{ fontWeight: "bold", color: "black", fontSize: 15 }}>
            ACTION
          </span>
        ),
        customBodyRenderLite: (dataIndex) => {
          return (
            <span
              style={{
                color: "black",
                fontSize: 14,
                marginLeft: 10,
                fontWeight: 500,
              }}
            >
              <Link to={`/update/${posts[dataIndex]?._id}`}>View Details</Link>
            </span>
          );
        },
      },
    },
  ];
  const titleStyle = {
    color: "black", // Set your desired title color
    fontSize: "24px",
    fontWeight: "bold",
    // Set your desired title font size
    // Add any other desired styles
  };
  const tableStyle = {
    margin: "40px 20px 20px 20px",

    // Set the desired margin value
  };

  return (
    <div style={tableStyle}>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            marginTop: "5%",
          }}
        >
          <Spin size="large" />
        </div>
      ) : (
        <MUIDataTable
          title={<span style={titleStyle}>{"All Product"}</span>}
          data={posts}
          columns={columns}
          options={options}
        />
      )}
    </div>
  );
}
