import React, { useState } from 'react';
import { Form, Button, ListGroup } from 'react-bootstrap';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([
    {
      "_id": "1",
      "name": "John Doe",
      "dob": "1990-01-15",
      "gender": "Female"
    },
    {
      "_id": "2",
      "name": "Jane Smith",
      "dob": "1985-05-30",
      "gender": "Female"
    },
    {
      "_id": "3",
      "name": "Michael Johnson",
      "dob": "1978-11-23",
      "gender": "Male"
    }
  ]);

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchTerm(query);

    if (query.trim()) {
      try {
        const response = await fetch(`/api/patients/search?q=${query}`);
        const data = await response.json();
        setSuggestions(data);
      } catch (error) {
        console.error('Error fetching search suggestions:', error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Search submitted:', searchTerm);
  };

  return (
    <div style={{ position: 'relative', margin: '0.5% 20%' }}>
      <Form className="search-bar d-flex" onSubmit={handleSubmit}>
        <Form.Group controlId="search" className="flex-grow-1 me-2">
          <Form.Control
            type="text"
            placeholder="Search for patient..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Search
        </Button>
      </Form>
      {suggestions.length > 0 && (
        <ListGroup className="mt-2">
          {suggestions.map((patient) => (
            <ListGroup.Item key={patient._id}>
              <div
                className="patient-row"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  columnGap: '1rem'
                }}
              >
                <span>{patient.name}</span>
                <span>DOB: {patient.dob}</span>
                <span>Gender: {patient.gender}</span>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
}

export default SearchBar;
