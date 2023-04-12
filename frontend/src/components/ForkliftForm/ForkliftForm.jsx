/* eslint-disable max-len */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  Button,
  Box,
  Container,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

const engineOffChecklist = [
  {
    item: 'Fuel',
    hint: 'Leaks, Level',
  },
  {
    item: 'Hydraulic Oil',
    hint: 'Leaks, Level',
  },
  {
    item: 'Engine Oil',
    hint: 'Leaks, Level',
  },
  {
    item: 'Radiator Coolant',
    hint: 'Leaks, Level',
  },
  {
    item: 'Transmission Fluid',
    hint: 'Leaks, Level',
  },
  {
    item: 'Tires',
    hint: 'Condition and Pressure',
  },
  {
    item: 'Forks',
    hint: 'Visual Check',
  },
  {
    item: 'Mast Chains and hoses',
    hint: 'Visual Check, Leaks, Damage',
  },
  {
    item: 'Overhead Guard',
    hint: 'Attached, Damage',
  },
  {
    item: 'Battery',
    hint: 'Check Condition',
  },
  {
    item: 'Engine Belt',
    hint: 'Cracked, Damage, Visual Check',
  },
  {
    item: 'Air filter',
    hint: 'Visually check condition',
  },
];

const engineOnChecklist = [
  {
    item: 'Accelerator or Direction Control Pedal',
    hint: 'Functioning Smoothly and Properly',
  },
  {
    item: 'Service Brake',
    hint: 'Functioning Smoothly and Properly',
  },
  {
    item: 'Parking Brake',
    hint: 'Functioning Smoothly and Properly',
  },
  {
    item: 'Steering Operation',
    hint: 'Functioning Smoothly and Properly',
  },
  {
    item: 'Drive Control – Forward/Reverse',
    hint: 'Functioning Smoothly and Properly',
  },
  {
    item: 'Tilt Control – Forward and Back',
    hint: 'Functioning Smoothly and Properly',
  },
  {
    item: 'Hoist and Lowering Control',
    hint: 'Functioning Smoothly and Properly',
  },
  {
    item: 'Horn and Lights',
    hint: 'Functioning Properly',
  },
  {
    item: 'Gauges: Speed, Oil, Hours, Fuel, Temp.',
    hint: 'Functioning Properly',
  },
];

const engineOffValues = {};
for (const item of engineOffChecklist) {
  engineOffValues[item.item] = {
    condition: 'ok',
    actionsNeeded: '',
  };
}

const engineOffValidation = {};
for (const item of engineOffChecklist) {
  engineOffValidation[item.item] = yup.object({
    condition: yup.string(),
    actionsNeeded: yup
      .string()
      .when('condition', {
        is: 'nok',
        then: (schema) => schema.required('Please, fill this field'),
      }),
  });
}

const engineOnValues = {};
for (const item of engineOnChecklist) {
  engineOnValues[item.item] = {
    condition: 'ok',
    actionsNeeded: '',
  };
}

const engineOnValidation = {};
for (const item of engineOnChecklist) {
  engineOnValidation[item.item] = yup.object({
    condition: yup.string(),
    actionsNeeded: yup
      .string()
      .when('condition', {
        is: 'nok',
        then: (schema) => schema.required('Please, fill this field'),
      }),
  });
}

const validationSchema = yup.object({
  ...engineOffValidation,
  ...engineOnValidation,
  location: yup
    .string('Enter location')
    .required('Please, fill this field'),
  operator: yup
    .string('Enter operator name')
    .required('Please, fill this field'),
  machineHours: yup
    .number('Enter number')
    .typeError('Value must be a number')
    .positive('Enter positive number')
    .required('Please, fill this field'),
  regNumber: yup
    .string()
    .required('Please, fill this field'),
  signature: yup
    .string()
    .required('Please, fill this field'),
});

