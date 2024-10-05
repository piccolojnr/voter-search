"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import VoterDetails from "@/components/VoterDetail";
import { useParams } from "next/navigation";
import { IVoterDetail } from "@/types";
import { Helmet } from "react-helmet";

function VoterDetailPage() {
  const params = useParams();
  const [id, setId] = useState<string | null>(null);
  const [voter, setVoter] = useState<IVoterDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (params?.id) {
      setId(params.id as string);
    }
  }, [params]);

  useEffect(() => {
    const fetchVoterDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/voter/${id}`);
        console.log(response.data);
        setVoter(response.data);
      } catch (error) {
        console.log("Error fetching voter details:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchVoterDetails();
  }, [id]);

  return (
    <>
      <Helmet>
        <title>Voter Details</title>
        <meta name="description" content="Voter Details" />
      </Helmet>
      <div
        className="container mx-auto p-4"
        style={{ marginTop: "2rem", marginBottom: "2rem" }}
      >
        {/* back */}
        <button
          onClick={() => window.history.back()}
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 absolute top-0 left-0 mt-4 ml-4"
        >
          <i className="pi pi-arrow-left mr-2"></i>
          Back
        </button>
        <div className="max-w-2xl mx-auto p-2" style={{ marginTop: "2rem" }}>
          {loading ? (
            <div className="flex items-center justify-center">
              <i className="pi pi-spin pi-spinner text-4xl text-blue-500"></i>
            </div>
          ) : error ? (
            <div className="text-center text-red-500">
              Error fetching voter details
            </div>
          ) : voter ? (
            <VoterDetails voter={voter} />
          ) : (
            <div className="text-center text-red-500">No voter found</div>
          )}
        </div>
      </div>
    </>
  );
}

export default VoterDetailPage;
