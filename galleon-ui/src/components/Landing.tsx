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

        <Doubloon></Doubloon>
        {/* <Products></Products> */}
        {/* <Contribute></Contribute> */}
        {/* <Blog></Blog> */}
        <Investors></Investors>
        <Feature></Feature>
      </main>
    </div>
  );
};

export default Landing;
