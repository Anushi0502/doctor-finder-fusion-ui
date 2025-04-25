
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
      
      // Insert the data into Supabase with correct field mapping
      const { error } = await supabase
        .from('doctors')
        .insert(apiData.map(doctor => ({
          id: doctor.id,
          name: doctor.name,
          specialty: Array.isArray(doctor.specialty) ? doctor.specialty : [doctor.specialty],
          fee: doctor.fee,
          city: doctor.city,
          clinic_name: doctor.clinicName,
          experience: doctor.experience,
          photo: doctor.photo,
          video_consult: doctor.videoConsult,
          in_clinic: doctor.inClinic
        })));
        
      if (error) throw error;
      return apiData;
    }

    // Convert Supabase data structure to match our Doctor type
    return (existingDoctors || []).map(doctor => ({
      id: doctor.id,
      name: doctor.name,
      specialty: doctor.specialty,
      fee: doctor.fee,
      city: doctor.city,
      clinicName: doctor.clinic_name,
      experience: doctor.experience,
      photo: doctor.photo || "",
      videoConsult: doctor.video_consult || false,
      inClinic: doctor.in_clinic || false
    }));
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return [];
  }
}
