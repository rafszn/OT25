import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Container from "../components/Container";
import Footer from "../components/Footer";

const DefaultLayout = () => {
  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </>
  );
};
export default DefaultLayout;
