
import React from "react";
import { Doctor } from "@/types/doctor";

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard = ({ doctor }: DoctorCardProps) => {
  return (
    <div 
      className="bg-white p-4 rounded-lg shadow-md flex flex-col md:flex-row gap-4 border border-gray-100"
      data-testid="doctor-card"
    >
      <div className="w-full md:w-32 h-32 flex-shrink-0">
        <img
          src={doctor.photo || "/placeholder.svg"}
          alt={doctor.name}
          className="w-full h-full object-cover rounded-md"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/placeholder.svg";
          }}
        />
      </div>
      
      <div className="flex-1">
        <h2 
          className="text-xl font-semibold text-gray-800 mb-1"
          data-testid="doctor-name"
        >
          {doctor.name}
        </h2>
        
        <div 
          className="text-sm text-gray-600 mb-2"
          data-testid="doctor-specialty"
        >
          {doctor.specialty.join(", ")}
        </div>
        
        <div className="flex flex-wrap gap-4 mt-3">
          <div>
            <span className="text-gray-500 text-sm">Experience:</span> 
            <span 
              className="ml-1 font-medium"
              data-testid="doctor-experience"
            >
              {doctor.experience} years
            </span>
          </div>
          
          <div>
            <span className="text-gray-500 text-sm">Fee:</span> 
            <span 
              className="ml-1 font-medium"
              data-testid="doctor-fee"
            >
              ₹{doctor.fee}
            </span>
          </div>
        </div>
        
        <div className="mt-3 flex flex-wrap gap-2">
          {doctor.inClinic && (
            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
              In Clinic
            </span>
          )}
          {doctor.videoConsult && (
            <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
              Video Consult
            </span>
          )}
        </div>
        
        <div className="text-gray-500 text-sm mt-2">
          {doctor.clinicName}, {doctor.city}
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
