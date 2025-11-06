import { useNavigate } from "react-router-dom";
import { useGetOrders } from "../_services/orders.service";

export interface Order {
  _id: string;
  paymentReference: string;
  paymentStatus: "pending" | "successful" | "failed";
  amount: number;
  quantity: number;
  currency: string;
  deliveryLocation: {
    name: string;
    phoneNumber: string;
    address: string;
    state: string;
    country: string;
    email: string;
  };
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    images: { url: string }[];
    selectedVariants: Record<string, string>;
  };
  calculatedDeliveryFee: number;
  pickupOnEventDay: boolean;
  createdAt: string;
  updatedAt: string;
  deliveryStatus:
    | "pending"
    | "shipped"
    | "delivered"
    | "completed"
    | "disputed";
  timeline: {
    key: string;
    label: string;
    description: string;
    completed: boolean;
    date: string;
  }[];
}

export default function OrdersDashboard() {
  const { data: orders, isLoading } = useGetOrders();
  const navigate = useNavigate();

  const handleNaviagate = (id: string) => {
    navigate(`/v1/console/order/${id}`);
  };

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <div className="sm:p-6 p-4 bg-white mt-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#6A0DAD] underline">Orders</h1>
      </div>

      <div className="overflow-x-scroll">
        <table className="w-full text-left border border-[#6A0DAD]">
          <thead className="bg-[#6A0DAD] text-white whitespace-nowrap">
            <tr>
              <th className="p-3">OrderId</th>
              <th className="p-3">Customer Name</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Quntity</th>
              <th className="p-3">status</th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders?.length > 0 &&
              orders?.map((order: Order) => (
                <tr key={order._id} className="border-b whitespace-nowrap">
                  <td className="p-3 hover:underline cursor-pointer">
                    <div onClick={() => handleNaviagate(order._id)}>
                      #{order?.paymentReference?.toUpperCase()}
                    </div>
                  </td>
                  <td className="p-3 capitalize">
                    {order?.deliveryLocation?.name}
                  </td>
                  <td className="p-3">₦{order?.amount?.toLocaleString()}</td>
                  <td className="p-3">{order?.quantity?.toLocaleString()}</td>

                  <td className="p-3">{order.deliveryStatus}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
