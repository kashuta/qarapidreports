/* eslint-disable react/react-in-jsx-scope */
import { useParams } from 'react-router-dom';
import MonthSafCheck from './MonthSafCheck';
import VechSafInspCheckForm from './VechSafInspCheckForm';
import ForkliftForm from './ForkliftForm';
import HSEObservationForm from './HSEObservationForm';
import MeetingForm from './MeetingForm';

function Forms() {
  const { formId } = useParams();
  return (
    <>
      {formId === '1' && <MonthSafCheck />}
      {formId === '2' && <VechSafInspCheckForm />}
      {formId === '3' && <ForkliftForm />}
      {formId === '4' && <HSEObservationForm />}
      {formId === '5' && <MeetingForm />}
      {/* <Outlet /> */}
    </>
  );
}

export default Forms;
