import { IResult } from "@/types";
import Link from "next/link";

interface CardProps {
  result: IResult;
}

export default function Card({ result }: CardProps) {
  return (
    <div
      key={result._id}
      className="p-4 shadow-lg border rounded-lg flex flex-col justify-between gap-4 bg-white"
    >
      {/* title */}
      <h2 className="text-xl font-bold">{result._source.fullName}</h2>

      {/* content */}
      <div className="flex items-center gap-4">
        <i className="pi pi-user text-blue-500 text-4xl"></i>
        <div>
          <p className="text-sm font-bold">ID: {result._source.votersId}</p>
          <p className="text-sm">Town: {result._source.town}</p>
        </div>
      </div>

      {/* footer */}
      <div className="flex justify-between items-center flex-wrap">
        <p className="text-sm text-gray-600">
          <strong>DOB:</strong> {result._source.dob}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Gender:</strong> {result._source.gender}
        </p>
      </div>
      <div className="flex justify-between items-center flex-wrap">
        <p className="text-xs text-gray-600">
          <strong>Polling Station:</strong> {result._source.polStationName}
        </p>
        <p className="text-xs text-gray-600">
          <strong>Elect Area:</strong> {result._source.electArea}
        </p>
      </div>

      {/* button */}
      <Link
        href={`/voter/${result._source.votersId}`}
        className="bg-blue-500 text-white p-2 rounded-md mt-4 hover:bg-blue-600"
      >
        <i className="pi pi-eye mr-2"></i>
        View Details
      </Link>
    </div>
  );
}
