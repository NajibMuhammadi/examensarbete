import { Box, Stack, Typography } from "@mui/material"
import dynamic from "next/dynamic"

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const PieChart = ({title, value, series, colors,}) => {
  return (
    <Box
        id='chart'
        flex={1}
        display='flex'
        bgcolor='#fcfcfc'
        flexDirection='row'
        justifyContent='space-between'
        alignItems='center'
        pl={3.5}
        py={2}
        gap={2}
        borderRadius='15px'
        minHeight='110px'
        width='fit-content'
    >
        <Stack direction='column'>
            <Typography
                fontSize={14}
                color="gray"
            >{title}</Typography>
            <Typography
                fontSize={25}
                fontWeight={700}
                color='black'
                mt={1}
            >{value}</Typography>
        </Stack>
        <ReactApexChart
            options={{ 
                chart: {type : 'donut'},
                colors,
                legend: {show: false},
                dataLabels : {enabled: false},
            }}
            series={series}
            type="donut"
            width='120px'
        />
    </Box>
  )
}

export default PieChart