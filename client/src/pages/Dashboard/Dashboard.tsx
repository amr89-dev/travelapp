import HotelDashboardCard from "../../components/HotelDashboardCard/HotelDashboardCard";
import Layout from "../../components/Layout/Layout";

const Dashboard = () => {
  return (
    <Layout>
      <div className="h-[calc(100vh_-_64px)] grid gap-4 grid-cols-1 md:grid-cols-2	bg-red-500">
        <HotelDashboardCard />
        <HotelDashboardCard />
      </div>
    </Layout>
  );
};

export default Dashboard;
