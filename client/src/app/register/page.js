'use client';

import { Stack, Box, Typography, TextField, InputAdornment, IconButton, Checkbox, Button, Divider } from "@mui/material";
import {VisibilityOff, Visibility} from "@mui/icons-material";
import { useState } from "react";
import { signIn } from "next-auth/react";
import google from "../../../public/google.png";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/navigation";

const page = () => {
  const [showpassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const router = useRouter();

  const handleChange = (e) =>{
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        toast.success(data.message);
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Något gick fel", error);
    }
  };

  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
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
            Register
        </Typography>

        {message && (
          <Typography variant="body2" color="error">
            {message}
          </Typography>
        )}

        <Stack spacing={2}>
            <Box>
                <label htmlFor="username" style={{ color: "white", fontSize: "16px" }}>
                    Username
                </label>
                <TextField
                    id="username"
                    fullWidth
                    variant="outlined"
                    size="small"
                    placeholder="your username"
                    value={formData.username}
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
                endAdornment:(
                  <InputAdornment position="end">
                    <IconButton 
                      aria-label="toggle password visibility"
                      sx={{ color: "white" }}
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showpassword ? <Visibility/> : <VisibilityOff/>}
                    </IconButton >
                  </InputAdornment>
                )
              }}
            />
          </Box>
          <Box>
            <label htmlFor="confirm-password" style={{ color: "white", fontSize: "16px" }}>
                Confirm Password
            </label>
            <TextField
              id="confirmPassword"  // Korrekt id för confirmPassword
              type={showConfirmPassword ? "text" : "password"}
              placeholder="confirm password"
              size="small"
              fullWidth
              variant="outlined"
              value={formData.confirmPassword}  // Säkerställ att formData används här
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
                endAdornment:(
                  <InputAdornment position="end">
                    <IconButton 
                      aria-label="toggle confirm password visibility"
                      sx={{ color: "white" }}
                      onClick={handleClickShowConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <Visibility/> : <VisibilityOff/>}
                    </IconButton >
                  </InputAdornment>
                )
              }}
            />
          </Box>
        </Stack>
          <Button
            variant="contained"
            onClick={handleSubmit}
            fullWidth
            sx={{ bgcolor: "white", color: "black", borderRadius: 2 }} 
          >
            Sign Up
          </Button>
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
          <Typography variant="body2" color="white" textAlign="center"
            sx={{ 
              cursor: "pointer",
            }}
          >
            Already have an account?  <Link href="/" style={{color: 'white'}}>Sign In</Link>
          </Typography>
      </Stack>
    </Box>
  );
};

export default page;
