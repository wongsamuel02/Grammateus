import React from 'react';
import { Table } from 'react-bootstrap';

function PastHistoryPane() {
  const history = [
    { name: 'John Doe', gender: 'Male', age: 45, duration: '30 mins' },
    { name: 'Jane Smith', gender: 'Female', age: 30, duration: '45 mins' },
  ];

  return (
    <div className="history-pane">
      <h5 className="text-primary">Doctor's Past Patient History</h5>
      <Table hover responsive>
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Duration of Visit</th>
          </tr>
        </thead>
        <tbody>
          {history.map((patient, index) => (
            <tr key={index}>
              <td>{patient.name}</td>
              <td>{patient.gender}</td>
              <td>{patient.age}</td>
              <td>{patient.duration}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default PastHistoryPane;
