import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { DatePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getSales } from "../slice/SaleSlice";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Spin } from "antd";

const { RangePicker } = DatePicker;

const Sales = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [selectedTab, setSelectedTab] = useState(0);
  const { sales, isLoading } = useSelector((state) => state.sale);

  useEffect(() => {
    dispatch(getSales());
  }, [dispatch]);

  useEffect(() => {
    setData(sales?.productSales || []);
    setTotalSales(calculateTotalSales(sales?.productSales || []));
  }, [sales]);

  const calculateTotalSales = (productSales) => {
    return productSales.reduce((total, sale) => total + sale.sales, 0);
  };

  const handleDateChange = (dates) => {
    // ... (previous code)

    const startDate = dates[0]?.startOf("day").toDate();
    const endDate = dates[1]?.endOf("day").toDate();

    // Update main sales data based on the date range
    const filteredSales = sales?.productSales.filter((sale) => {
      const saleDate = new Date(sale.dateOrdered);
      return saleDate >= startDate && saleDate <= endDate;
    });

    setData(filteredSales);
    setTotalSales(calculateTotalSales(filteredSales || []));

    // Update city-wise sales data based on the date range
    const filteredCitySales = sales?.citySales.map((citySale) => {
      const filteredSalesByCity = citySale.sales.filter((sale) => {
        const saleDate = new Date(sale.dateOrdered);
        return saleDate >= startDate && saleDate <= endDate;
      });

      return {
        ...citySale,
        totalSales: calculateTotalSales(filteredSalesByCity),
      };
    });
  };

  const options = {
    download: false,
    print: true,
    search: false,
    filter: true,
    viewColumns: false,
    selectableRows: "none",
    pagination: true,
    responsive: "standard",
  };

  const columns = [
    // {
    //   name: "_id",
    //   label: "ID",
    //   options: {
    //     filter: true,
    //     sort: true,
    //     customHeadLabelRender: () => (
    //       <span style={{ fontWeight: "bold", color: "black", fontSize: 15 }}>
    //         ID
    //       </span>
    //     ),
    //     customBodyRenderLite: (dataIndex) => {
    //       var actaulData = sales.productSales;

    //       let title = actaulData[dataIndex]?._id;
    //       return (
    //         <span
    //           style={{
    //             color: "black",
    //             fontSize: 14,
    //             marginLeft: 10,
    //             fontWeight: 500,
    //           }}
    //         >
    //           {title}
    //         </span>
    //       );
    //     },
    //   },
    // },
    {
      name: "product",
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
          var actaulData = sales.productSales;

          let title = actaulData[dataIndex]?.product;
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
          <span style={{ fontWeight: "bold", color: "black", fontSize: 15 }}>
            PRICE
          </span>
        ),
        customBodyRenderLite: (dataIndex) => {
          var actaulData = sales.productSales;

          let price = actaulData[dataIndex]?.price;
          return (
            <span
              style={{
                color: "black",
                fontSize: 14,
                marginLeft: 10,
                fontWeight: 500,
              }}
            >
              $ {price}
            </span>
          );
        },
      },
    },
    {
      name: "profit",
      label: "profit",
      options: {
        filter: true,
        sort: true,
        customHeadLabelRender: () => (
          <span style={{ fontWeight: "bold", color: "black", fontSize: 15 }}>
            Profit
          </span>
        ),
        customBodyRenderLite: (dataIndex) => {
          var actaulData = sales.productSales;

          let profit = actaulData[dataIndex]?.profit;
          return (
            <span
              style={{
                color: "black",
                fontSize: 14,
                marginLeft: 10,
                fontWeight: 500,
              }}
            >
              $ {profit}
            </span>
          );
        },
      },
    },
    {
      name: "sales",
      label: "Sales",
      options: {
        filter: true,
        sort: true,
        customHeadLabelRender: () => (
          <span style={{ fontWeight: "bold", color: "black", fontSize: 15 }}>
            Total Sales
          </span>
        ),
        customBodyRenderLite: (dataIndex) => {
          var actaulData = sales.productSales;

          let profir = actaulData[dataIndex]?.sales;
          return (
            <span
              style={{
                color: "black",
                fontSize: 14,
                marginLeft: 10,
                fontWeight: 500,
              }}
            >
              $ {profir}
            </span>
          );
        },
      },
    },
    {
      name: "dateOrdered",
      label: "Date",
      options: {
        filter: true,
        sort: true,
        customHeadLabelRender: () => (
          <span style={{ fontWeight: "bold", color: "black", fontSize: 15 }}>
            Date
          </span>
        ),
        customBodyRenderLite: (dataIndex) => {
          var actaulData = sales.productSales;

          let profir = actaulData[dataIndex]?.dateOrdered;
          return (
            <span
              style={{
                color: "black",
                fontSize: 14,
                marginLeft: 10,
                fontWeight: 500,
              }}
            >
              {profir}
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
        sort: true,
        customHeadLabelRender: () => (
          <span style={{ fontWeight: "bold", color: "black", fontSize: 15 }}>
            City
          </span>
        ),
        customBodyRenderLite: (dataIndex) => {
          var actaulData = sales.productSales;

          let city = actaulData[dataIndex]?.city;
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
  ];

  const titleStyle = {
    color: "black",
    fontSize: "24px",
    fontWeight: "bold",
  };

  const tableStyle = {
    margin: "40px 20px 20px 20px",
  };

  const citySalesData = sales?.citySales?.map((citySale) => [
    citySale.city,
    citySale.totalSales,
  ]);

  const citySalesColumns = ["City", "Total Sales"];

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  const options1 = {
    responsive: "Standard",
    selectableRows: "none",
    search: false,
    download: false,
    setCellProps: () => ({
      style: {
        padding: "8px", // Add padding to both header and data cells
      },
    }),
  };

  return (
    <div style={tableStyle}>
      {isLoading ? ( // Show spinner if isLoading is true
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Spin size="large" />
        </div>
      ) : selectedTab === 0 ? (
        <>
          <RangePicker onChange={handleDateChange} />

          <div style={{ marginBottom: 20, marginTop: 10 }}>{/* ... */}</div>
          <MUIDataTable
            title={
              <span style={titleStyle}>
                Total Sales Report ($ {totalSales})
              </span>
            }
            data={data}
            columns={columns}
            options={options1}
          />
        </>
      ) : // ) : (
      //   <>
      //     <MUIDataTable
      //       title={<span style={titleStyle}>All City Total Sales</span>}
      //       data={citySalesData}
      //       columns={citySalesColumns}
      //       options={options}
      //     />
      //   </>
      // )
      null}
    </div>
  );
};

export default Sales;
