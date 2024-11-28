import { fetchPlansHistory } from "@/Feature/Plan/planSlice";
import { useAppDispatch } from "@/hook/useAppDispatch";
import { RootState } from "@/Store/store";
import moment from "moment";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const PlanHistory = () => {
  const dispatch = useAppDispatch();
  const { planHistory, planHistoryLoading } = useSelector(
    (state: RootState) => state.plan
  );

  useEffect(() => {
    dispatch(fetchPlansHistory());
  }, [dispatch]);

  // Helper function to calculate status
  const calculateStatus = (startDate: string, endDate: string): string => {
    const now = moment();
    const start = moment(startDate);
    const end = moment(endDate);

    if (now.isBetween(start, end, undefined, "[]")) return "Active";
    if (now.isBefore(start)) return "Upcoming";
    return "Expired";
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-extrabold text-gray-900">Plan History</h2>
      </div>

      {/* Skeleton Loading */}
      {planHistoryLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition animate-pulse"
            >
              <div className="h-6 bg-gray-300 rounded mb-4"></div>
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded mt-4 w-1/2"></div>
            </div>
          ))}
        </div>
      ) : planHistory.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {planHistory.map((plan) => {
            const status = calculateStatus(plan.startDate, plan.endDate);

            return (
              <div
                key={plan.userPlanId}
                className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition transform hover:scale-105"
              >
                <h3 className="text-xl font-bold text-gray-800">
                  {plan.plan.planName}
                </h3>
                <p className="text-sm text-gray-600 mt-3">
                  Start Date:{" "}
                  <span className="font-medium">
                    {moment(plan.startDate).format("Do MMMM YYYY")}
                  </span>
                </p>
                <p className="text-sm text-gray-600">
                  End Date:{" "}
                  <span className="font-medium">
                    {moment(plan.endDate).format("Do MMMM YYYY")}
                  </span>
                </p>
                <p
                  className={`text-sm font-semibold mt-4 ${
                    status === "Active"
                      ? "text-green-600"
                      : status === "Upcoming"
                      ? "text-primary"
                      : "text-red-500"
                  }`}
                >
                  {status}
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center text-gray-600 mt-10">
          <p className="text-lg font-medium">
            You don't have any plan history.
          </p>
        </div>
      )}
    </div>
  );
};

export default PlanHistory;
