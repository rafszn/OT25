import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

type Ticket = {
  _id: string;
  ticketCode: string;
  ticketType: string;
  price: number;
  isUsed: boolean;
  email: string;
  createdAt: string;
};

type Referral = {
  referralCode: string;
  totalQuantity: number;
};

type DashboardData = {
  tickets: Ticket[];
  referrals: Referral[];
};

function formatDate(date: Date): string {
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12 || 12;

  return `${formattedDate}, ${hours}:${minutes}${ampm}`;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const ADMIN_SECRET = "admin@UCLE";
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"tickets" | "referrals">(
    "tickets"
  );
  const [data, setData] = useState<DashboardData>({
    tickets: [],
    referrals: [],
  });
  const [loading, setLoading] = useState<boolean>(true);

  const [ticketSearch, setTicketSearch] = useState("");
  const [referralSearch, setReferralSearch] = useState("");

  useEffect(() => {
    const storedKey = localStorage.getItem("adminKey");
    const urlKey = searchParams.get("admin");

    if (storedKey === ADMIN_SECRET) {
      setIsAuthorized(true);
      return;
    }

    if (urlKey) {
      if (urlKey === ADMIN_SECRET) {
        localStorage.setItem("adminKey", urlKey);
        setIsAuthorized(true);
      } else {
        navigate("/", { replace: true });
      }
    } else {
      navigate("/", { replace: true });
    }
  }, [searchParams, navigate]);

  useEffect(() => {
    if (!isAuthorized) return;
    async function fetchData() {
      try {
        const res = await fetch(
          // "http://localhost:8080/v1/dashboard"
          "https://ot-server-juqv.onrender.com/v1/dashboard"
        );
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [isAuthorized]);

  async function updateTicketStatus(ticketId: string) {
    try {
      const res = await fetch(
        `https://ot-server-juqv.onrender.com/v1/tickets/${ticketId}/use`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!res.ok) throw new Error("Failed to update ticket status");

      setData((prev) => ({
        ...prev,
        tickets: prev.tickets.map((ticket) =>
          ticket._id === ticketId ? { ...ticket, isUsed: true } : ticket
        ),
      }));
    } catch (err) {
      console.error("Error updating ticket:", err);
      alert("Failed to update ticket status");
    }
  }

  if (!isAuthorized) {
    return (
      <p className="text-center p-6 text-gray-600">
        Checking admin credentials...
      </p>
    );
  }

  const premiumCount = data?.tickets?.filter(
    (t) => t.ticketType === "premium"
  ).length;
  const basicCount = data?.tickets?.filter(
    (t) => t.ticketType === "basic"
  ).length;

  if (loading) {
    return <p className="text-center p-6 text-gray-600">Loading...</p>;
  }

  const filteredTickets = data.tickets.filter((ticket) =>
    ticket.ticketCode
      .toLowerCase()
      .includes(`OTH-${ticketSearch}`.toLowerCase())
  );

  const filteredReferrals = data.referrals.filter((ref) =>
    ref.referralCode.toLowerCase().includes(referralSearch.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#6A0DAD] mb-6 text-center sm:text-left">
        Admin Dashboard
      </h1>

      <div className="flex gap-4 justify-center sm:justify-start mb-6">
        <div className="px-4 py-2 rounded-lg bg-purple-100 text-purple-700 font-semibold">
          Premium: {premiumCount}
        </div>
        <div className="px-4 py-2 rounded-lg bg-orange-100 text-orange-700 font-semibold">
          Basic: {basicCount}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-gray-300 mb-6 justify-center sm:justify-start">
        <button
          onClick={() => setActiveTab("tickets")}
          className={`px-4 sm:px-6 py-2 font-semibold transition-all ${
            activeTab === "tickets"
              ? "border-b-4 border-[#FF7F00] text-[#FF7F00]"
              : "text-gray-500 hover:text-[#6A0DAD] border-b-4 border-transparent"
          }`}
        >
          Tickets
        </button>
        <button
          onClick={() => setActiveTab("referrals")}
          className={`px-4 sm:px-6 py-2 font-semibold transition-all ${
            activeTab === "referrals"
              ? "border-b-4 border-[#FF7F00] text-[#FF7F00]"
              : "text-gray-500 hover:text-[#6A0DAD] border-b-4 border-transparent"
          }`}
        >
          Referrals
        </button>
      </div>

      {/* Tickets Table */}
      {activeTab === "tickets" && (
        <>
          <div className="flex items-center mb-4 space-x-2">
            <span className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-l-lg text-gray-700 font-medium text-sm sm:text-base">
              OTH-
            </span>
            <input
              type="text"
              placeholder="Enter ticket code"
              value={ticketSearch}
              onChange={(e) => setTicketSearch(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-[#6A0DAD] text-sm sm:text-base"
            />
          </div>

          {/* Desktop Table */}
          <div className="hidden sm:block overflow-x-auto shadow-md rounded-xl border border-gray-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#6A0DAD] text-white">
                <tr>
                  <th className="p-3">Date</th>
                  <th className="p-3">Ticket Code</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredTickets.length > 0 ? (
                  filteredTickets.map((ticket) => (
                    <tr
                      key={ticket._id}
                      className="hover:bg-gray-50 transition"
                    >
                      <td className="p-3">
                        {formatDate(new Date(ticket.createdAt))}
                      </td>
                      <td className="p-3">{ticket.ticketCode}</td>
                      <td className="p-3">{ticket.email}</td>
                      <td className="p-3 capitalize">{ticket.ticketType}</td>
                      <td className="p-3">
                        NGN{ticket.price?.toLocaleString()}
                      </td>
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
                      <td className="p-3 text-right">
                        {!ticket.isUsed && (
                          <button
                            onClick={() => updateTicketStatus(ticket._id)}
                            className="px-4 py-1 bg-[#6A0DAD] text-white rounded-lg hover:bg-[#4a0a8a] transition cursor-pointer"
                          >
                            Mark as Used
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="p-4 text-center text-gray-500">
                      No tickets found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="sm:hidden space-y-4">
            {filteredTickets.length > 0 ? (
              filteredTickets.map((ticket) => (
                <div
                  key={ticket._id}
                  className="border rounded-lg p-4 shadow-sm bg-white"
                >
                  <div className="flex justify-between mb-2 text-sm text-gray-600">
                    <span>{formatDate(new Date(ticket.createdAt))}</span>
                    <span className="font-semibold">{ticket.ticketCode}</span>
                  </div>
                  <p className="text-gray-800 text-sm break-words mb-1">
                    {ticket.email}
                  </p>
                  <p className="text-sm capitalize mb-2">
                    {ticket.ticketType} • NGN{ticket.price?.toLocaleString()}
                  </p>
                  <div className="flex justify-between items-center">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        ticket.isUsed
                          ? "bg-[#FF7F00] text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {ticket.isUsed ? "Used" : "Not Used"}
                    </span>
                    {!ticket.isUsed && (
                      <button
                        onClick={() => updateTicketStatus(ticket._id)}
                        className="text-xs px-3 py-1 bg-[#6A0DAD] text-white rounded-lg hover:bg-[#4a0a8a] transition"
                      >
                        Mark as Used
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 text-sm">
                No tickets found
              </p>
            )}
          </div>
        </>
      )}

      {/* Referrals Table */}
      {activeTab === "referrals" && (
        <>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search by referral code"
              value={referralSearch}
              onChange={(e) => setReferralSearch(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A0DAD] text-sm sm:text-base"
            />
          </div>

          {/* Desktop Table */}
          <div className="hidden sm:block overflow-x-auto shadow-md rounded-xl border border-gray-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#6A0DAD] text-white">
                <tr>
                  <th className="p-3">Referral Code</th>
                  <th className="p-3">Total Tickets Purchased</th>
                </tr>
              </thead>
              <tbody>
                {filteredReferrals.length > 0 ? (
                  filteredReferrals.map((ref) => (
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

          {/* Mobile Cards */}
          <div className="sm:hidden space-y-3">
            {filteredReferrals.length > 0 ? (
              filteredReferrals.map((ref) => (
                <div
                  key={ref.referralCode}
                  className="border rounded-lg p-4 shadow-sm bg-white flex justify-between items-center"
                >
                  <span className="font-semibold">{ref.referralCode}</span>
                  <span className="text-sm text-gray-700">
                    {ref.totalQuantity}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 text-sm">
                No referrals found
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
