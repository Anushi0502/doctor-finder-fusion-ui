
import React from "react";
import { Doctor } from "@/types/doctor";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, DollarSign, Video, Clock } from "lucide-react";

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard = ({ doctor }: DoctorCardProps) => {
  return (
    <Card 
      className="overflow-hidden transition-all hover:shadow-md"
      data-testid="doctor-card"
    >
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-32 h-32 flex-shrink-0 bg-gray-100 overflow-hidden">
          <img
            src={doctor.photo || "/placeholder.svg"}
            alt={doctor.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/placeholder.svg";
            }}
          />
        </div>
        
        <div className="flex-1 p-4">
          <h2 
            className="text-xl font-semibold text-gray-800 mb-1 flex items-center gap-2"
            data-testid="doctor-name"
          >
            <span>{doctor.name}</span>
            {doctor.experience > 10 && (
              <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                Top Specialist
              </Badge>
            )}
          </h2>
          
          <div 
            className="text-sm font-medium text-blue-600 mb-3"
            data-testid="doctor-specialty"
          >
            {doctor.specialty.join(", ")}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="h-4 w-4 mr-2 text-gray-500" />
              <span data-testid="doctor-experience">
                {doctor.experience} years experience
              </span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <DollarSign className="h-4 w-4 mr-2 text-gray-500" />
              <span data-testid="doctor-fee">
                ₹{doctor.fee}
              </span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="h-4 w-4 mr-2 text-gray-500" />
              <span>
                {doctor.clinicName}, {doctor.city}
              </span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="h-4 w-4 mr-2 text-gray-500" />
              <span>Available Today</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {doctor.inClinic && (
              <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100">
                In Clinic
              </Badge>
            )}
            {doctor.videoConsult && (
              <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100 flex items-center gap-1">
                <Video className="h-3 w-3" />
                Video Consult
              </Badge>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DoctorCard;
