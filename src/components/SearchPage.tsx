"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import Card from "@/components/Card";
import { IResult } from "@/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation"; // Import useRouter

const SearchPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<IResult[]>([]);
  const [totalHits, setTotalHits] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // Whenever the URL changes, update the query and page state
    if (!searchParams) return;
    const params = new URLSearchParams(searchParams);
    const query = params.get("query") || "";
    const page = parseInt(params.get("page") || "1", 10);

    setQuery(query);
    setPage(page);

    handleSearch(query, page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const updateQuery = (query: string, page: number) => {
    // Whenever the query or page changes, update the URL
    const params = new URLSearchParams();
    if (query) params.set("query", query);
    params.set("page", page.toString());

    router.push(`${pathname}?${params.toString()}`); // Update the URL
  };

  const handleSearch = async (
    query: string,
    page: number = 1,
    pageSize: number = 10
  ) => {
    if (!query) return;
    setLoading(true);

    updateQuery(query, page); // Update the URL

    try {
      const from = (page - 1) * pageSize;
      const response = await axios.get("/api/search", {
        params: {
          query,
          from,
          size: pageSize,
        },
      });

      const data = response.data;

      if (data.hits.hits) {
        setResults(data.hits.hits);
        setTotalHits(data.hits.total.value); // Store total hits for pagination
      }
    } catch (error) {
      console.error("Error fetching voters:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePagination = (newPage: number) => {
    setPage(newPage); // Change the page
    handleSearch(query, newPage);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Voter Search</h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handlePagination(1); // Reset to page 1 on new search
          }}
          className="flex items-center gap-3 mb-4"
        >
          <InputText
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter voter name"
            className="flex-grow p-3 border rounded-md"
          />
          <Button
            icon="pi pi-search"
            type="submit"
            className="p-button-primary"
          />
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading ? (
            <div className="flex items-center justify-center col-span-full mt-24">
              <i className="pi pi-spin pi-spinner text-4xl text-blue-500"></i>
            </div>
          ) : (
            results.map((result) => <Card key={result._id} result={result} />)
          )}
        </div>

        <div className="flex items-center justify-center mt-8">
          <Button
            icon="pi pi-angle-left"
            className="p-button-text"
            disabled={page === 1}
            onClick={() => handlePagination(page - 1)}
          />
          <span className="mx-4">
            Page {page} of {Math.ceil(totalHits / 10)}
          </span>
          <Button
            icon="pi pi-angle-right"
            className="p-button-text"
            disabled={page * 10 >= totalHits}
            onClick={() => handlePagination(page + 1)}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
