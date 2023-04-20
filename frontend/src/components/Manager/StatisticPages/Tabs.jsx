/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MainStat from './MainStat';
import InspectorStat from './InspectorStat';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  // children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: 'background.paper',
        display: 'flex',
        height: 250,
      }}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{
          borderRight: 1,
          borderColor: 'divider',
          minWidth: '180px',
        }}>
        <Tab label="Main Stat" sx={{ fontWeight: 'bold' }} {...a11yProps(0)} />
        <Tab
          label="Inspector Stat"
          sx={{ fontWeight: 'bold' }}
          {...a11yProps(1)}
        />
        {/* <Tab label="Range Stat" {...a11yProps(2)} /> */}
      </Tabs>
      <TabPanel value={value} index={0}>
        <MainStat />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <InspectorStat />
      </TabPanel>
      {/* <TabPanel value={value} index={2}>
        Item Three
      </TabPanel> */}
    </Box>
  );
}
