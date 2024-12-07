import React, { useState } from 'react';
import { Form, Button, ListGroup } from 'react-bootstrap';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

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
            <ListGroup.Item key={patient._id}>{patient.name}</ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
}

export default SearchBar;
