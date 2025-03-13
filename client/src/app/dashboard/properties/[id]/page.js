'use client'

import { Typography, Box, Stack, Button } from "@mui/material";
import { useParams, useRouter} from "next/navigation"
import { useState, useEffect } from "react";
import '../../../../styles/globals.css'
import { Place, Star } from "@mui/icons-material";
import { useSession } from "next-auth/react";
import '../../dashboard.css';

const page = () => {
    const {id} = useParams();
    const router = useRouter();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null); 
    const {data: session} = useSession();
    const [loading, setLoading] = useState(true);

    useEffect(() =>{
        const fetchItem = async () => {
            try {
                const res = await fetch(`/api/auth/product/${id}`);
                const data = await res.json();

                if (!res.ok) {
                    throw new Error('Produkt inte hittad');
                }

                console.log(data);
                setData(data);
                setError(null);
                setLoading(false);
            } catch (error) {
                console.log(error)
                setError(error.message);
                setData(null);
            }
        }
        fetchItem();
    }, [id]);

    const handleDelete = async () =>  {
        try {
            const res = await fetch(`/api/auth/removeproduct/${id}`, {
                method: 'DELETE'
            });
            const data = await res.json();
            console.log(data);
            if(res.ok){
                router.push('/dashboard/properties');
            }
        } catch (error) {
            console.log(error)
        }
    }

    if(loading) {
        return(
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div className="terminal-loader">
                    <div className="terminal-header">
                        <div className="terminal-title">Status</div>
                            <div className="terminal-controls">
                                <div className="control close"></div>
                                <div className="control minimize"></div>
                                <div className="control maximize"></div>
                            </div>
                    </div>
                    <div className="text">Loading...</div>
                </div>
            </Box>
        )
    }

    

    return (
        <Box
            borderRadius='15px'
            padding='20px'
            bgcolor='#fcfcfc'
            width='fit-content'
            height='fit-content'
        >
            <Typography fontSize={25} fontWeight={700} color="#11142d">Details</Typography>
            <Box
                mt='20px'
                display='flex'
                flexDirection={{
                    xs: 'column',
                    lg: 'row'
                }}
                gap={4}
            >
                <Box flex={1} maxWidth={764}>
                    <img
                        src={data?.photo}
                        alt={data?.title}
                        height={546}
                        style={{
                            objectFit: 'cover',
                            borderRadius: '10px'
                        }}
                        className="property_details-img"
                    />
                    <Box mt='15px'>
                        <Stack direction='row' justifyContent='space-between' flexWrap='wrap' alignItems='center'>
                            <Typography fontSize={18} fontWeight={500} color="#11142d" textTransform='capitalize'>{data?.propertytype}</Typography>
                            <Box>
                                {[1, 2, 3, 4, 5].map((star) => <Star key={`star-${star}`} sx={{ color: '#f2c94c' }} />)}
                            </Box>
                        </Stack>
                        <Stack direction='row' justifyContent='space-between' flexWrap='wrap' alignItems='center' gap={2}>
                            <Box>
                                <Typography fontSize={22} fontWeight={600} color="#11142d" textTransform='capitalize'>{data?.title}</Typography>
                                <Stack mt={0.5} direction='row' alignItems='center' gap={0.5}>
                                    <Place sx={{color: '#808191'}}/>
                                    <Typography fontSize={14} color="#808191">{data?.location}</Typography>
                                </Stack>
                            </Box>
                            <Box>
                                <Typography
                                    fontSize={16}
                                    fontWeight={600}
                                    mt="10px"
                                    color="#11142D"
                                    >
                                    Price
                                </Typography>
                                <Stack direction="row" alignItems="flex-end" gap={1}>
                                    <Typography fontSize={25} fontWeight={700} color="#475BE8">
                                        {data?.price} SEK
                                    </Typography>
                                    <Typography fontSize={14} color="#808191" mb={0.5}>
                                        for one day
                                    </Typography>
                                </Stack>
                            </Box>
                        </Stack>
                        <Stack mt="25px" direction="column" gap="10px">
                            <Typography fontSize={18} color="#11142D">
                                Description
                            </Typography>
                            <Typography fontSize={14} color="#808191">
                                {data?.description}
                            </Typography>
                        </Stack>
                        {session?.user?.isAdmin && (
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{
                                    mt: 3,
                                    width: '100%',
                                    borderRadius: '10px',
                                    padding: '10px',
                                    fontSize: '16px',
                                    textTransform: 'capitalize'
                                }}
                                onClick={handleDelete}
                            >
                                Delete
                            </Button>
                        )}

                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default page