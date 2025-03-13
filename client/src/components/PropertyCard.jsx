import { Box, Card, CardContent, CardMedia, Stack, Typography } from '@mui/material'
import React from 'react'
import Link from 'next/link'
import { Place } from '@mui/icons-material'

const PropertyCard = ({title, price, photo, location, id}) => {
  return (
    <Card
        component={Link}
        href={`/dashboard/properties/${id}`}
        sx={{
            width: {
                xs: '100%',
            },
            maxWidth: {
                xs: '100%',
                sm: '330px',
            },
            padding: '10px',
            '&:hover': {
                boxShadow: '0 22px 45px 2px rgba(176, 176, 176, 0.1)',
            },
            cursor: 'pointer',
            textDecoration: 'none'
        }}
        elevation={0}
    >
        <CardMedia
            component='img'
            width='100%'
            height={210}
            image={photo}
            alt={title}
            sx={{borderRadius: '10px'}}
        />
        <CardContent
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: '10px',
                paddingX: '5px'
            }}
        >
            <Stack direction='column' gap={1}>
                <Typography
                    fontSize={16}
                    fontWeight={500}
                    color='#11142d'
                >
                    {title}
                </Typography>
                <Stack direction={'row'} gap={0.5} alignItems="flex-start">
                    <Place 
                        sx={{ fontSize: 18, color: '#11142d', mt: 0.5}}
                    />
                    <Typography
                        fontSize={14}
                        color='#808191'
                    >
                        {location}
                    </Typography>
                </Stack>
            </Stack>
            <Box
                px={1.5}
                py={0.5}
                borderRadius={1}
                bgcolor='#dadefa'
                height='fit-content'
            >
                <Typography
                    fontSize={12}
                    fontWeight={600}
                    color='#475be8'
                >{price}SEK</Typography>
            </Box>
        </CardContent>

    </Card>

  )
}

export default PropertyCard