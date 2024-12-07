import React from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'; // Import custom CSS for additional styling
import PatientTranscriptionPane from '../components/PatientTranscriptionPane';
import DoctorNotesPane from '../components/DoctorNotesPane';
import LogoutButton from '../components/LogoutButton';
import SearchBar from '../components/SearchBar';

function HomePage() {
  return (
    <div style={{ height: '100%' }}>
      <SearchBar style={{ height: '50px' }} />
      <div className="app-container">
        <PanelGroup direction="horizontal">
          <Panel defaultSize={25} className="panel-content">
            <div className="panel-inner bg-light rounded">
              <PatientTranscriptionPane />
            </div>
          </Panel>

          <PanelResizeHandle className="resize-handle-vertical" />
          <Panel className="panel-content">
            <PanelGroup direction="vertical">
              <Panel defaultSize={80} className="panel-content">
                <div className="panel-inner bg-white rounded">
                  <DoctorNotesPane />
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
