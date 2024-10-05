
export interface IVoter {
    _id: string;
    fullName: string;
    votersId: string;
    town: string;
    dob: string;
    gender: string;
    polStationName: string;
    electArea: string;
    id: string;
}

export interface IResult {
    _id: string;
    _source: IVoter;
};
export interface IVoterDetail {
    fullName: string;
    fatherName: string;
    motherName: string;
    id: string;
    tel: string;
    age: number;
    dob: string;
    gender: string;
    town: string;
    idNumber: string;
    regYear: string;
    polCode: string;
    polStationName: string;
    electArea: string;
    religion: string;
    resident: string | null;
    livingStatus: string | null;
    detail: {
        picture: string;
        age: number;
    };
};