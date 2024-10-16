import { auth } from "@/lib/firebase";
import Image from "next/image";
import React, { useEffect } from "react";
import avatar from "../../../assets/avatar.jpg";
import { useSelector } from "react-redux";
import { RootState } from "@/Store/store";
import { fetchUserPlan } from "@/Feature/User/userSlice";
import { useAppDispatch } from "@/hook/useAppDispatch";

const UserInfo = () => {
  const dispatch = useAppDispatch();
  const { data } = useSelector((state: RootState) => state.user);
  useEffect(() => {
    dispatch(fetchUserPlan());
  }, []);
  console.log(data);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center space-x-6">
        <div>
          <Image
            src={auth?.currentUser?.photoURL || avatar}
            alt="Profile Picture"
            width={100}
            height={100}
            className="rounded-full"
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold">
            {auth?.currentUser?.displayName}
          </h1>
          <p>Plan name: {data?.plan?.planName}</p>
          <p>Plan Start Date: {data?.startDate}</p>
          <p>Plan Price: Rs {data?.plan?.planPrice}</p>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
