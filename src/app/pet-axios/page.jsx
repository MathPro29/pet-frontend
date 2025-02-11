"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Page() {
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: responseData } = await axios.get(
          "http://127.0.0.1:8000/api/pets"
        );
        setApiResponse(responseData);
      } catch (err) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading)
    return <p className="text-center text-lg font-semibold">Loading...</p>;
  if (error) return <p className="text-center text-red-500 text-lg">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">
          🐾 Pet List
        </h1>
        <p className="text-center text-gray-900 text-lg font-medium mb-4">
          Success:{" "}
          <span
            className={apiResponse.success ? "text-green-600 font-bold" : "text-red-600 font-bold"}
          >
            {apiResponse.success ? "Yes" : "No"}
          </span>
        </p>
        <p className="text-center text-gray-900 text-lg font-medium mb-6">
          {apiResponse.message}
        </p>

        {/* ตารางข้อมูลสัตว์เลี้ยง */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-gray-800 text-white text-lg font-semibold">
              <tr>
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Species</th>
              </tr>
            </thead>
            <tbody className="text-gray-900 text-lg font-medium">
              {apiResponse.data.length > 0 ? (
                apiResponse.data.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-gray-200 transition-all`}
                  >
                    <td className="py-3 px-6 border-b">{item.id}</td>
                    <td className="py-3 px-6 border-b">{item.name}</td>
                    <td className="py-3 px-6 border-b">{item.species}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="py-3 px-6 text-center text-gray-800 text-lg font-medium border-b"
                  >
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}