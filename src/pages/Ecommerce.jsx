import React from "react";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import {
  MdOutlineSupervisorAccount,
  MdProductionQuantityLimits,
} from "react-icons/md";
import { AiOutlineStock, AiOutlineShoppingCart } from "react-icons/ai";
import { BsBoxSeam } from "react-icons/bs";

import Piechart from "../../src/components/Charts/PieCharts";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getPost } from "../slice/GetSlice";
import { getAuth } from "../slice/AuthSlice";
import { getEarning } from "../slice/TotalEarningSlice";

const Ecommerce = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state?.post?.posts?.length);
  const { posts } = useSelector((state) => state?.post);
  const auths = useSelector((state) => state?.auth?.auths?.length);
  const orders = useSelector((state) => state?.order?.orders?.length);
  const earn = useSelector((state) => state?.earn?.earns);
  const outOfStockProducts = posts?.filter((product) => product.stock === 0);

  useEffect(() => {
    dispatch(getAuth());
    dispatch(getPost());
    dispatch(getEarning());
  }, []);

  return (
    <>
      <div className="mt-12 px-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Earnings */}
          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg object-cover w-full h-full rounded-xl h-44 rounded-xl w-full lg:w-100 p-4 pt-9  bg-hero-pattern bg-no-repeat bg-cover bg-right border border-gray-180 shadow-md">
            <p className="font-bold text-gray-400">Earnings</p>
            <p className="text-2xl">Pkr {earn?.totalEarnings}</p>
          </div>
          {/* Refunds Payment */}
          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-2xl ml:20 p-4 pt-9 border border-gray-300 shadow-md">
            <button
              type="button"
              style={{ color: "white", backgroundColor: "#ffbf00" }}
              className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl"
            >
              <HiOutlineReceiptRefund />
            </button>
            <p className="mt-3 text-lg font-semibold">Pkr {earn?.totalRefunds}</p>
            <p className="text-sm text-gray-400 mt-1">Refunds Payment</p>
          </div>

          {/* Net Earning */}
          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-2xl p-4 pt-9 border border-gray-180 shadow-md">
            <button
              type="button"
              style={{ color: "white", backgroundColor: "#ffbf00" }}
              className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl"
            >
              <BsBoxSeam />
            </button>
            <p className="mt-3 text-lg font-semibold">Pkr {earn?.netEarnings}</p>
            <p className="text-sm text-gray-400 mt-1">Net Earning</p>
          </div>

          {/* Customers */}
          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-2xl p-4 pt-9 border border-gray-180 shadow-md">
            <button
              type="button"
              style={{ color: "white", backgroundColor: "#ffbf00" }}
              className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl"
            >
              <MdOutlineSupervisorAccount />
            </button>
            <p className="mt-3 text-lg font-semibold">{auths}</p>
            <p className="text-sm text-gray-400 mt-1">Customers</p>
          </div>

          {/* Products */}
          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-2xl p-4 pt-9 border border-gray-180 shadow-md">
            <button
              type="button"
              style={{ color: "white", backgroundColor: "#ffbf00" }}
              className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl"
            >
              <MdProductionQuantityLimits />
            </button>
            <p className="mt-3 text-lg font-semibold">{products}</p>
            <p className="text-sm text-gray-400 mt-1">Products</p>
          </div>

          {/* Orders */}
          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-2xl p-4 pt-9 border border-gray-180 shadow-md">
            <button
              type="button"
              style={{ color: "white", backgroundColor: "#ffbf00" }}
              className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl"
            >
              <AiOutlineShoppingCart />
            </button>
            <p className="mt-3 text-lg font-semibold">{orders}</p>
            <p className="text-sm text-gray-400 mt-1">Orders</p>
          </div>

          {/* Out Of Stock Products */}
          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-2xl p-4 pt-9 border border-gray-180 shadow-md">
            <button
              type="button"
              style={{ color: "white", backgroundColor: "#ffbf00" }}
              className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl"
            >
              <AiOutlineStock />
            </button>
            <p className="mt-3 text-lg font-semibold">
              {outOfStockProducts.length}
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Out Of Stock ( Products )
            </p>
          </div>
        </div>

        {/* Total Earning Update */}
        <div className="mt-8">
          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-4 rounded-2xl border border-gray-180 shadow-md">
            <p className="font-semibold text-xl">Total Earning Update</p>
            <div className="flex mt-10 gap-10 flex-wrap justify-center">
              <div className="border-r-1 border-color pr-10">
                <div>
                  <p className="text-3xl font-semibold">
                    {earn?.totalEarnings}
                  </p>
                  <p className="text-gray-500 mt-1">Earning</p>
                </div>
                <div className="mt-8">
                  <p className="text-3xl font-semibold">
                    {earn?.totalRefunds}
                  </p>
                  <p className="text-gray-500 mt-1">Refund Payment</p>
                </div>
              </div>
              <div style={{ width: "70%" }}>
                <Piechart
                  total={earn?.totalEarnings}
                  refund={earn?.totalRefunds}
                  net={earn?.netEarnings}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ecommerce;
