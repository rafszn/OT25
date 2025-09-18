import { useEffect, useState } from "react";

type Ticket = {
  _id: string;
  ticketCode: string;
  ticketType: string;
  price: number;
  isUsed: boolean;
};

type Referral = {
  referralCode: string;
  totalQuantity: number;
};

type DashboardData = {
  tickets: Ticket[];
  referrals: Referral[];
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"tickets" | "referrals">(
    "tickets"
  );
  const [data, setData] = useState<DashboardData>({
    tickets: [],
    referrals: [],
  });
  const [loading, setLoading] = useState<boolean>(true);

  // useEffect(() => {
  //   // Simulate loading with dummy data
  //   setTimeout(() => {
  //     setData({
  //       tickets: [
  //         {
  //           _id: "1",
  //           ticketCode: "TICKET-12345",
  //           ticketType: "basic",
  //           price: 50,
  //           isUsed: false,
  //         },
  //         {
  //           _id: "2",
  //           ticketCode: "TICKET-67890",
  //           ticketType: "premium",
  //           price: 100,
  //           isUsed: true,
  //         },
  //         {
  //           _id: "3",
  //           ticketCode: "TICKET-11111",
  //           ticketType: "basic",
  //           price: 50,
  //           isUsed: false,
  //         },
  //         {
  //           _id: "4",
  //           ticketCode: "TICKET-22222",
  //           ticketType: "premium",
  //           price: 100,
  //           isUsed: true,
  //         },
  //       ],
  //       referrals: [
  //         { referralCode: "ABC123", totalQuantity: 15 },
  //         { referralCode: "XYZ999", totalQuantity: 4 },
  //         { referralCode: "HELLO2025", totalQuantity: 7 },
  //       ],
  //     });
  //     setLoading(false);
  //   }, 500);
  // }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://ot-server-juqv.onrender.com/v1/dashboard");
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <p className="text-center p-6 text-gray-600">Loading...</p>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-[#6A0DAD] mb-6">
        Admin Dashboard
      </h1>

      {/* Tabs */}
      <div className="flex border-b border-gray-300 mb-6">
        <button
          onClick={() => setActiveTab("tickets")}
          className={`px-6 py-2 font-semibold transition-all ${
            activeTab === "tickets"
              ? "border-b-4 border-[#FF7F00] text-[#FF7F00]"
              : "text-gray-500 hover:text-[#6A0DAD]"
          }`}
        >
          Tickets
        </button>
        <button
          onClick={() => setActiveTab("referrals")}
          className={`px-6 py-2 font-semibold transition-all ${
            activeTab === "referrals"
              ? "border-b-4 border-[#FF7F00] text-[#FF7F00]"
              : "text-gray-500 hover:text-[#6A0DAD]"
          }`}
        >
          Referrals
        </button>
      </div>

      {/* Tickets Table */}
      {activeTab === "tickets" && (
        <div className="overflow-x-auto shadow-md rounded-xl border border-gray-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#6A0DAD] text-white">
              <tr>
                <th className="p-3">Ticket Code</th>
                <th className="p-3">Type</th>
                <th className="p-3">Price</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.tickets.length > 0 ? (
                data.tickets.map((ticket) => (
                  <tr
                    key={ticket._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-3">{ticket.ticketCode}</td>
                    <td className="p-3 capitalize">{ticket.ticketType}</td>
                    <td className="p-3">NGN{ticket.price?.toLocaleString()}</td>
                    <td className="p-3">
                      {ticket.isUsed ? (
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-[#FF7F00] text-white">
                          Used
                        </span>
                      ) : (
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-200 text-gray-700">
                          Not Used
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-500">
                    No tickets found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Referrals Table */}
      {activeTab === "referrals" && (
        <div className="overflow-x-auto shadow-md rounded-xl border border-gray-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#6A0DAD] text-white">
              <tr>
                <th className="p-3">Referral Code</th>
                <th className="p-3">Total Tickets Purchased</th>
              </tr>
            </thead>
            <tbody>
              {data.referrals.length > 0 ? (
                data.referrals.map((ref) => (
                  <tr
                    key={ref.referralCode}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-3">{ref.referralCode}</td>
                    <td className="p-3">{ref.totalQuantity}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2} className="p-4 text-center text-gray-500">
                    No referrals found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
