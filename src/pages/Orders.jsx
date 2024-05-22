import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Select, Spin } from "antd";
import { getOrder } from "../slice/OrderSlice";
import { toast } from "react-toastify";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import { BsCheckCircleFill } from "react-icons/bs";
import { RxCrossCircled } from "react-icons/rx";
import "./Order.css"; // Import the CSS file

const { Option } = Select;

const MyTable = () => {
  const { orders, isLoading } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrder());
  }, []);
  const [filterOptions, setFilterOptions] = useState([]);

  useEffect(() => {
    // Extract unique status values from orders and set filterOptions state
    console.log("All Orders:", orders);
    console.log("Filtered Orders:", filteredOrders);
    console.log("Table Data:", tableData);
    const uniqueStatusOptions = Array.from(
      new Set(orders.map((order) => order.status))
    );
    setFilterOptions(uniqueStatusOptions);
  }, [orders]);

  // ... (Other code, including the column configuration)

  // Filter orders based on the status "cancel"
  const filteredOrders = orders.filter((order) => order.status);

  const tableData = filteredOrders.map((order) => [
    order?.user?.name,
    order?.user?.email,
    order?.phone,
    order?.status,
    order?.shippingAddress1,
    order?.city,
    // Add other data for the remaining columns
  ]);
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "deliverd",
    "cancel",
  ]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(
        `http://192.168.0.103:5001/groceries/orderUpdate`,
        {
          _id: orderId,
          status: value,
        }
      );
      toast.success("Order Status Update");
      dispatch(getOrder());
    } catch (error) {
      console.log(error);
    }
  };

  const confirmPayment = async (orderId, value) => {
    try {
      const { data } = await axios.put(
        `http://192.168.0.103:5001/groceries/paymentupdate/${orderId}`,
        {
          paymentStatus: value,
        }
      );
      if (value == true) {
        return toast.success("Payment Add Total Earning");
      }
      if (value == false) {
        return toast.success("Payment Remove Total Earning");
      }

      dispatch(getOrder());
    } catch (error) {
      console.log(error);
    }
  };

  const refundPayment = async (orderId) => {
    try {
      const { data } = await axios.post(
        `http://192.168.0.103:5001/groceries/refundpayment/${orderId}`
      );
      toast.success("Refund user Payment");
      dispatch(getOrder());
    } catch (error) {
      console.log(error);
    }
  };

  const [expandedRows, setExpandedRows] = useState([]);

  const handleRowExpand = (
    currentRowsExpanded,
    allRowsExpanded,
    rowsExpanded
  ) => {
    setExpandedRows(rowsExpanded);
  };

  const columns = [
    {
      name: "name",
      label: "Name",
      options: {
        filter: true,
        sort: false,
        customHeadLabelRender: () => (
          <span style={{ fontWeight: "bold", color: "black", fontSize: 15 }}>
            NAME
          </span>
        ),
        customBodyRenderLite: (dataIndex) => {
          let name = orders[dataIndex]?.user?.name;
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
      label: "Email",
      options: {
        filter: true,
        sort: false,
        customHeadLabelRender: () => (
          <span style={{ fontWeight: "bold", color: "black", fontSize: 15 }}>
            EMAIL
          </span>
        ),
        customBodyRenderLite: (dataIndex) => {
          let email = orders[dataIndex]?.user?.email;
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
      name: "phone",
      label: "Phone No",
      options: {
        filter: true,
        sort: false,
        customHeadLabelRender: () => (
          <span style={{ fontWeight: "bold", color: "black", fontSize: 15 }}>
            Phone No
          </span>
        ),
        customBodyRenderLite: (dataIndex) => {
          let phone = orders[dataIndex]?.phone;

          return (
            <span
              style={{
                color: "black",
                fontSize: 14,
                marginLeft: 10,
                fontWeight: 500,
              }}
            >
              {phone}
            </span>
          );
        },
      },
    },
    // ... (Other columns)

    {
      name: "status",
      label: "Status",
      options: {
        filter: true,
        sort: false,
        customHeadLabelRender: () => (
          <span style={{ fontWeight: "bold", color: "black", fontSize: 15 }}>
            STATUS
          </span>
        ),
        customBodyRenderLite: (dataIndex) => {
          const order = filteredOrders[dataIndex];
          return (
            <span
              style={{
                color: "black",
                fontSize: 14,
                marginLeft: 10,
                fontWeight: 500,
              }}
            >
              <Select
                bordered={false}
                onChange={(value) => handleChange(order._id, value)}
                value={order.status} // Set the current value to the status of the current order
              >
                {status.map((s, i) => (
                  <Option key={i} value={s}>
                    {s}
                  </Option>
                ))}
              </Select>
            </span>
          );
        },
      },
    },

    {
      name: "shippingAddress1",
      label: "Address",
      options: {
        filter: true,
        sort: false,
        customHeadLabelRender: () => (
          <span style={{ fontWeight: "bold", color: "black", fontSize: 15 }}>
            ADDRESS
          </span>
        ),
        customBodyRenderLite: (dataIndex) => {
          let address = orders[dataIndex]?.shippingAddress1;
          return (
            <span
              style={{
                color: "black",
                fontSize: 14,
                marginLeft: 10,
                fontWeight: 500,
              }}
            >
              {address}
            </span>
          );
        },
      },
    },
    {
      name: "city",
      label: "City",
      options: {
        filter: true,
        sort: false,
        customHeadLabelRender: () => (
          <span style={{ fontWeight: "bold", color: "black", fontSize: 15 }}>
            CITY
          </span>
        ),
        customBodyRenderLite: (dataIndex) => {
          let city = orders[dataIndex]?.city;
          return (
            <span
              style={{
                color: "black",
                fontSize: 14,
                marginLeft: 10,
                fontWeight: 500,
              }}
            >
              {city}
            </span>
          );
        },
      },
    },
    {
      name: "detail",
      label: "Detail",
      options: {
        filter: false,
        sort: false,
        customHeadLabelRender: () => (
          <span style={{ fontWeight: "bold", color: "black", fontSize: 15 }}>
            DETAIL
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
              <Link to={`/detail/${orders[dataIndex]?._id}`}>View Details</Link>
            </span>
          );
        },
      },
    },
    {
      name: "ACTIONS",
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
          const orderId = orders[dataIndex]._id;
          return (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                {!orders[dataIndex].paymentIntentId ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      flexDirection: "row",
                    }}
                  >
                    <BsCheckCircleFill
                      onClick={() => confirmPayment(orderId, true)}
                      size={22}
                      color={
                        orders[dataIndex].paymentStatus === true
                          ? "green"
                          : "red"
                      }
                    />
                    <div style={{ marginLeft: 20 }}>
                      <RxCrossCircled
                        onClick={() => confirmPayment(orderId, false)}
                        size={22}
                        color="red"
                      />
                    </div>
                  </div>
                ) : null}

                {orders[dataIndex].paymentIntentId ? (
                  <HiOutlineReceiptRefund
                    onClick={() => refundPayment(orderId)}
                    size={22}
                    color={
                      orders[dataIndex].status === "Refunded" ? "green" : "red"
                    }
                  />
                ) : null}
              </div>
            </>
          );
        },
      },
    },
  ];

  const options = {
    filterType: "dropdown",
    responsive: "vertical",
    selectableRows: "none",
    download: false,
    search: false,
    expandableRows: true,
    expandableRowsHeader: false,
    expandableRowsOnClick: false,
    isRowExpandable: (dataIndex) => true,
    rowsExpanded: expandedRows,
    onRowExpansionChange: handleRowExpand,
    renderExpandableRow: (rowData, rowMeta) => {
      const colSpan = rowData.length + 1;
      const dataIndex = rowMeta.dataIndex;
      const order = orders[dataIndex];

      const products = order.orderItems.map((item) => ({
        image: item?.product?.image,
        title: item?.product?.title,
        quantity: item?.quantity,
        price: item?.product?.price,
        size: item?.product?.size,
      }));
      return (
        <tr>
          <td colSpan={colSpan}>
            <MUIDataTable
              title=""
              data={products}
              columns={[
                // Columns for the expanded row table
                {
                  name: "image",
                  label: "Image",
                  options: {
                    filter: false,
                    sort: false,
                    empty: true,
                    customHeadLabelRender: () => (
                      <span
                        style={{
                          fontWeight: "bold",
                          color: "black",
                          fontSize: 15,
                        }}
                      ></span>
                    ),
                    customBodyRenderLite: (dataIndex) => {
                      return <></>;
                    },
                  },
                },
                {
                  name: "image",
                  label: "Image",
                  options: {
                    filter: false,
                    sort: false,
                    empty: true,
                    customHeadLabelRender: () => (
                      <span
                        style={{
                          fontWeight: "bold",
                          color: "black",
                          fontSize: 15,
                        }}
                      >
                        IMAGE
                      </span>
                    ),
                    customBodyRenderLite: (dataIndex) => {
                      return (
                        <img
                          src={products[dataIndex].image}
                          alt={`Image for ID `}
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
                      <span
                        style={{
                          fontWeight: "bold",
                          color: "black",
                          fontSize: 15,
                        }}
                      >
                        TITLE
                      </span>
                    ),
                    customBodyRenderLite: (dataIndex) => {
                      let title = products[dataIndex]?.title;
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
                  name: "price",
                  label: "Price",
                  options: {
                    filter: true,
                    sort: true,
                    customHeadLabelRender: () => (
                      <span
                        style={{
                          fontWeight: "bold",
                          color: "black",
                          fontSize: 15,
                        }}
                      >
                        PRICE
                      </span>
                    ),
                    customBodyRenderLite: (dataIndex) => {
                      let price = products[dataIndex]?.price;
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
                      <span
                        style={{
                          fontWeight: "bold",
                          color: "black",
                          fontSize: 15,
                        }}
                      >
                        SIZE
                      </span>
                    ),
                    customBodyRenderLite: (dataIndex) => {
                      let size = products[dataIndex]?.size;
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
                  name: "quantity",
                  label: "Quantity",
                  options: {
                    filter: true,
                    sort: true,
                    customHeadLabelRender: () => (
                      <span
                        style={{
                          fontWeight: "bold",
                          color: "black",
                          fontSize: 15,
                        }}
                      >
                        QUANTITY
                      </span>
                    ),
                    customBodyRenderLite: (dataIndex) => {
                      let quantity = products[dataIndex]?.quantity;
                      return (
                        <span
                          style={{
                            color: "black",
                            fontSize: 14,
                            marginLeft: 10,
                            fontWeight: 500,
                          }}
                        >
                          {quantity}
                        </span>
                      );
                    },
                  },
                },
                {
                  name: "total",
                  label: "Total",
                  options: {
                    filter: true,
                    sort: true,
                    customHeadLabelRender: () => (
                      <span
                        style={{
                          fontWeight: "bold",
                          color: "black",
                          fontSize: 15,
                        }}
                      >
                        TOTAL (PR * QTY)
                      </span>
                    ),
                    customBodyRenderLite: (dataIndex) => {
                      let total =
                        products[dataIndex]?.price *
                        products[dataIndex]?.quantity;
                      return (
                        <span
                          style={{
                            color: "black",
                            fontSize: 14,
                            marginLeft: 10,
                            fontWeight: 500,
                          }}
                        >
                          {total}
                        </span>
                      );
                    },
                  },
                },
              ]}
              options={{
                download: true,
                print: true,
                search: false,
                filter: true,
                viewColumns: false,
                selectableRows: "none",
                pagination: true,
                responsive: "standard",
              }}
            />
          </td>
        </tr>
      );
    },
  };
  var titleStyle = {
    color: "black",
    fontSize: "24px",
    fontWeight: "bold",
  };
  const tableStyle = {
    margin: "40px 20px 20px 20px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  };
  return (
    <div style={{ margin: "40px 20px 20px 20px" }}>
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
          title={<span style={titleStyle}>{"All Orders"}</span>}
          columns={columns}
          data={tableData}
          options={options}
        />
      )}
    </div>
  );
};

export default MyTable;
