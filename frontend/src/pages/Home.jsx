import React from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../App.css'; // Import custom CSS for additional styling
import PatientTranscriptionPane from '../components/PatientTranscriptionPane';
import DoctorNotesPane from '../components/DoctorNotesPane';
import PastHistoryPane from '../components/PastHistoryPane';

function HomePage() {
  return (
    <div className="app-container">
      <PanelGroup direction="horizontal">
        {/* Left Vertical Panel */}
        <Panel defaultSize={25} className="panel-content">
          <div className="panel-inner bg-light rounded">
            <PatientTranscriptionPane />
          </div>
        </Panel>

        {/* Vertical Resize Handle */}
        <PanelResizeHandle className="resize-handle-vertical" />

        {/* Right Panels (Top and Bottom) */}
        <Panel className="panel-content">
          <PanelGroup direction="vertical">
            {/* Top Panel */}
            <Panel defaultSize={80} className="panel-content">
              <div className="panel-inner bg-white rounded">
              <DoctorNotesPane />
              </div>
            </Panel>

            {/* Horizontal Resize Handle */}
            <PanelResizeHandle className="resize-handle-horizontal" />

            {/* Bottom Panel */}
            <Panel className="panel-content">
              <div className="panel-inner bg-white rounded">
                <PastHistoryPane />
              </div>
            </Panel>
          </PanelGroup>
        </Panel>
      </PanelGroup>
    </div>
  );
}

export default HomePage;
