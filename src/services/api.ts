
import { supabase } from "@/integrations/supabase/client";
import { Doctor } from "../types/doctor";

export async function fetchDoctors(): Promise<Doctor[]> {
  try {
    // Load initial data from external API if table is empty
    const { data: existingDoctors, count } = await supabase
      .from('doctors')
      .select('*', { count: 'exact' });

    if (count === 0) {
      // Fetch from external API and populate Supabase
      const response = await fetch("https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const apiData: Doctor[] = await response.json();
      
      // Insert the data into Supabase
      const { error } = await supabase
        .from('doctors')
        .insert(apiData.map(doctor => ({
          ...doctor,
          specialty: Array.isArray(doctor.specialty) ? doctor.specialty : [doctor.specialty]
        })));
        
      if (error) throw error;
      return apiData;
    }

    return existingDoctors || [];
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return [];
  }
}
