
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Doctor } from "@/types/doctor";
import { fetchDoctors } from "@/services/api";
import SearchBar from "@/components/SearchBar";
import FilterPanel from "@/components/FilterPanel";
import DoctorCard from "@/components/DoctorCard";

const DoctorListing = () => {
  const [searchParams] = useSearchParams();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Search query from URL or empty string
  const [searchQuery, setSearchQuery] = useState<string>(
    searchParams.get("query") || ""
  );

  // Filters from URL or default values
  const [filters, setFilters] = useState({
    consultType: searchParams.get("consultType")
      ? [searchParams.get("consultType") as string]
      : null,
    specialties: searchParams.getAll("specialty").length
      ? searchParams.getAll("specialty")
      : null,
    sortBy: searchParams.get("sortBy") || null,
  });

  // Fetch doctors data on component mount
  useEffect(() => {
    const loadDoctors = async () => {
      try {
        setLoading(true);
        const data = await fetchDoctors();
        setDoctors(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch doctors data. Please try again later.");
        setLoading(false);
      }
    };

    loadDoctors();
  }, []);

  // Apply filters and search whenever filters, search query, or doctors data changes
  useEffect(() => {
    if (doctors.length) {
      let result = [...doctors];

      // Apply search filter
      if (searchQuery) {
        result = result.filter((doctor) =>
          doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Apply consultation type filter
      if (filters.consultType && filters.consultType.length) {
        const filterType = filters.consultType[0];
        result = result.filter((doctor) => {
          if (filterType === "videoConsult") return doctor.videoConsult;
          if (filterType === "inClinic") return doctor.inClinic;
          return true;
        });
      }

      // Apply specialty filters
      if (filters.specialties && filters.specialties.length) {
        result = result.filter((doctor) =>
          doctor.specialty.some((s) => filters.specialties?.includes(s))
        );
      }

      // Apply sorting
      if (filters.sortBy) {
        if (filters.sortBy === "fees") {
          result.sort((a, b) => a.fee - b.fee);
        } else if (filters.sortBy === "experience") {
          result.sort((a, b) => b.experience - a.experience);
        }
      }

      setFilteredDoctors(result);
    }
  }, [filters, searchQuery, doctors]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (newFilters: {
    consultType: string[] | null;
    specialties: string[] | null;
    sortBy: string | null;
  }) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Find Doctors</h1>
        
        <div className="mb-8">
          <SearchBar doctors={doctors} onSearch={handleSearch} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <aside className="md:col-span-1">
            <FilterPanel doctors={doctors} onFilterChange={handleFilterChange} />
          </aside>
          
          <main className="md:col-span-3">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-pulse text-lg text-gray-500">Loading doctors...</div>
              </div>
            ) : error ? (
              <div className="bg-red-50 text-red-800 p-4 rounded-lg">
                {error}
              </div>
            ) : filteredDoctors.length === 0 ? (
              <div className="bg-yellow-50 text-yellow-800 p-4 rounded-lg">
                No doctors found matching your criteria. Please try different filters.
              </div>
            ) : (
              <div className="space-y-4">
                {filteredDoctors.map((doctor) => (
                  <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default DoctorListing;
