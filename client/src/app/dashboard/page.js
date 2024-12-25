'use client';

import {Box, Typography, Stack} from '@mui/material';
import TotalRevenue from '@/components/TotalRevenue';
import PieChart from '@/components/PieChart';
import PropertyReferrals from '@/components/PropertyReferrals';
import { useSession } from 'next-auth/react';


const page = () => {
  const {data: session} = useSession();
  return (
    <Box>
        <Typography 
          fontSize={25} 
          fontWeight={700}
          color='white'
        >
          {session?.user?.givenName ? (
          `Welcome, ${session.user.givenName}`
        ) : (
          'Welcome'
        )}
          </Typography>
        <Box
          mt='20px'
          display='flex'
          flexWrap='wrap'
          gap={4}
        >
          <PieChart
            title='Sales'
            value={1000}
            series={[50, 50]}
            colors={['#275be8', '#c4e8ef']}
          />
          <PieChart
            title='Revenue'
            value={1000}
            series={[50, 50]}
            colors={['#275be8', '#c4e8ef']}
          />
          <PieChart
            title='Profit'
            value={1000}
            series={[75, 25]}
            colors={['#275be8', '#c4e8ef']}
          />
          <PieChart
            title='Loss'
            value={1000}
            series={[20, 80]}
            colors={['#275be8', '#c4e8ef']}
          />
        </Box>
        <Stack
          mt='25px'
          width='100%'
          direction={{ xs: 'column', lg: 'row' }}
          gap={4}
        >
          <TotalRevenue />
          <PropertyReferrals/>
        </Stack>
    </Box>
  )
}

export default page