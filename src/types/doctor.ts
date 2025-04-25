
export interface Doctor {
  id: string;
  name: string;
  specialty: string[];
  fee: number;
  city: string;
  clinicName: string;
  experience: number;
  photo: string;
  videoConsult: boolean;
  inClinic: boolean;
}
