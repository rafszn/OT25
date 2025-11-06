import Container from "../components/Container";
import OrdersDashboard from "./OrdersSection";
import ProductsDashboard from "./ProductSection";

const ShopDashboard = () => {
  return (
    <Container>
      <div className="shop_dashboard">
        <h1 className="font-[ClashDisplay] font-bold sm:text-[60px] text-[30px] underline px-4">
          SHOP
        </h1>
        <ProductsDashboard />

        <OrdersDashboard />
      </div>
    </Container>
  );
};
export default ShopDashboard;
