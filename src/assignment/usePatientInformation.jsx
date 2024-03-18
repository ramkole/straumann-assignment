import { useEffect, useState } from "react";

// Custom Hook to get patients list and filter bases on slider range
export const usePatientInformation = (minAge, maxAge) => {
    const [patients, setPatients] = useState([]);
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchPatients = async () => {
        try {
          const response = await fetch(
            "https://hapi.fhir.org/baseR4/Patient?_pretty=true"
          );
          const data = await response.json();
          setPatients(data.entry);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching patient information:", error);
          setLoading(false);
        }
      };
  
      fetchPatients();
    }, []);
  
    useEffect(() => {
      const currentDate = new Date();
      const filteredPatientsByAge = patients.filter((patient) => {
        const birthDate = new Date(patient.resource.birthDate);
        const age = currentDate.getFullYear() - birthDate.getFullYear();
        return age >= minAge && age <= maxAge;
      });
  
      const remainingPatients = patients.filter(
        (patient) => !patient.resource.birthDate
      );
      const finalPatientList = [...filteredPatientsByAge, ...remainingPatients];
  
      setFilteredPatients(finalPatientList);
    }, [patients, minAge, maxAge]);
  
    return { filteredPatients, loading };
  };

  