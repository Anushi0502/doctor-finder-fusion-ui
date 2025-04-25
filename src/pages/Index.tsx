
import DoctorListing from "@/components/DoctorListing";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";

const Index = () => {
  const { toast } = useToast();

  useEffect(() => {
    // Welcome toast when the page loads
    toast({
      title: "Welcome to Doctor Finder",
      description: "Find and filter doctors based on your preferences",
      duration: 5000,
    });
  }, [toast]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto max-w-6xl py-4 px-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Doctor Finder</h1>
          <p className="text-gray-600 mt-1">Find the right specialist for your needs</p>
        </div>
      </header>
      <DoctorListing />
    </div>
  );
};

export default Index;
