import React, { useEffect } from "react";
import avatar from "../../../assets/avatar.jpg";
import { useSelector } from "react-redux";
import { RootState } from "@/Store/store";
import { fetchReferrals } from "@/Feature/Refer/referSlice";
import { useAppDispatch } from "@/hook/useAppDispatch";
import Image from "next/image";

const Referrals = () => {
  const dispatch = useAppDispatch();
  const { data, loading: referralsLoading } = useSelector(
    (state: RootState) => state.refer
  );

  useEffect(() => {
    dispatch(fetchReferrals());
  }, [dispatch]);
  return (
    <>
      <h3 className="text-2xl font-semibold text-gray-800 mb-6 mt-12">
        Your Referrals
      </h3>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {referralsLoading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-40 bg-gray-200 rounded-lg"></div>
          </div>
        ) : data && data?.records?.length > 0 ? (
          data?.records.map((person, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-50"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                  <Image
                    src={avatar}
                    alt={person?.referredUser?.firstName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {person?.referredUser?.firstName}{" "}
                    {person?.referredUser?.lastName}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {person?.referredUser?.email}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Status:</span>
                  <span
                    className={`font-semibold ${
                      person?.isSuccessful ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {person?.isSuccessful ? "Successful" : "Pending"}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600 mt-2">
                  <span>Referral Date:</span>
                  <span className="font-semibold">
                    {new Date(person?.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-600">
            <h2 className="text-xl font-semibold">No Referrals Found</h2>
            <p className="mt-2 text-gray-500">
              Invite your friends to start earning rewards!
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Referrals;
