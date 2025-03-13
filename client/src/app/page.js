'use client';

import { Stack, Box, Typography, TextField, InputAdornment, IconButton, Checkbox, Button, Divider } from "@mui/material";
import {VisibilityOff, Visibility} from "@mui/icons-material";
import google from "../../public/google.png";
import { useState, useEffect} from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";

const label = {inputProps: { 'aria-label': 'Checkbox demo' }};

const Page = () => {
  const [showpassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const router = useRouter();
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  }

  const handleSubmit = async () => {
    const res = await signIn('credentials', {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });

    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success("Logged in successfully");
      router.push('/dashboard');
    }
  }

  useEffect(() => {
    if(status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      sx={{
        background:"radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))"
      }}
    >
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover={false}
        theme="dark"
        />
      <Stack
        borderRadius={2}
        border="1px solid rgb(51, 60, 77);"
        width="100%"
        maxWidth={450}
        padding={3}
        spacing={2}
        bgcolor='hsla(220, 35%, 3%, 0.4)'
        boxShadow= 'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px;'
      >
        <Typography variant="h4" color="white">
          NS-dashboard
        </Typography>
        <Typography variant="h5" color="white">
          Sign In
        </Typography>

        <Stack spacing={2}>
          <Box>
            <label htmlFor="email" style={{ color: "white", fontSize: "16px" }}>
              Email
            </label>
            <TextField
              id="email"
              fullWidth
              variant="outlined"
              size="small"
              placeholder="youremail@email.com"
              value={formData.email}
              onChange={handleChange}
              sx={{ 
                bgcolor: "hsl(220, 35%, 3%)",
                mt: 1,
                borderRadius: 2,
                "& .MuiOutlinedInput-root": {
                  color: "white", 
                  borderRadius: 2, 
                },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "hsl(210, 98%, 48%)",
                  color: "white",
                },
              }}
            />
          </Box>

          <Box>
            <label htmlFor="password" style={{ color: "white", fontSize: "16px" }}>
              Password
            </label>
            <TextField
              id="password"
              type={showpassword ? "text" : "password"}
              placeholder="your password"
              size="small"
              fullWidth
              variant="outlined"
              value={formData.password}
              onChange={handleChange}
              sx={{ 
                bgcolor: "hsl(220, 35%, 3%)",
                mt: 1,
                borderRadius: 2,
                "& .MuiOutlinedInput-root": {
                  color: "white", 
                  borderRadius: 2, 
                },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "hsl(210, 98%, 48%)",
                  color: "white",
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton 
                      aria-label="toggle password visibility"
                      sx={{ color: "white" }}
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showpassword ? <VisibilityOff/> : <Visibility/>}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Box>
          
          <Box>
            <Checkbox {...label} style={{ color: "white" }} />
            <label htmlFor="remember" style={{ color: "white", fontSize: "16px" }}>
              Remember me
            </label>
          </Box>
        </Stack>
          
        <Button
          variant="contained"
          onClick={handleSubmit}
          fullWidth
          sx={{ bgcolor: "white", color: "black", borderRadius: 2 }} 
        >
          Sign In
        </Button>

        <Typography variant="body2" color="white" textAlign="center"
          sx={{ 
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          Forget your password?
        </Typography>

        <Stack direction="row" alignItems="center" justifyContent="center" spacing={2} sx={{ my: 3 }}>
          <Divider sx={{ bgcolor: "hsl(220, 20%, 25%)", height: 2, flexGrow: 1 }} />
          <Typography variant="body2" color="white">
            OR
          </Typography>
          <Divider sx={{ bgcolor: "hsl(220, 20%, 25%)", height: 2, flexGrow: 1 }} />
        </Stack>

        <Button
          variant="contained"
          fullWidth
          size="large"
          sx={{ 
            bgcolor: "hsl(220, 35%, 3%)", 
            color: "white", 
            borderRadius: 2,
            border: "1px solid hsl(220, 20%, 25%)",
          }}
          onClick={() => signIn("google")}
        >
          <img src={google.src} alt="google" style={{ width: 20, height: 20, marginRight: 10 }}/>
          Sign In with Google
        </Button>

        <Button
          variant="contained"
          fullWidth
          sx={{
            bgcolor: "hsl(220, 35%, 3%)", 
            color: "white", 
            borderRadius: 2,
            padding: 1.4,
            border: "1px solid hsl(220, 20%, 25%)",
          }}
        >
          <img src={google.src} alt="google" style={{ width: 20, height: 20, marginRight: 10 }}/>
          Sign In with Facebook
        </Button>

        <Typography variant="body2" color="white" textAlign="center"
          sx={{ 
            cursor: "pointer",
          }}
        >
          Don't have an account? <Link href="/register" style={{color: 'white'}}>Sign Up</Link>
        </Typography>
      </Stack>
    </Box>
  );
};

export default Page;
