import { StyleSheet } from '@react-pdf/renderer';

const pdfStyles0320 = StyleSheet.create({
  textTop: {
    position: 'absolute',
    fontFamily: 'Arial',
    fontSize: 12,
  },

  Country: {
    top: 140,
    left: 200,
  },
  location: {
    top: 140,
    left: 200,
  },
  vehicleRegistrationNumber: {
    top: 160,
    left: 200,
  },
  date: {
    top: 180,
    left: 200,
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

export default pdfStyles0320;
