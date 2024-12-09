import { React, useState, useEffect } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'; // Import custom CSS for additional styling
import PatientTranscriptionPane from '../components/PatientTranscriptionPane';
import DoctorNotesPane from '../components/DoctorNotesPane';
import LogoutButton from '../components/LogoutButton';
import SearchBar from '../components/SearchBar';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

function HomePage() {
  const [selectedPatient, setSelectedPatient] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const [doctorEmail, setDoctorEmail] = useState('');
  const [updateTrigger, setUpdateTrigger] = useState(0);

  useEffect(() => {
    const getDoctorEmail = async () => {
      try {
        const response = await axiosPrivate(`/isVerified`);
        const data = response.data.email;
        console.log(response);
        setDoctorEmail(data);
      } catch (error) {
        console.error('Error fetching doctor email', error);
      }
    };

    getDoctorEmail();
  }, []);

  const handleUpdate = (newValue) => {
    setSelectedPatient(newValue);
    console.log('Updated Value:', newValue);
  };

  return (
    <div style={{ height: '100%' }}>
      <SearchBar style={{ height: '50px' }} updateSearchSelection={handleUpdate} />
      <div className="app-container">
        <PanelGroup direction="horizontal">
          <Panel defaultSize={28} className="panel-content">
            <div className="panel-inner bg-light rounded">
              <h2>Previous Trancriptions</h2>
              <PatientTranscriptionPane patientTranscription={selectedPatient.email} selectedPatient={selectedPatient} updateTrigger={updateTrigger} />
            </div>
          </Panel>

          <PanelResizeHandle className="resize-handle-vertical" />
          <Panel className="panel-content">
            <PanelGroup direction="vertical">
              <Panel defaultSize={72} className="panel-content">
                <div className="panel-inner bg-white rounded">
                  <DoctorNotesPane selectedPatient={selectedPatient} doctorEmail={doctorEmail} setUpdateTrigger={setUpdateTrigger} />
                  <LogoutButton />
                </div>
              </Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
}


export default HomePage;
