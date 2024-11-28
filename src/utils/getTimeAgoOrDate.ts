import moment from "moment";

const getTimeAgoOrDate = (timestamp: string): string => {
  const daysDifference = moment().diff(moment(timestamp), "days");

  if (daysDifference > 10) {
    // Return formatted date if older than 10 days
    return moment(timestamp).format("MMMM D, YYYY"); // Example: November 15, 2024
  } else {
    // Return "time ago" string for recent news
    return moment(timestamp).fromNow(); // Example: "3 days ago"
  }
};
export default getTimeAgoOrDate;
