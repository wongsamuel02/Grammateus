import React, { useState } from 'react';
import { Form, Button, ListGroup } from 'react-bootstrap';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import PropTypes from 'prop-types';

function SearchBar({ updateSearchSelection }) {
  const [suggestions, setSuggestions] = useState([]);
  const [userInput, setUserInput] = useState('');
  const axiosPrivate = useAxiosPrivate();

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setUserInput(query);

    if (query.trim()) {
      try {
        const response = await axiosPrivate(`/patient/search?q=${query}`);
        const data = response.data;
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
    console.log('Search submitted:', userInput);
  };

  return (
    <div style={{ position: 'relative', margin: '0.5% 20%' }}>
      <Form className="search-bar d-flex" onSubmit={handleSubmit}>
        <Form.Group controlId="search" className="flex-grow-1 me-2">
          <Form.Control
            type="text"
            placeholder="Search for patient..."
            value={userInput}
            onChange={handleSearchChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Search
        </Button>
      </Form>
      {suggestions.length > 0 && (
        <ListGroup
          className="mt-2"
          style={{
            position: 'absolute',
            top: '100%',
            left: '0',
            right: '0',
            zIndex: 1000,
            maxHeight: '200px',
            overflowY: 'auto',
            backgroundColor: 'white',
            border: '1px solid #ccc',
            borderRadius: '5px',
          }}
        >
          {suggestions.map((patient) => (
            <ListGroup.Item
              key={patient._id}
              style={{
                cursor: 'pointer',
              }}
              onClick={() => {
                updateSearchSelection(patient);
                setUserInput(`${patient.firstName} ${patient.lastName}`);
                setSuggestions([]);
              }}
            >
              <div
                className="patient-row"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  columnGap: '1rem',
                }}
              >
                <span>{patient.firstName} {patient.lastName}</span>
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

SearchBar.propTypes = {
  updateSearchSelection: PropTypes.func.isRequired, // Add prop validation
};

export default SearchBar;
