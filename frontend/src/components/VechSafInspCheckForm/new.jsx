const questions = [
  'All vehicle lights are functioning',
  'Vehicle monitoring system (IVMS) is ok',
  'Brake fluid level is ok',
  'Engine oil level is ok',
  'Radiator coolant level is ok',
  'Windshield wiper/Washer fluid is ok',
  'Drinking water available inside',
  'Tire Pressure (including spare) is ok',
  'Fire extinguisher is available and pressurized',
  'First aid kit is available and contents not expired',
  'Reflective jacket is available',
  'Reflective triangle is available',
  'Jack and wheel wrench are available',
  'OXY inspection sticker is valid',
  'Maintenance status is ok',
];

  <Table>
    <TableHead>
      <TableRow>
        <TableCell align="center" sx={{ border: 1 }}><h2>#</h2></TableCell>
        <TableCell sx={{ border: 1 }}><h2>Item Inspected</h2></TableCell>
        <TableCell sx={{ border: 1 }}><h2>Yes</h2></TableCell>
        <TableCell sx={{ border: 1 }}><h2>No</h2></TableCell>
        <TableCell sx={{ border: 1 }}><h2>N/A</h2></TableCell>
        <TableCell sx={{ border: 1 }}><h2>Comments</h2></TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {questions && questions.map((elem, index) => (
        <TableRow key={index}>
          <TableCell align="center" sx={{ border: 1 }}>{index + 1}</TableCell>
          <TableCell sx={{ border: 1 }}>{elem}</TableCell>
          <TableCell sx={{ border: 1 }}>
            <RadioGroup
              row
              aria-label="yes"
              name={`${index}.condition`}
              value={formik.values[index]?.condition}
              onChange={formik.handleChange}
            >
              <FormControlLabel value="yes" control={<Radio />} label="" />
            </RadioGroup>
          </TableCell>
          <TableCell sx={{ border: 1 }}>
            <RadioGroup
              row
              aria-label="no"
              name={`${index}.condition`}
              value={formik.values[index]?.condition}
              onChange={formik.handleChange}
            >
              <FormControlLabel value="no" control={<Radio />} label="" />
            </RadioGroup>
          </TableCell>
          <TableCell sx={{ border: 1 }}>
            <RadioGroup
              row
              aria-label="na"
              name={`${index}.condition`}
              value={formik.values[index]?.condition}
              onChange={formik.handleChange}
            >
              <FormControlLabel value="na" control={<Radio />} label="" />
            </RadioGroup>
          </TableCell>
          <TableCell sx={{ border: 1 }}>
            <TextField
              name={`${index}.actionsNeeded`}
              value={formik.values[index]?.actionsNeeded}
              onChange={formik.handleChange}
              error={formik.touched[`${index}`]?.actionsNeeded && Boolean(formik.errors[`${index}`]?.actionsNeeded)}
              helperText={formik.touched[`${index}`]?.actionsNeeded && formik.errors[`${index}`]?.actionsNeeded}
            />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>;
