
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Doctor } from "@/types/doctor";

interface FilterPanelProps {
  doctors: Doctor[];
  onFilterChange: (filters: {
    consultType: string[] | null;
    specialties: string[] | null;
    sortBy: string | null;
  }) => void;
}

const FilterPanel = ({ doctors, onFilterChange }: FilterPanelProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Get all unique specialties from doctors data
  const allSpecialties = Array.from(
    new Set(doctors.flatMap((doctor) => doctor.specialty))
  ).sort();

  // Initialize state from URL params
  const [consultType, setConsultType] = useState<string>(
    searchParams.get("consultType") || ""
  );
  
  const initialSpecialties = searchParams.getAll("specialty") || [];
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>(initialSpecialties);
  
  const [sortBy, setSortBy] = useState<string>(
    searchParams.get("sortBy") || ""
  );

  // Update filters when they change
  useEffect(() => {
    onFilterChange({
      consultType: consultType ? [consultType] : null,
      specialties: selectedSpecialties.length ? selectedSpecialties : null,
      sortBy: sortBy || null,
    });

    // Update URL params
    const params = new URLSearchParams(searchParams.toString());

    // Handle consultation type
    if (consultType) {
      params.set("consultType", consultType);
    } else {
      params.delete("consultType");
    }

    // Handle specialties (multiple selections)
    params.delete("specialty");
    selectedSpecialties.forEach(specialty => {
      params.append("specialty", specialty);
    });

    // Handle sort parameter
    if (sortBy) {
      params.set("sortBy", sortBy);
    } else {
      params.delete("sortBy");
    }

    setSearchParams(params);
  }, [consultType, selectedSpecialties, sortBy, onFilterChange, searchParams, setSearchParams]);

  const handleConsultTypeChange = (value: string) => {
    setConsultType(value === consultType ? "" : value);
  };

  const handleSpecialtyChange = (specialty: string) => {
    setSelectedSpecialties(prev => {
      if (prev.includes(specialty)) {
        return prev.filter(s => s !== specialty);
      } else {
        return [...prev, specialty];
      }
    });
  };

  const handleSortChange = (value: string) => {
    setSortBy(value === sortBy ? "" : value);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      {/* Consultation Type Filter */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2" data-testid="filter-header-moc">Consultation Mode</h3>
        <div className="space-y-2">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              checked={consultType === "videoConsult"}
              onChange={() => handleConsultTypeChange("videoConsult")}
              data-testid="filter-video-consult"
              className="h-4 w-4 text-blue-500"
            />
            <span>Video Consult</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              checked={consultType === "inClinic"}
              onChange={() => handleConsultTypeChange("inClinic")}
              data-testid="filter-in-clinic"
              className="h-4 w-4 text-blue-500"
            />
            <span>In Clinic</span>
          </label>
        </div>
      </div>

      {/* Specialties Filter */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2" data-testid="filter-header-speciality">Speciality</h3>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {allSpecialties.map((specialty) => (
            <label key={specialty} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedSpecialties.includes(specialty)}
                onChange={() => handleSpecialtyChange(specialty)}
                data-testid={`filter-specialty-${specialty.replace("/", "-")}`}
                className="h-4 w-4 text-blue-500 rounded"
              />
              <span>{specialty}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Sort Filter */}
      <div>
        <h3 className="text-lg font-medium mb-2" data-testid="filter-header-sort">Sort</h3>
        <div className="space-y-2">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              checked={sortBy === "fees"}
              onChange={() => handleSortChange("fees")}
              data-testid="sort-fees"
              className="h-4 w-4 text-blue-500"
            />
            <span>Fees: Low to High</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              checked={sortBy === "experience"}
              onChange={() => handleSortChange("experience")}
              data-testid="sort-experience"
              className="h-4 w-4 text-blue-500"
            />
            <span>Experience: High to Low</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
