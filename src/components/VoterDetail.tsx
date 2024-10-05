import { IVoterDetail } from "@/types";
import Image from "next/image";
import { PrimeIcons } from "primereact/api";

interface VoterDetailsProps {
  voter: IVoterDetail;
}

const VoterDetails: React.FC<VoterDetailsProps> = ({ voter }) => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Voter Details</h2>
      <div className="flex items-center mb-4">
        <Image
          // base64 image
          src={decodeURIComponent(voter.detail.picture)}
          alt="Voter"
          className="w-36 h-36 rounded-full border-2 border-gray-300 mr-4"
          width={144}
          height={144}
        />
        <div>
          <h3 className="text-lg font-semibold">{voter.fullName}</h3>
          <p className="text-gray-600">
            {voter.gender}, {voter.detail.age} years
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 mb-6">
        <div className="p-4 border rounded-lg bg-gray-50">
          <h4 className="font-semibold">Contact Information</h4>
          <p>
            <i className={PrimeIcons.PHONE} /> {voter.tel}
          </p>
          <p>
            <i className={PrimeIcons.ID_CARD} /> ID: {voter.id}
          </p>
        </div>
        <div className="p-4 border rounded-lg bg-gray-50">
          <h4 className="font-semibold">Personal Information</h4>
          <p>
            <i className={PrimeIcons.CALENDAR} /> Date of Birth: {voter.dob}
          </p>
          <p>
            <i className={PrimeIcons.USER} /> Gender: {voter.gender}
          </p>
          <p>
            <i className={PrimeIcons.USER} /> Father: {voter.fatherName}
          </p>
          <p>
            <i className={PrimeIcons.USER} /> Mother: {voter.motherName}
          </p>
        </div>
        <div className="p-4 border rounded-lg bg-gray-50">
          <h4 className="font-semibold">Registration Details</h4>
          <p>
            <i className={PrimeIcons.HOME} /> Town: {voter.town}
          </p>
          <p>
            <i className={PrimeIcons.USER} /> Registered Year: {voter.regYear}
          </p>
          <p>
            <i className={PrimeIcons.BOOK} /> Poll Code: {voter.polCode}
          </p>
          <p>
            <i className={PrimeIcons.BOOK} /> Poll Station:{" "}
            {voter.polStationName}
          </p>
        </div>

        <div className="p-4 border rounded-lg bg-gray-50">
          <h4 className="font-semibold">Other Information</h4>
          <p>
            <i className={PrimeIcons.BOOK} /> Elect Area: {voter.electArea}
          </p>
          <p>
            <i className={PrimeIcons.BOOK} /> ID Number: {voter.idNumber}
          </p>
          <p>
            <i className={PrimeIcons.BOOK} /> Religion: {voter.religion}
          </p>
          <p>
            <i className={PrimeIcons.BOOK} /> Resident:{" "}
            {voter.resident || "N/A"}
          </p>
          <p>
            <i className={PrimeIcons.BOOK} /> Living Status:{" "}
            {voter.livingStatus || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VoterDetails;
