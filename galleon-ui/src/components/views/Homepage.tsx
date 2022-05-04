import Navigation from "components/Navigation";
import Footer from "components/Footer";
import Landing from "components/Landing";

const Dashboard = () => {
  return (
    <>
      <div className="bg-theme-oldlace">
        <div className="relative overflow-hidden">
          <Navigation>
            <></>
          </Navigation>
          <Landing></Landing>
          <Footer>
            <></>
          </Footer>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
