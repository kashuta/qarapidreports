/* eslint-disable react/react-in-jsx-scope */
import { useParams } from 'react-router-dom';
import MonthSafCheck from './MonthSafCheck';
import VechSafInspCheckForm from './VechSafInspCheckForm';
import ForkliftForm from './ForkliftForm';
import HSEObservationForm from './HSEObservationForm';
import MeetingForm from './MeetingForm';

function Forms({ location }) {
  const { formId } = useParams();
  return (
    <>
      {formId === '1' && <MonthSafCheck location={location} />}
      {formId === '2' && <VechSafInspCheckForm location={location} />}
      {formId === '3' && <ForkliftForm location={location} />}
      {formId === '4' && <HSEObservationForm location={location} />}
      {formId === '5' && <MeetingForm location={location} />}
      {/* <Outlet /> */}
    </>
  );
}

export default Forms;
