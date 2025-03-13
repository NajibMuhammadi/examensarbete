'use client';
import { Add } from "@mui/icons-material"
import { Box, Stack, Typography } from "@mui/material"
import { useRouter } from 'next/navigation'
import CustomBtn from "./CustomBtn"
import { useState, useEffect } from 'react';
import PropertyCard from "./PropertyCard";

import React from 'react'
import { useSession } from "next-auth/react";

const AllProperties = () => {
    const router = useRouter()
    const { data: session } = useSession();
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
    return (
        <Box
            sx={{
                minHeight: {
                    xs: 'calc(100vh - 80px)',
                    sm: 'calc(100vh - 112px)',
                    md: 'calc(100vh - 112px)',
                }
            }}
        >
            <Stack
                direction='row'
                justifyContent='space-between'
                alignItems='center'
            >
                <Typography
                    fontSize={25}
                    fontWeight={700}
                    color="#11142d"
                >
                    All Properties
                </Typography>
                {session?.user?.isAdmin&&(
                    <CustomBtn
                        title='Add Property'
                        handleClick={()=>router.push('/dashboard/properties/create')}
                        backgroundColor='#475be8'
                        color='#fcfcfc'
                        icon={<Add />}
                    >
                        Add Property
                    </CustomBtn>
                )}
            </Stack>
            <Box mt='20px' sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
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
    )
}

export default AllProperties