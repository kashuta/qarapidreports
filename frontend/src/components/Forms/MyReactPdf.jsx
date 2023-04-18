import React, { useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Container } from '@mui/material';
import Document0024 from '../Documents/Document0024';
import Document0109 from '../Documents/Document0109';
import Document0144 from '../Documents/Document0144';
import Document0176 from '../Documents/Document0176';
import Document0320 from '../Documents/Document0320';

function DownloadPDFButton() {
  const [documentReady, setDocumentReady] = useState(false);

  const handleClick = () => {
    setDocumentReady(true);
  };
  return (
    <Container>
      <Container>
        {documentReady ? (
          <Container>
            <PDFDownloadLink
              document={<Document0024 />}
              fileName="0024.pdf"
              style={{
                textDecoration: 'none',
                padding: '10px',
                color: '#4a4a4a',
                backgroundColor: '#f2f2f2',
                border: '1px solid #4a4a4a',
              }}>
              {({ loading }) => (loading ? 'Загрузка' : 'download 024')}
            </PDFDownloadLink>
          </Container>
        ) : (
          <button
            onClick={handleClick}
            style={{
              textDecoration: 'none',
              padding: '10px',
              color: '#4a4a4a',
              backgroundColor: '#f2f2f2',
              border: '1px solid #4a4a4a',
            }}>
            download 024
          </button>
        )}
      </Container>

      <br />
      <br />

      <Container>
        <PDFDownloadLink
          document={<Document0109 />}
          fileName="0109.pdf"
          style={{
            textDecoration: 'none',
            padding: '10px',
            color: '#4a4a4a',
            backgroundColor: '#f2f2f2',
            border: '1px solid #4a4a4a',
          }}
    >
          {({ loading }) => (loading ? 'Загрузка документа...' : 'download 109')}
        </PDFDownloadLink>
      </Container>

      <br />
      <br />

      <Container>
        <PDFDownloadLink
          document={<Document0144 />}
          fileName="0144.pdf"
          style={{
            textDecoration: 'none',
            padding: '10px',
            color: '#4a4a4a',
            backgroundColor: '#f2f2f2',
            border: '1px solid #4a4a4a',
          }}
    >
          {({ loading }) => (loading ? 'Загрузка документа...' : 'download 144')}
        </PDFDownloadLink>
      </Container>

      <br />
      <br />

      <Container>
        <PDFDownloadLink
          document={<Document0176 />}
          fileName="0176.pdf"
          style={{
            textDecoration: 'none',
            padding: '10px',
            color: '#4a4a4a',
            backgroundColor: '#f2f2f2',
            border: '1px solid #4a4a4a',
          }}
    >
          {({ loading }) => (loading ? 'Загрузка документа...' : 'download 176')}
        </PDFDownloadLink>
      </Container>

      <br />
      <br />

      <Container>
        <PDFDownloadLink
          document={<Document0320 />}
          fileName="0320.pdf"
          style={{
            textDecoration: 'none',
            padding: '10px',
            color: '#4a4a4a',
            backgroundColor: '#f2f2f2',
            border: '1px solid #4a4a4a',
          }}
    >
          {({ loading }) => (loading ? 'Загрузка документа...' : 'download 320')}
        </PDFDownloadLink>
      </Container>

    </Container>
  );
}

function MyReactPdf() {
  return (
    <div>
      <h1>Создание PDF с React-PDF</h1>
      <DownloadPDFButton />
    </div>
  );
}

export default MyReactPdf;
