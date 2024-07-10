"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useEffect, useState } from "react";
import AboutUs from "./AboutUs";
import DeliveryAndShippingPolicy from "./DeliveryAndShippingPolicy";
import Policy from "./Policy";
import CancellationReturnPolicy from "./CancellationReturnPolicy";

const Page = () => {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="ABOUT US" value="1" />
            <Tab label="DELIVERY" value="2" />
            <Tab label="POLICY" value="3" />
            <Tab label="RETURN" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1">
          {" "}
          <AboutUs />
        </TabPanel>
        <TabPanel value="2">
          <DeliveryAndShippingPolicy />
        </TabPanel>
        <TabPanel value="3">
          <Policy />
        </TabPanel>
        <TabPanel value="4">
          <CancellationReturnPolicy />
        </TabPanel>
      </TabContext>
    </Box>
  );
};
export default Page;
