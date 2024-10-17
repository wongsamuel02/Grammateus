import React from 'react';
import { Form, Button } from 'react-bootstrap';

function SearchBar() {
    return (
      <Form className="search-bar d-flex mb-3">
        <Form.Group controlId="search" className="flex-grow-1 me-2">
          <Form.Control type="text" placeholder="Search for patient..." />
        </Form.Group>
        <Button variant="primary" type="submit">
          Search
        </Button>
      </Form>
    );
  }

export default SearchBar;
