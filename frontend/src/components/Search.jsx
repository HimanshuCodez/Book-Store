import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const debounceTimeout = useRef(null);

  const fetchSearchResults = async (searchQuery) => {
    if (!searchQuery?.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      // Updated endpoint to match backend route structure
      const response = await fetch(`/api/v1/books/search?q=${encodeURIComponent(searchQuery.trim())}`);
      
      if (!response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          throw new Error(errorData.message || `Error: ${response.status}`);
        } else {
          throw new Error(`Server error: ${response.status}`);
        }
      }
      
      const data = await response.json();
      setResults(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setError(error.message);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    if (value.trim() !== "") {
      debounceTimeout.current = setTimeout(() => {
        fetchSearchResults(value);
      }, 300);
    } else {
      setResults([]);
    }
  };

  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);

  return (
    <div className="relative w-full lg:w-1/2">
      <input
        type="text"
        placeholder="Search books..."
        className="input input-bordered w-full rounded-md px-4 py-2"
        value={query}
        onChange={handleInputChange}
      />

      <div className="absolute top-3 right-4">
        {loading ? (
          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-gray-400" />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 text-gray-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35m1.68-5.52a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
            />
          </svg>
        )}
      </div>

      {query && (
        <div className="absolute top-12 left-0 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-80 overflow-y-auto z-50">
          {loading && (
            <div className="p-4 text-center text-gray-500">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500 mx-auto mb-2" />
              <p>Searching...</p>
            </div>
          )}
          
          {error && (
            <div className="p-4 text-center text-red-500">
              <p>{error}</p>
            </div>
          )}
          
          {!loading && !error && results.length === 0 && query && (
            <div className="p-4 text-center text-gray-500">
              <p>No books found</p>
            </div>
          )}

          {!loading && !error && results.map((book) => (
            <Link
              to={`/books/${book._id}`}
              key={book._id || book.id}
              className="block px-4 py-2 hover:bg-gray-100"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-16 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                  {book.url ? (
                    <img
                      src={book.url}
                      alt={book.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/placeholder-book.png";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{book.name}</p>
                  <p className="text-gray-500 text-sm truncate">{book.author}</p>
                  {book.language && (
                    <p className="text-gray-400 text-xs">{book.language}</p>
                  )}
                  {book.price && (
                    <p className="text-red-500 font-semibold text-sm">
                      ₹{typeof book.price === 'number' ? book.price.toFixed(2) : book.price}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;