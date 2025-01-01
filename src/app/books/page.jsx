"use client";

import { useEffect, useState } from "react";
import {
  Grid,
  Separator,
  Flex,
  Button,
  Dialog,
  Text,
  TextField,
} from "@radix-ui/themes";
import BookCard from "@/components/BookCard";
import BookCardSkeleton from "@/components/BookCardSkeleton";
import axios from "axios";

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    categories: ["Novel"],
    language: [],
    priceRange: [0, 1000],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [requestedBook, setRequestedBook] = useState("");

  const booksPerPage = 10;

  const fetchBooks = async (query = "", filters = {}, page = 1) => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        search: query,
        categories: filters.categories.join(","),
        language: filters.language.join(","),
        minPrice: filters.priceRange[0],
        maxPrice: filters.priceRange[1],
        page: page,
        limit: booksPerPage,
      });
      const response = await axios.get(`/api/books?${queryParams}`);
      console.log(response);
      setBooks(response?.data?.books);

      setTotalPages(response.data.pagination.totalPages);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks(searchQuery, filters, currentPage);
  }, [filters, currentPage]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    fetchBooks(value, filters, 1);
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const applyFilters = () => {
    fetchBooks(searchQuery, filters, 1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRequestModalOpen = () => {
    setIsRequestModalOpen(true);
  };

  const handleRequestModalClose = () => {
    setIsRequestModalOpen(false);
  };

  const handleBookRequest = async () => {
    try {
      await fetch("/api/request-book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookTitle: requestedBook }),
      });
      setRequestedBook("");
      setIsRequestModalOpen(false);
      alert("Your request has been submitted.");
    } catch (error) {
      console.error("Error submitting request:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Sidebar (Filter) */}
      <div className="w-full sm:w-64 p-4 bg-white shadow-md h-full">
        <h2 className="text-2xl font-semibold mb-4">Filters</h2>

        <div className="flex justify-between md:flex-col">
          <div className="mb-6">
            <h3 className="font-medium mb-2">Categories</h3>
            {["Novel", "MPPSC", "SSC", "UGCNET", "Stationary", "Other"].map(
              (category) => (
                <label key={category} className="block mb-2">
                  <input
                    type="checkbox"
                    className="mr-2"
                    onChange={(e) =>
                      handleFilterChange(
                        "categories",
                        e.target.checked
                          ? [...filters.categories, category]
                          : filters.categories.filter((c) => c !== category)
                      )
                    }
                  />
                  {category}
                </label>
              )
            )}
          </div>

          <div className="mb-6">
            <h3 className="font-medium mb-2">Language</h3>
            {["English", "Hindi"].map((lang) => (
              <label key={lang} className="block mb-2">
                <input
                  type="checkbox"
                  className="mr-2"
                  onChange={(e) =>
                    handleFilterChange(
                      "language",
                      e.target.checked
                        ? [...filters.language, lang]
                        : filters.language.filter((l) => l !== lang)
                    )
                  }
                />
                {lang}
              </label>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-medium mb-2">Price Range</h3>
          <input
            type="range"
            min="0"
            max="1000"
            value={filters.priceRange[1]}
            className="w-full"
            onChange={(e) =>
              handleFilterChange("priceRange", [0, parseInt(e.target.value)])
            }
          />
          <p className="text-sm">Up to ₹{filters.priceRange[1]}</p>
        </div>

        <button
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded"
          onClick={applyFilters}
        >
          Apply Filters
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          All Books
        </h1>
        <Flex direction="column" gap="4" className="mb-6">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search for books..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-10 p-2 border rounded"
            />
            <svg
              className="absolute top-1/2 left-3 -translate-y-1/2 w-5 h-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <Separator />
        </Flex>
        <Grid
          gap="6"
          columns={{
            xs: "2",
            sm: "3",
            md: "4",
            lg: "5",
            xl: "6",
          }}
        >
          {loading &&
            Array.from({ length: 10 }, (_, index) => (
              <BookCardSkeleton key={index} />
            ))}
          {books?.map((book) => (
            <BookCard key={book?._id} book={book} isAdmin={false} />
          ))}
        </Grid>

        {books?.length === 0 ? (
          <div className="text-center mt-6">
            <Button onClick={handleRequestModalOpen} color="blue">
              Request this book
            </Button>
          </div>
        ) : (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-500 text-white rounded-l"
            >
              Previous
            </button>
            <span className="px-4 py-2">{currentPage}</span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-blue-500 text-white rounded-r"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Request Book Modal */}
      <Dialog.Root
        open={isRequestModalOpen}
        onOpenChange={setIsRequestModalOpen}
      >
        <Dialog.Content maxWidth="450px">
          <Dialog.Title>Request a Book</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            If you can't find the book, request us to add it!
          </Dialog.Description>
          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Book Title
              </Text>
              <TextField.Root
                value={requestedBook}
                onChange={(e) => setRequestedBook(e.target.value)}
                placeholder="Enter the book title"
              />
            </label>
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button onClick={handleBookRequest}>Submit Request</Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
}