function ForkliftForm({ location }) {
  const formik = useFormik({
    initialValues: {
      ...engineOffValues,
      ...engineOnValues,
      location,
      operator: '',
      date: dayjs(new Date()),
      machineHours: '',
      regNumber: '',
      signature: '',
    },
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Container>
      <form onSubmit={formik.handleSubmit}>
        <h1>Forklift safety inspection checklist</h1>
        <Box>
          <h2>Truck and operator details</h2>
          <TextField
            id="location"
            name="location"
            label="Location"
            value={formik.values.location}
            onChange={formik.handleChange}
            onBlur={(e) => formik.setFieldTouched(e.target.name)}
            error={formik.touched.location && Boolean(formik.errors.location)}
            helperText={formik.touched.location && formik.errors.location}
          />
          <DatePicker
            label="Date"
            name="date"
            value={formik.values.date}
            onChange={((value) => (formik.setValues({ ...formik.values, date: value })))}
          />

          <TextField
            id="operator"
            name="operator"
            label="Operator"
            value={formik.values.operator}
            onChange={formik.handleChange}
            onBlur={(e) => formik.setFieldTouched(e.target.name)}
            error={formik.touched.operator && Boolean(formik.errors.operator)}
            helperText={formik.touched.operator && formik.errors.operator}
          />
          <TextField
            id="machineHours"
            name="machineHours"
            label="Machine hours"
            value={formik.values.machineHours}
            onChange={(e) => {
              formik.setFieldTouched(e.target.name);
              formik.handleChange(e);
            }}
            onBlur={(e) => formik.setFieldTouched(e.target.name)}
            error={formik.touched.machineHours && Boolean(formik.errors.machineHours)}
            helperText={formik.touched.machineHours && formik.errors.machineHours}
          />
          <TextField
            id="regNumber"
            name="regNumber"
            label="Registration No."
            value={formik.values.regNumber}
            onChange={formik.handleChange}
            onBlur={(e) => formik.setFieldTouched(e.target.name)}
            error={formik.touched.regNumber && Boolean(formik.errors.regNumber)}
            helperText={formik.touched.regNumber && formik.errors.regNumber}
          />
          <TextField
            id="signature"
            name="signature"
            label="Signature"
            value={formik.values.signature}
            onChange={formik.handleChange}
            onBlur={(e) => formik.setFieldTouched(e.target.name)}
            error={formik.touched.signature && Boolean(formik.errors.signature)}
            helperText={formik.touched.signature && formik.errors.signature}
          />
        </Box>
        <Box>
          <h2>Inspection</h2>
          <TableContainer component={Paper} sx={{ border: 1, alignContent: 'center' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell colSpan={6} sx={{ border: 1 }}><h3>With Engine Off</h3></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ border: 1 }}>№</TableCell>
                  <TableCell sx={{ border: 1 }}><h4>What are you inspecting?</h4></TableCell>
                  <TableCell sx={{ border: 1 }}><h4>What are you looking for?</h4></TableCell>
                  <TableCell sx={{ border: 1 }}><h4>OK</h4></TableCell>
                  <TableCell sx={{ border: 1 }}><h4>NOK</h4></TableCell>
                  <TableCell sx={{ border: 1 }}><h4>Action needed</h4></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {engineOffChecklist && engineOffChecklist?.map((elem, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ border: 1 }}>{index + 1}</TableCell>
                    <TableCell sx={{ border: 1 }}>{elem.item}</TableCell>
                    <TableCell sx={{ border: 1 }}>{elem.hint}</TableCell>
                    <TableCell sx={{ border: 1 }}>
                      <RadioGroup
                        row
                        name={`${elem.item}.condition`}
                        value={formik.values[elem.item]?.condition}
                        onChange={formik.handleChange}
                      >
                        <FormControlLabel value="ok" control={<Radio />} label="" />
                      </RadioGroup>
                    </TableCell>
                    <TableCell sx={{ border: 1 }}>
                      <RadioGroup
                        row
                        name={`${elem.item}.condition`}
                        value={formik.values[elem.item]?.condition}
                        onChange={formik.handleChange}
                      >
                        <FormControlLabel value="nok" control={<Radio />} label="" />
                      </RadioGroup>
                    </TableCell>
                    <TableCell sx={{ border: 1 }}>
                      <TextField
                        name={`${elem.item}.actionsNeeded`}
                        value={formik.values[elem.item]?.actionsNeeded}
                        onChange={formik.handleChange}
                        onBlur={(e) => formik.setFieldTouched(e.target.name)}
                        error={formik.touched[`${elem.item}`]?.actionsNeeded && Boolean(formik.errors[`${elem.item}`]?.actionsNeeded)}
                        helperText={formik.touched[`${elem.item}`]?.actionsNeeded && formik.errors[`${elem.item}`]?.actionsNeeded}
                      />
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={6} sx={{ border: 1 }}><h3>With Engine On</h3></TableCell>
                </TableRow>
                {engineOnChecklist && engineOnChecklist?.map((elem, index) => (
                  <TableRow key={index + engineOffChecklist.length}>
                    <TableCell sx={{ border: 1 }}>{index + 1 + engineOffChecklist.length}</TableCell>
                    <TableCell sx={{ border: 1 }}>{elem.item}</TableCell>
                    <TableCell sx={{ border: 1 }}>{elem.hint}</TableCell>
                    <TableCell sx={{ border: 1 }}>
                      <RadioGroup
                        row
                        name={`${elem.item}.condition`}
                        value={formik.values[elem.item]?.condition}
                        onChange={formik.handleChange}
                      >
                        <FormControlLabel value="ok" control={<Radio />} label="" />
                      </RadioGroup>
                    </TableCell>
                    <TableCell sx={{ border: 1 }}>
                      <RadioGroup
                        row
                        name={`${elem.item}.condition`}
                        value={formik.values[elem.item]?.condition}
                        onChange={formik.handleChange}
                      >
                        <FormControlLabel value="nok" control={<Radio />} label="" />
                      </RadioGroup>
                    </TableCell>
                    <TableCell sx={{ border: 1 }}>
                      <TextField
                        name={`${elem.item}.actionsNeeded`}
                        value={formik.values[elem.item]?.actionsNeeded}
                        onChange={formik.handleChange}
                        onBlur={(e) => formik.setFieldTouched(e.target.name)}
                        error={formik.touched[`${elem.item}`]?.actionsNeeded && Boolean(formik.errors[`${elem.item}`]?.actionsNeeded)}
                        helperText={formik.touched[`${elem.item}`]?.actionsNeeded && formik.errors[`${elem.item}`]?.actionsNeeded}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Button color="primary" variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </Container>
  );
}

export default ForkliftForm;
