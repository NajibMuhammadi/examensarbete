"use client";

import { useState } from "react";
import {
  AppBar,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
  Stack,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Link from "next/link";

const Links = [
  { name: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
  { name: "Settings", path: "/dashboard/settings", icon: <SettingsIcon /> },
  {
    name: "Properties",
    path: "/dashboard/properties",
    icon: <MapsHomeWorkIcon />,
  },
];

export default function DashboardLayout({ children, session }) {
  const [activeLink, setActiveLink] = useState("/dashboard");

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: 200,
          flexShrink: 0,
          height: "100vh",
          "& .MuiDrawer-paper": {
            width: 200,
            boxSizing: "border-box",
          },
        }}
      >
        <List
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <Box>
            {Links.map((link, index) => (
              <Link key={index} href={link.path}>
                <ListItem
                  disablePadding
                  onClick={() => setActiveLink(link.path)}
                  selected={activeLink === link.path}
                  button="true"
                  sx={{
                    color: "black",
                    padding: 1,
                  }}
                >
                  {link.icon && <Box sx={{ marginRight: 2 }}>{link.icon}</Box>}
                  <ListItemText
                    primary={link.name}
                    sx={{
                      textDecoration: "none",
                      "&:hover": { textDecoration: "none" }, // För att ta bort understrykning vid hover
                    }}
                  />
                </ListItem>
              </Link>
            ))}
            {session?.user?.isAdmin && (
              <Link href="/dashboard/users">
                <ListItem
                  disablePadding
                  button="true"
                  sx={{
                    color: "black",
                    padding: 1,
                  }}
                >
                  <Box sx={{ marginRight: 2 }}>
                    <AccountCircleIcon />
                  </Box>
                  <ListItemText
                    primary="Users"
                    sx={{
                      textDecoration: "none",
                      "&:hover": { textDecoration: "none" },
                    }}
                  />
                </ListItem>
              </Link>
            )}
          </Box>
          <Link href="/api/auth/signout">
            <ListItem
              button="true"
              sx={{
                color: "black",
                padding: 1,
              }}
            >
              <LogoutIcon sx={{ marginRight: 2 }} />
              <ListItemText
                primary="Logout"
                sx={{
                  color: "black",
                  textDecoration: "none",
                  "&:hover": { textDecoration: "none" }, // För att ta bort understrykning vid hover
                }}
              />
            </ListItem>
          </Link>
        </List>
      </Drawer>

      <Box component="div" width="100%">
        <AppBar position="static" sx={{ backgroundColor: "#275be8" }}>
          <Toolbar
            sx={{
              backgroundColor: "black",
            }}
          >
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              NS
            </Typography>
            <Stack direction="row" spacing={2}>
              {session?.user?.image ? (
                <img
                  src={session?.user?.image}
                  alt={session?.user?.name}
                  style={{ borderRadius: "50%", width: "40px", height: "40px" }}
                />
              ) : (
                <AccountCircleIcon sx={{ width: "40px", height: "40px" }} />
              )}
            </Stack>
          </Toolbar>
        </AppBar>

        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.black", p: 3 }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
