import * as React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { getAuth } from "../slice/AuthSlice";
import { useSelector, useDispatch } from "react-redux";
import { MdDelete } from "react-icons/md";
import MUIDataTable from "mui-datatables";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import { toast } from "react-toastify";
import { Spin } from "antd";

const rowsPerPageOptions = [10, 25, 50, 100]; // Set the desired page size options

const options = {
  responsive: "Standard",
  selectableRows: "none",
  search: false,
  download: false,
  rowsPerPageOptions,
  customBodyRender: (value) => (
    <div style={{ textAlign: "center" }}>{value}</div>
  ),
};

export default function Customers() {
  const [list, setList] = useState([]);

  const dispatch = useDispatch();
  const { auths, isLoading } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getAuth());
  }, []);
  console.log("auths", auths);
  const deleteData = async (id, currentBlockedStatus) => {
    try {
      console.log(id);

      // Toggle the blocked status
      const updatedBlockedStatus = !currentBlockedStatus;

      const dataProducts = await axios.put(
        `http://localhost:5001/auth/updateUser/${id}`,
        {
          blocked: updatedBlockedStatus, // Use the updated blocked status
        }
      );
      console.log("dataproducts", dataProducts);
      setList([dataProducts?.data]);
      toast.success(
        updatedBlockedStatus ? "Blocked Customer" : "Unblocked Customer"
      );
      await dispatch(getAuth());
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      name: "IMAGE",
      label: "Profile Image",
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
              src={auths[dataIndex]?.avatar?.url}
              alt={`Image for ID ${auths[dataIndex]._id}`}
              style={{ width: "50px", height: "50px", borderRadius: 100 }}
            />
          );
        },
      },
    },

    {
      name: "_id",
      label: "Customer Id",
      options: {
        filter: true,
        sort: true,
        customHeadLabelRender: () => (
          <span style={{ fontWeight: "bold", color: "black", fontSize: 15 }}>
            CUSTOMER ID
          </span>
        ),
        customBodyRenderLite: (dataIndex) => {
          let id = auths[dataIndex]?._id;
          return (
            <span
              style={{
                color: "black",
                fontSize: 14,
                marginLeft: 10,
                fontWeight: 500,
              }}
            >
              {id}
            </span>
          );
        },
      },
    },
    {
      name: "name",

      options: {
        filter: true,
        sort: true,
        customHeadLabelRender: () => (
          <span style={{ fontWeight: "bold", color: "black", fontSize: 15 }}>
            NAME
          </span>
        ),
        customBodyRenderLite: (dataIndex) => {
          let name = auths[dataIndex]?.name;
          return (
            <span
              style={{
                color: "black",
                fontSize: 14,
                marginLeft: 10,
                fontWeight: 500,
              }}
            >
              {name}
            </span>
          );
        },
      },
    },
    {
      name: "email",

      options: {
        filter: true,
        sort: true,
        customHeadLabelRender: () => (
          <span style={{ fontWeight: "bold", color: "black", fontSize: 15 }}>
            EMAIL
          </span>
        ),
        customBodyRenderLite: (dataIndex) => {
          let email = auths[dataIndex]?.email;
          return (
            <span
              style={{
                color: "black",
                fontSize: 14,
                marginLeft: 10,
                fontWeight: 500,
              }}
            >
              {email}
            </span>
          );
        },
      },
    },
    {
      name: "DELETE",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customHeadLabelRender: () => (
          <span style={{ fontWeight: "bold", color: "black", fontSize: 15 }}>
            ACTIONS
          </span>
        ),
        customBodyRenderLite: (dataIndex) => {
          const item = auths[dataIndex];
          const itemId = item?._id;
          const isBlocked = item?.blocked;

          const deleteItem = () => {
            // Implement your delete logic here
            deleteData(itemId, isBlocked);
          };

          const buttonColor = isBlocked ? "red" : "green";
          return (
            <button onClick={deleteItem} style={{ color: buttonColor }}>
              {isBlocked ? "Unblock" : "Block"}
            </button>
          );
        },
      },
    },
  ];
  const theme = createTheme({
    overrides: {
      // Customize the title color
      // Add a
      MUIDataTableHeadCell: {
        sortAction: {
          fontSize: 17,
          fontWeight: "bolder",
          color: "#284D73",
          fontFamily: "Helvetica",
          "&:hover": {
            color: "blue",
            fontFamily: "Helvetica",
          },
        },
        fontSize: 17,
        fontWeight: "bolder",
        color: "#536DFE",
      },

      MuiTableBody: {
        root: {
          margin: 20,
        },
      },
      MuiTableCell: {
        head: {
          backgroundColor: "#F4F5F8 !important",
          padding: 3,
          paddingLeft: 15,
          border: "none",
        },
        root: {
          fontFamily: "Helvetica",
          fontSize: 15,
        },
      },

      MuiTable: {
        root: {
          marginLeft: 30,
          maxWidth: "95%",
          minWidth: 600,
          border: "none",
        },
      },
      MuiTableHead: {
        root: {
          marginTop: 50,
        },
      },
    },
  });
  const titleStyle = {
    color: "black", // Set your desired title color
    fontSize: "22px",
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
          title={<span style={titleStyle}>{"All Customers"}</span>}
          data={auths}
          columns={columns}
          options={options}
        />
      )}
    </div>
  );
}
