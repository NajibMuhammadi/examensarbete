import { Box, Stack, Typography } from "@mui/material";
import { ArrowCircleUpRounded } from "@mui/icons-material";
import { TotalRevenueSeries, TotalRevenueOptions } from "./chart";
import dynamic from "next/dynamic";
import PropertyReferrals from "./PropertyReferrals";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const TotalRevenue = () => {
  return (
    <Box
      p={4}
      flex={2}
      bgcolor="#fcfcfc"
      id="chart"
      display="flex"
      flexDirection="column"
      borderRadius="15px"
    >
      <Typography fontSize={18} fontWeight={700} color="#11142d" variant="h2">
        Total Revenue
      </Typography>
      <Stack my="20px" direction="row" gap={4} flexWrap="wrap">
        <Typography fontSize={28} fontWeight={700} color="#11142d" variant="h3">
          $ 10,000
        </Typography>
        <Stack direction="row" gap={1} alignItems="center">
          <ArrowCircleUpRounded
            sx={{
              color: "#475be8",
              fontSize: 25,
            }}
          />
          <Stack>
            <Typography fontSize={15} color="#475be8">
              0.2%
            </Typography>
            <Typography fontSize={12} color="#575757">
              Than last month
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <ReactApexChart
        series={TotalRevenueSeries}
        type="bar"
        height={310}
        options={TotalRevenueOptions}
      />
    </Box>
  );
};

export default TotalRevenue;
