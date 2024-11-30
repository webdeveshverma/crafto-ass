import React, { useEffect, useState } from "react";
import axios from "axios";

const QuoteListPage = () => {
  const authToken = localStorage.getItem("authToken");
  const [quotes, setQuotes] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const limit = 9;

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await axios.get(
          `https://assignment.stage.crafto.app/getQuotes?limit=${limit}&offset=${offset}`,
          { headers: { Authorization: authToken } }
        );

        if (response.status === 200 && response.data.data.length > 0) {
          setQuotes((prev) => [...prev, ...response.data.data]);
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Error fetching quotes:", error);
      }
    };

    fetchQuotes();
  }, [offset]);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Quotes
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {quotes.length > 0 ? (
            quotes.map((quote, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center"
              >
                <img
                  src={quote.mediaUrl}
                  alt="Quote"
                  className="w-full h-48 object-contain rounded-md mb-4"
                />
                <p className="text-lg font-medium text-gray-700 mb-2 text-center">
                  {quote.text}
                </p>
                <p className="text-sm text-gray-500 italic text-center">
                  By: {quote.username} on{" "}
                  {new Date(quote.created_at).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No quotes available.
            </p>
          )}
        </div>

        {hasMore && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setOffset((prevOffset) => prevOffset + limit)}
              className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow hover:bg-blue-600 transition"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuoteListPage;
