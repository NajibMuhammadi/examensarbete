'use client';

import {Box, Typography, Stack} from '@mui/material';
import TotalRevenue from '@/components/TotalRevenue';
import PieChart from '@/components/PieChart';
import PropertyReferrals from '@/components/PropertyReferrals';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import PropertyCard from '@/components/PropertyCard';


const page = () => {
  const {data: session} = useSession();
  const [allProperties, setAllProperties] = useState();
  
  useEffect(() =>{
      fetchItems()
  }, [])

  const fetchItems = async () => {
      try {
          const fetchdata = await fetch('/api/auth/getproduct');
          const data = await fetchdata.json();
          setAllProperties(data);
      } catch (error) {
          console.log('error', error);
      }

  }

  const WelcomeName = session?.user?.givenName || session?.user?.username;
  const Welcome = WelcomeName ? `Welcome, ${WelcomeName}` : 'Welcome';

  return (
    <Box >
        <Typography 
          fontSize={25} 
          fontWeight={700}
          color='black'
          variant='h1'
        >
          {Welcome}
          </Typography>
        <Box
          mt='20px'
          display='flex'
          flexWrap='wrap'
          gap={4}
        >
          <PieChart
            title='Försäljning'
            value={1500}
            series={[75, 25]}
            colors={['#275be8', '#c4e8ef']}
          />
          <PieChart
            title='Intäkter'
            value={2000}
            series={[50, 50]}
            colors={['#275be8', '#c4e8ef']}
          />
          <PieChart
            title='Vinst'
            value={10000}
            series={[90, 10]}
            colors={['#275be8', '#c4e8ef']}
          />
          <PieChart
            title='Förlust'
            value={800}
            series={[10, 90]}
            colors={['#275be8', '#c4e8ef']}
          />
        </Box>
        <Stack
          mt='25px'
          width='100%'
          direction={{ xs: 'column', lg: 'row', xl : 'row' }}
          gap={4}
        >
          <TotalRevenue />
          <PropertyReferrals/>
        </Stack>
        <Box
          flex={1}
          borderRadius="15px"
          p='20px'
          bgcolor='#fcfcfc'
          display='flex'
          flexDirection='column'
          minWidth='100%'
          mt='25px'
        >
          <Typography
            fontSize={18}
            fontWeight={600}
            color='#11142d'
            >
            Recent Sales
          </Typography>
          <Box
            mt={2.5}
            display='flex'
            flexWrap='wrap'
            gap={4}
          >
            {
              allProperties && allProperties.map((property) => (
                  <PropertyCard
                      key={property._id}
                      id={property._id}
                      title={property.title}
                      price={property.price}
                      photo={property.photo}
                      location={property.location}
                  />
              ))
                }
          </Box>
        </Box>
    </Box>
  )
}

export default page