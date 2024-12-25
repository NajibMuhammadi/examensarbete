'use client';
import { Add } from "@mui/icons-material"
import { Box, Stack, Typography } from "@mui/material"
import { useRouter } from "next/navigation"
import CustomBtn from "./CustomBtn"

import React from 'react'

const AllProperties = () => {
    const router = useRouter()

    return (
        <Box>
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
                <CustomBtn
                    title='Add Property'
                    handleClick={()=>router.push('/dashboard/properties/create')}
                    backgroundColor='#475be8'
                    color='#fcfcfc'
                    icon={<Add />}
                >
                    Add Property
                </CustomBtn>
            </Stack>
        </Box>
    )
}

export default AllProperties