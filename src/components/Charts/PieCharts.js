import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

function Piechart({ total, refund, net }) {
  const colors = ["#f90000", "#00425A", "#1F8A70"]; // Define your desired colors here
  const tooltipColor = "red"; // Define your desired tooltip color here

  return (
    <React.Fragment>
      <Chart
        type="pie"
        width="100%"
        height={1000}
        series={[parseFloat(total), parseFloat(refund), parseFloat(net)]}
        options={{
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: "100%",
                },
                legend: {
                  position: "bottom",
                },
              },
            },
          ],
          noData: {
            text: "Empty Data",
          },
          labels: ["Total Earning", "Refund Payment", "Net Payment"],
          tooltip: {
            theme: "dark",
            style: {
              fontSize: "12px",
              color: tooltipColor,
            },
          },
          colors: colors,
        }}
      />
    </React.Fragment>
  );
}

export default Piechart;
