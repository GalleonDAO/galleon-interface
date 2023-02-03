import Hero from "./Hero";
import Feature from "./Feature";
import Doubloon from "./Doubloon";
import Products from "./Products";
import Contribute from "./Contribute";
import Blog from "./Blog";
import Investors from "./Investors";

const Landing = () => {
  return (
    <div>
      <main>
        <Hero></Hero>
        <Feature></Feature>
        <Doubloon></Doubloon>
        {/* <Products></Products> */}
        {/* <Contribute></Contribute> */}
        {/* <Blog></Blog> */}
        <Investors></Investors>
      </main>
    </div>
  );
};

export default Landing;
