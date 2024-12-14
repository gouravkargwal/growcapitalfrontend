"use client";
import React, { useEffect } from "react";
import Card from "../UI/Card";
import { useAppDispatch } from "@/hook/useAppDispatch";
import { RootState } from "@/Store/store";
import { useSelector } from "react-redux";
import { fetchUserAccountOverview } from "@/Feature/User/userSlice";
import CardSkeleton from "../UI/CardSkeleton";
import stockIcon from '../../../assets/chart.svg';
import newsIcon from '../../../assets/news.svg';
import referralsIcon from '../../../assets/child.svg';
import planIcon from '../../../assets/light.svg';

const AccountOverview: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserAccountOverview());
  }, [dispatch]);

  const { accountOverview, accountOverviewLoading } = useSelector(
    (state: RootState) => state.user
  );

  const cardStyles: Record<
    string,
    {
      icon: string;
      color: string;
      borderColor: string;
      route: string;
    }
  > = {
    "Stock Subscribed": {
      icon: stockIcon,
      color: "#dcfce7",
      borderColor: "#4ade80",
      route: "",
    },
    "News Types": {
      icon: newsIcon,
      color: "#f3e8ff",
      borderColor: "#c084fc",
      route: "",
    },
    "Total Referrals": {
      icon: referralsIcon,
      color: "#ffedd5",
      borderColor: "#fb923c",
      route: "/referAndEarn",
    },
    "Current Plan": {
      icon: planIcon,
      color: "#dbeafe",
      borderColor: "#60a5fa",
      route: "/subscriptions",
    },
  };

  const cards =
    accountOverview?.map((card) => ({
      ...card,
      ...cardStyles[card.title],
    })) || [];

  return (
    <div className="mx-2 p-2">
      <h2 className="text-lg font-bold mb-2 text-gray-900">Account Overview</h2>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {accountOverviewLoading
          ? Array(4)
            .fill(null)
            .map((_, index) => <CardSkeleton key={index} />)
          : cards.map((card, index) => (
            <Card
              key={index}
              icon={card.icon}
              color={card.color}
              count={card.value}
              label={card.title}
              borderColor={card.borderColor}
              route={card.route}
            />
          ))}
      </div>
    </div>
  );
};

export default AccountOverview;
