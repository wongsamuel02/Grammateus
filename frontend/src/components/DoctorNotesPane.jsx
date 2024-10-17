import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import SearchBar from './SearchBar';

function DoctorNotesPane() {

    const [doctorNotes] = useState("Doctor's notes will be displayed after the doctor-patient conversation has ended.");  // State to store the fetched notes
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);


    return (
    <div className="doctor-notes-pane" >
        <div style={{ width: '50%' }}>
            <SearchBar />
        </div>
        <Card className="doctor-notes-card">
        <Card.Body>
            <Card.Title className="text-primary">Doctor's Notes</Card.Title>
            <Card.Text>
            <p> {doctorNotes} </p>
            </Card.Text>
            <div>

            </div>
        </Card.Body>
        </Card>
    </div>
    );
}

export default DoctorNotesPane;
