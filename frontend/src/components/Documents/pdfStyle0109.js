import { StyleSheet } from '@react-pdf/renderer';

const pdfStyles0109 = StyleSheet.create({
  textTop: {
    position: 'absolute',
    fontFamily: 'Arial',
    fontSize: 12,
  },
  vehicleRegistrationNumber: {
    top: 180,
    left: 200,
  },
  date: {
    top: 183,
    left: 150,
  },
  Time: {
    top: 197,
    left: 150,
  },
  location: {
    top: 212,
    left: 150,
  },
  ObserversName: {
    top: 225,
    left: 150,
  },
  UnsafeAct: {
    top: 269,
    left: 177,
  },
  UnsafeCondition: {
    top: 282,
    left: 177,
  },
  HealthHazard: {
    top: 269,
    left: 347,
  },
  SafeObservation: {
    top: 282,
    left: 347,
  },
  EnvironmentalRisk: {
    top: 277,
    left: 495,
  },
  DescriptionField: {
    position: 'absolute',
    top: 327,
    left: 52,
    height: 126,
    width: 483,
    alignItems: 'left',
    // backgroundColor: '#000000',
  },
  ImageDescriptionField: {
    alignItems: 'left',
    height: 100,
    width: 200,
  },
  AllText: {
    fontFamily: 'Arial',
    fontSize: 9,
    margin: 1,
  },
  ContainmentActionField: {
    position: 'absolute',
    top: 485,
    left: 52,
    height: 69,
    width: 483,
    alignItems: 'left',
  },
  ProposedField: {
    position: 'absolute',
    top: 585,
    left: 52,
    height: 84,
    width: 483,
    alignItems: 'left',
  },
  MileageReadingKM: {
    top: 200,
    left: 200,
  },
  NextMaintenanceMileage_KM: {
    top: 220,
    left: 200,
  },
  NextOXYInspectionDate: {
    top: 240,
    left: 230,
  },

  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderColor: '#0000',
    borderWidth: 0.7,
    borderRightWidth: 0.2,
    borderBottomWidth: 0.2,
    marginLeft: 50,
    marginRight: 40,
    marginTop: 20,
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCol: {
    width: '33%',
    borderStyle: 'solid',
    borderColor: '#0000',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.7,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableColQuesComm: {
    width: '33%',
    borderStyle: 'solid',
    borderColor: '#0000',
    justifyContent: 'center',
    alignItems: 'left',
    borderWidth: 0.7,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: 5,
    fontSize: 9,
    fontFamily: 'Arial',
    justifyContent: 'center',
    alignItems: 'center',
  },
  HeaderTableRow: {
    flexDirection: 'row',
    height: 35,
    backgroundColor: '#bfbfbf',
  },
  HeaderText: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 9,
    fontFamily: 'Arialbold',
  },
  NameSign: {
    justifyContent: 'left',
    alignItems: 'left',
    marginLeft: 50,
    marginRight: 40,
    marginTop: 20,
    marginBottom: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  NameSign2: {
    fontSize: 9,
    margin: 3,
    fontFamily: 'Arial',
  },
  underlinedText: {
    fontSize: 12,
    fontFamily: 'Arial',
    borderBottomWidth: 1,
  },
});

export default pdfStyles0109;
