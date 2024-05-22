import React, { useState, useEffect } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Button from "./Button";
import { useStateContext } from "../contexts/ContextProvider";
import { getUser } from "../slice/CurrentUserSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const UserProfile = ({ setUser }) => {
  const { currentColor } = useStateContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true); // Assuming users are initially loading

  useEffect(() => {
    dispatch(getUser());
  }, []);
  // logout

  // const logoutAccount = async () => {
  //   try {
  //     const dataUser = await axios.get(
  //       "https://wild-rose-haddock-kilt.cyclic.app/auth/logout"
  //     );

  //     console.log("logout", dataUser);
  //     if (dataUser) {
  //       await localStorage.setItem("auth", false);
  //       navigate("/login", { replace: true });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const logoutAccount = async () => {
    try {
      const dataUser = await axios.get(
        "http://192.168.0.103:5001/auth/logout"
      );
      console.log("logout", dataUser);
      setUser(false);

      if (dataUser) {
        await localStorage.setItem("auth", false);
        setUser(false);
        setIsLoading(false); 
        navigate("/login", { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">User Profile</p>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      {[users]?.map((item) => (
        <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
          <img
            className="rounded-full h-24 w-24"
            src={item?.avatar?.url}
            alt="user-profile"
          />
          <div>
            <p className="font-semibold text-xl dark:text-gray-200">
              {item?.name}
            </p>
            <p className="text-gray-500 text-sm dark:text-gray-400">
              {" "}
              Administrator{" "}
            </p>
            <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">
              {item?.email}{" "}
            </p>
          </div>
        </div>
      ))}
      <div className="mt-5">
        <button
          type="button"
          onClick={() => logoutAccount()}
          style={{
            backgroundColor: "#ffbf00",
            color: "white",
            borderRadius: "10px",
          }}
          className={` text-${16} p-3 w-${"full"} hover:drop-shadow-xl hover:bg-${"white"}`}
        >
          {MdOutlineCancel} {"Logout"}
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
