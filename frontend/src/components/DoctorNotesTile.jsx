import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import SearchBar from './SearchBar';

function DoctorNotesPane() {

    const [doctorNotes, setDoctorNotes] = useState("Doctor's notes will be displayed after the doctor-patient conversation has ended.");  // State to store the fetched notes
    const [loading, setLoading] = useState(true); // State to track loading
    const [error, setError] = useState(null); // State to track error


    return (
    <div className="doctor-notes-pane" >
        <div style={{ width: '50%' }}>
            <SearchBar />
        </div>
        <Card className="doctor-notes-card">
        <Card.Body>
            <Card.Title className="text-primary">Doctor's Notes</Card.Title>
            <Card.Text>
                <p> Hello </p>
            </Card.Text>
        </Card.Body>
        </Card>
    </div>
    );
}

export default DoctorNotesPane;
