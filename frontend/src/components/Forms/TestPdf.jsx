import React from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import Document0024 from '../Documents/Document0024';

function TestPdf() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      {' '}
      <PDFViewer style={{
        height: '100%',
        width: '69.7%',
      }}>
        <Document0024 />
      </PDFViewer>
    </div>
  );
}

export default TestPdf;
