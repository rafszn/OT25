import { useParams } from "react-router-dom";
import {
  useGetSingleOrder,
  useUpdateOrderTimeline,
} from "../_services/orders.service";
import type { Order } from "./OrdersSection";
import Container from "../components/Container";
import { useState } from "react";

export default function OrderDetails() {
  const { id } = useParams();
  const { data: torder, isLoading } = useGetSingleOrder(id ?? "");
  const updateTimeline = useUpdateOrderTimeline();
  const [loadingKey, setLoadingKey] = useState<string | null>(null);

  const handleMarkComplete = async (key: string) => {
    setLoadingKey(key);
    try {
      await updateTimeline.mutateAsync({ id: id ?? "", stepKey: key });
    } finally {
      setLoadingKey(null);
    }
  };

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (!torder) return <div className="p-4">Order not found</div>;

  const order = torder as Order;

  return (
    <Container>
      <div className="p-4 bg-white order_dashboard">
        <h1 className="text-2xl font-bold text-[#6A0DAD] underline mb-6">
          Order Details
        </h1>

        {/* ORDER INFO */}
        <section className="border border-gray-300 rounded-2xl p-4 mb-6">
          <h2 className="text-xl font-semibold mb-3 underline">Order Info</h2>
          <p>
            <span className="font-medium">Order ID:</span> #
            {order.paymentReference?.toUpperCase()}
          </p>
          <p>
            <span className="font-medium">Amount:</span> ₦
            {order.amount?.toLocaleString()}
          </p>
          <p>
            <span className="font-medium">Quantity:</span>{" "}
            {order.quantity?.toLocaleString()}
          </p>
          <p>
            <span className="font-medium">Payment Status:</span>{" "}
            {order.paymentStatus}
          </p>
          <p>
            <span className="font-medium">Delivery Status:</span>{" "}
            {order.deliveryStatus}
          </p>
        </section>

        {/* DELIVERY INFO */}
        <section className="border border-gray-300 rounded-2xl p-4 mb-6">
          <h2 className="text-xl font-semibold mb-3 underline">
            Delivery Info
          </h2>
          <p>
            <span className="font-medium">Name:</span>{" "}
            {order.deliveryLocation?.name}
          </p>
          <p>
            <span className="font-medium">Phone:</span>{" "}
            {order.deliveryLocation?.phoneNumber}
          </p>
          <p>
            <span className="font-medium">Email:</span>{" "}
            {order.deliveryLocation?.email}
          </p>
          <p>
            <span className="font-medium">Address:</span>{" "}
            {order.deliveryLocation?.address}
          </p>
          <p>
            <span className="font-medium">State:</span>{" "}
            {order.deliveryLocation?.state}
          </p>
          <p>
            <span className="font-medium">Country:</span>{" "}
            {order.deliveryLocation?.country}
          </p>
        </section>

        {/* PRODUCT INFO */}
        <section className="border border-gray-300 rounded-2xl p-4 mb-6">
          <h2 className="text-xl font-semibold mb-3 underline">Product Info</h2>
          <p>
            <span className="font-medium">Name:</span> {order.product?.name}
          </p>
          <p>
            <span className="font-medium">Price:</span> ₦
            {order.product?.price?.toLocaleString()}
          </p>
          <p>
            <span className="font-medium">Description:</span>{" "}
            {order.product?.description}
          </p>

          {order.product?.images?.[0]?.url && (
            <img
              src={order.product.images[0].url}
              alt={order.product.name}
              className="w-32 h-32 object-cover rounded-lg mt-3"
            />
          )}
        </section>

        {/* TIMELINE */}
        <section className="rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-3 underline">Timeline</h2>

          <ul className="space-y-3">
            {order.timeline?.map((item) => (
              <li
                key={item.key}
                className="border border-gray-300 rounded-lg p-3 flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{item.label}</p>
                  <p className="text-sm text-gray-600">{item.description}</p>
                  <p className="text-xs mt-1">
                    Status: {item.completed ? "✅ Completed" : "⏳ Pending"}
                  </p>
                </div>

                {!item.completed && (
                  <button
                    onClick={() => handleMarkComplete(item.key)}
                    disabled={loadingKey === item.key}
                    className="px-4 py-2 bg-[#6A0DAD] text-white rounded-lg text-sm cursor-pointer disabled:opacity-50"
                  >
                    {loadingKey === item.key ? "Updating..." : "Mark Complete"}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Container>
  );
}
