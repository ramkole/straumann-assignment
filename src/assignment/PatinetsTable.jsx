import { useEffect, useState } from "react";
import MultiRangeSlider from "./MultirangeSlider";

import "./multiRangeSlider.css";
import { usePatientInformation } from './usePatientInformation';
 

const PatientsTable = () => {
  const [minAge, setMinAge] = useState(0);
  const [maxAge, setMaxAge] = useState(100);
  const { filteredPatients, loading } = usePatientInformation(minAge, maxAge);

  useEffect(() => {}, filteredPatients);

  const handleChange = ({ min, max }) => {
    setMinAge(min);
    setMaxAge(max);
  };
  return (
    <div>
      {/** custom slider to have range from both way  */}
      <MultiRangeSlider min={0} max={100} onChange={handleChange} />
      {loading && <p>Loading..</p>}
      <table className="patient-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Gender</th>
            <th>BirthDate</th>
            <th>Address</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients &&
            filteredPatients.map((record, index) => {
              const { id, name, gender, birthDate, address, telecom } =
                record.resource;

              const fullName = name && `${name[0].given[0]} ${name[0].family}`;

              const phoneNumber = telecom && telecom[0].value;

              return (
                <tr key={index}>
                  <td>{id}</td>
                  <td>{fullName}</td>

                  <td>{gender ? gender : "Not Avilabel"}</td>
                  <td>{birthDate}</td>
                  <td>
                    {address &&
                      `${address[0].line[0]}, ${address[0].city}, ${address[0].state},
                    ${address[0].postalCode}, ${address[0].country}`}
                  </td>

                  <td>{phoneNumber}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default PatientsTable;
