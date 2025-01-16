import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Search, Loader2, BookOpen, X } from 'lucide-react'; // Adding X icon for close

// API instance
const api = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// SearchInput Component
const SearchInput = ({ searchTerm, setSearchTerm, loading }) => (
  <div className="relative flex-1">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <Search className="h-5 w-5 text-gray-400" />
    </div>
    <input
      type="text"
      placeholder="Search books by name, author, language, or ISBN..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm placeholder-gray-400"
      aria-label="Search books"
    />
    {loading && (
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
        <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />
      </div>
    )}
  </div>
);

// Dropdown Component for Filters
const Dropdown = ({ selectedFilter, setSelectedFilter, open, toggleDropdown }) => (
  <div className="relative">
    <div className="flex justify-between items-center">
      <button
        onClick={toggleDropdown}
        className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent text-gray-600"
      >
        {selectedFilter === 'all' ? 'All Fields' : selectedFilter}
      </button>
      {open ? (
        <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-2">
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="w-full px-4 py-3 bg-white border-none rounded-lg focus:outline-none text-gray-600"
          >
            <option value="all">All Fields</option>
            <option value="name">Title</option>
            <option value="author">Author</option>
            <option value="language">Language</option>
            <option value="isbn">ISBN</option>
          </select>
        </div>
      ) : null}
    </div>
  </div>
);

// BookGrid Component
const BookGrid = ({ books }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {books.map((book) => (
      <div key={book._id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        {book.url ? (
          <div className="h-48 overflow-hidden rounded-t-lg">
            <img 
              src={book.url} 
              alt={book.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
              }}
            />
          </div>
        ) : (
          <div className="h-48 bg-gray-100 rounded-t-lg flex items-center justify-center">
            <BookOpen className="h-12 w-12 text-gray-400" />
          </div>
        )}
        <div className="p-6">
          <h3 className="font-bold text-xl mb-2 text-gray-900">{book.name}</h3>
          <p className="text-gray-600 mb-2">By {book.author}</p>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Language: {book.language}</p>
            {book.isbn && <p className="text-sm text-gray-500">ISBN: {book.isbn}</p>}
            <p className="text-lg font-bold text-green-600">${book.price}</p>
          </div>
          <p className="mt-4 text-gray-600 line-clamp-3">{book.description}</p>
        </div>
      </div>
    ))}
  </div>
);

// NoResults Component
const NoResults = () => (
  <div className="text-center py-12">
    <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
    <h3 className="text-lg font-medium text-gray-900 mb-2">No books found</h3>
    <p className="text-gray-600">Try adjusting your search terms</p>
  </div>
);

// BookSearch Component
const BookSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const timeoutRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);

  // API call to search books
  const searchBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.get(`/books/search?q=${searchTerm}`);
      
      if (Array.isArray(response.data)) {
        setBooks(response.data);
      } else if (response.data.books) {
        setBooks(response.data.books);
      } else {
        setError('No results found');
        setBooks([]);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch books');
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(searchBooks, 500);
    } else {
      setBooks([]);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [searchTerm]);

  const filteredBooks = books.filter(book => {
    if (selectedFilter === 'all') return true;
    return book[selectedFilter]?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className="max-w-7xl ">
      {/* Search Icon Button */}
       <div className="relative flex-1">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <Search className="h-5 w-5 text-gray-400" />
    </div>
    <input
    onClick={openModal}
      type="text"
      placeholder="Search books by name, author, language, or ISBN..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full pl-10 pr-4 py-3 border border-gray-300 bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent  shadow-sm placeholder-gray-400"
      aria-label="Search books"
    />
    {loading && (
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
        <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />
      </div>
    )}
  </div>

      {/* Modal Popup for Search */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full md:w-1/2 max-h-[80vh] overflow-y-auto bg-opacity-90 backdrop-blur-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Search Books</h2>
              <button onClick={closeModal} className="text-gray-500 text-xl">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
              <div className="flex gap-4">
                <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} loading={loading} />
                <Dropdown 
                  selectedFilter={selectedFilter} 
                  setSelectedFilter={setSelectedFilter} 
                  open={dropdownOpen} 
                  toggleDropdown={toggleDropdown} 
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            {/* Results Count */}
            {searchTerm && !loading && filteredBooks.length > 0 && (
              <div className="mb-6">
                <p className="text-gray-600">
                  Found {filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'}
                </p>
              </div>
            )}

            {/* Books Grid */}
            {filteredBooks.length > 0 ? (
              <BookGrid books={filteredBooks} />
            ) : searchTerm && !loading ? (
              <NoResults />
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookSearch;
