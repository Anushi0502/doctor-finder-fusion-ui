
import React, { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Doctor } from "@/types/doctor";

interface SearchBarProps {
  doctors: Doctor[];
  onSearch: (query: string) => void;
}

const SearchBar = ({ doctors, onSearch }: SearchBarProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query") || "");
  const [suggestions, setSuggestions] = useState<Doctor[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.trim()) {
      const filtered = doctors
        .filter((doctor) => 
          doctor.name.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 3);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      onSearch("");
    }
  };

  const handleSuggestionClick = (name: string) => {
    setQuery(name);
    setSuggestions([]);
    setShowSuggestions(false);
    onSearch(name);
    
    // Update URL with search query
    const updatedParams = new URLSearchParams(searchParams.toString());
    updatedParams.set("query", name);
    setSearchParams(updatedParams);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false);
    onSearch(query);
    
    // Update URL with search query
    const updatedParams = new URLSearchParams(searchParams.toString());
    if (query) {
      updatedParams.set("query", query);
    } else {
      updatedParams.delete("query");
    }
    setSearchParams(updatedParams);
  };

  return (
    <div 
      ref={wrapperRef} 
      className="relative w-full max-w-xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="w-full">
        <input
          type="text"
          placeholder="Search doctors by name..."
          value={query}
          onChange={handleInputChange}
          data-testid="autocomplete-input"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </form>
      
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          {suggestions.map((doctor) => (
            <div
              key={doctor.id}
              onClick={() => handleSuggestionClick(doctor.name)}
              data-testid="suggestion-item"
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              {doctor.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
