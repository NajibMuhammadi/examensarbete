'use client';

import { AppBar, Box, Drawer, List, ListItem, ListItemText, Toolbar, Typography, Stack, useMediaQuery} from '@mui/material';
import './dashboard.css';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import MenuIcon from '@mui/icons-material/Menu';
import MessageIcon from '@mui/icons-material/Message';

const Links =[
  { name: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
  { name: "Properties", path: "/dashboard/properties", icon: <MapsHomeWorkIcon /> },
  { name: "Message", path: "/dashboard/socket", icon: <MessageIcon /> },
]

export default function DashboardLayout({ children }) {
  const {data: session, status} = useSession();
  const [activeLink, setActiveLink] = useState("/dashboard");
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const isLaptop = useMediaQuery('(min-width: 1024px)');
  
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
    setMenuOpen(false);
  }, [status, router]);

  if (status === "loading") {
    return (
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

  if (status === "unauthenticated" ) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h4" component="div" sx={{ color: 'red' }}>
          Unauthorized
        </Typography>
      </Box>
    )
  }


  const handleClickMenu = () =>{
    setMenuOpen(!menuOpen)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      {isLaptop &&(
              <Drawer
              variant='permanent'
              sx={{
                width: menuOpen ? 250 : 50,
                flexShrink: 0, 
                height: '100vh',
                '& .MuiDrawer-paper': { 
                  width: menuOpen ? 250 : 50,
                  boxSizing: 'border-box', 
                },
              }}
            >
              <List
                sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'space-between',
                  height: '100%', 
                  p: 0,
                }}
                >
                <Box>
                  {Links.map((link, index) => (
                    <Link key={index} href={link.path} style={{textDecoration: 'none'}}>
                      <ListItem 
                        disablePadding
                        onClick={() => setActiveLink(link.path)} 
                        selected={activeLink === link.path}
                        button="true"
                        sx={{ 
                          color: 'black', 
                          padding: 1,
                        }}
                      >
                        {link.icon && <Box sx={{ marginRight: 2 }}>{link.icon}</Box>}
                        {menuOpen && (
                          <ListItemText primary={link.name}
                            sx={{
                              textDecoration: 'none', 
                            }}/>
                        )} 
                      </ListItem>
                    </Link>
                  ))}
                  {session?.user?.isAdmin && (
                    <Link href="/dashboard/users" style={{textDecoration: 'none'}}>
                      <ListItem
                        disablePadding
                        button="true"
                        sx={{
                          color: 'black',
                          padding: 1,
                        }}
                      >
                        <Box sx={{ marginRight: 2 }}>
                          <AccountCircleIcon />
                        </Box>
                        {menuOpen && (
                          <ListItemText
                            primary="Users"
                            sx={{
                              textDecoration: 'none',
                              '&:hover': { textDecoration: 'none' },
                            }}
                          />
                        )}
                      </ListItem>
                    </Link>
                  )}
                  </Box>
                    <Box padding={1}>
                      <Link href="/api/auth/signout" style={{textDecoration: 'none'}}
                      >
                        <ListItem 
                          button="true"
                          sx={{ 
                            color: 'black', 
                            padding: 0,
                          }}
                        >
                          <LogoutIcon sx={{ marginRight: 1 }}/>
                          {menuOpen && (
                            <ListItemText 
                              primary="Logout"
                              sx={{
                                color: 'black',
                                textDecoration: 'none', 
                                '&:hover': { textDecoration: 'none' },
                              }}
                            />
                          )}
                        </ListItem>  
                      </Link>
                      <ListItem 
                        onClick={handleClickMenu}
                        button="true"
                        sx={{ 
                          color: 'black', 
                          padding: 0,
                          mt: 1,
                        }}
                      >
                        <MenuIcon 
                          sx={{ fontSize: 24, cursor: 'pointer', mr: 1}} 
                          onClick={handleClickMenu} 
                        />
                        {menuOpen && (
                          <ListItemText 
                            primary="Menu"
                            sx={{
                              color: 'black',
                              textDecoration: 'none', 
                              cursor: 'pointer'
                            }}
                          />
                        )}
                      </ListItem>
                    </Box>
              </List>
            </Drawer>
      )}
      {isLaptop ? (
        <Box
        component='div'
        sx={{ width: menuOpen ? 'calc(100% - 250px)' : '100%',}}
      >
        <AppBar position="static">
          <Toolbar
            sx={{
              bgcolor: 'white',
            }}
          >
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, color:'black' }}>
              NS
            </Typography>
            <Stack direction="row" spacing={2}>
              {session?.user?.image ? (
                <img src={session?.user?.image} alt={session?.user?.name} style={{ borderRadius: '50%', width: '40px', height: '40px' }} />
              ): (
                <AccountCircleIcon sx={{width: '40px', height: '40px', color: 'black'}}/>
              )}
            </Stack>
          </Toolbar>
        </AppBar>
        <Box component='main' sx={{ flexGrow: 1, bgcolor: 'rgba(244, 244, 244, 1)', p: 3, height: 'calc(100% - 64px)' }}>
          {children}
        </Box>
      </Box>  
      ): (
        <Box
        component='div'
        sx={{ width: '100%', height: '100%',}}
      >
        <AppBar
          position="sticky"
          elevation={1}
          sx={{
            bgcolor: 'white'
          }}
        >
          <Toolbar
            sx={{
              'justifyContent': 'space-between',
              'alignItems': 'center',
            }}
          >
            <MenuIcon sx={{
              color: 'black',
              cursor: 'pointer',
              mr: 2,
              }}
              onClick={handleClickMenu}
             />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, color:'black' }}>
              NS
            </Typography>
            <Stack direction="row" spacing={2}>
              {session?.user?.image ? (
                <img src={session?.user?.image} alt={session?.user?.name} style={{ borderRadius: '50%', width: '40px', height: '40px' }} />
              ): (
                <AccountCircleIcon sx={{width: '40px', height: '40px', color: 'black'}}/>
              )}
            </Stack>
          </Toolbar>
        </AppBar>
        {menuOpen && (
          <Stack direction='column' spacing={1}
            sx={{
              padding: 2,
              bgcolor: 'white',
              position: 'fixed',
              inset: 0,
              height: '50vh',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
              top: 56,
              zIndex: 1000,
            }}
          >
          {Links.map((link, index) => (
            <Link key={index} href={link.path} style={{textDecoration: 'none'}}>
              <ListItem 
                disablePadding
                onClick={() => {
                  setActiveLink(link.path)
                  setMenuOpen(false)
                }}
                selected={activeLink === link.path}
                button="true"
                sx={{ 
                  color: 'black', 
                  padding: 1,
                }}
              >
                {link.icon && <Box sx={{ marginRight: 2 }}>{link.icon}</Box>}
                  <ListItemText primary={link.name}
                    sx={{
                      textDecoration: 'none', 
                }}/>
              </ListItem>
            </Link>
          ))}
          {session?.user?.isAdmin && (
                    <Link href="/dashboard/users" style={{textDecoration: 'none'}}>
                      <ListItem
                        disablePadding
                        button="true"
                        sx={{
                          color: 'black',
                          padding: 1,
                        }}
                        onClick={() => {setMenuOpen(false)}}
                      >
                        <Box sx={{ marginRight: 2 }}>
                          <AccountCircleIcon />
                        </Box>
                          <ListItemText
                            primary="Users"
                            sx={{
                              textDecoration: 'none',
                              '&:hover': { textDecoration: 'none' },
                            }}
                          />
                      </ListItem>
                    </Link>
                  )}
                          <Box padding={1}>
        <Link href="/api/auth/signout" style={{textDecoration: 'none'}}
        >
          <ListItem 
            button="true"
            sx={{ 
              color: 'black', 
              padding: 0,
            }}
          >
            <LogoutIcon sx={{ marginRight: 1 }}/>
            {menuOpen && (
              <ListItemText 
                primary="Logout"
                sx={{
                  color: 'black',
                  textDecoration: 'none', 
                  '&:hover': { textDecoration: 'none' },
                }}
              />
            )}
          </ListItem>  
        </Link>
        </Box>
        </Stack>
      )}
        <Box component='main' sx={{ flexGrow: 1, bgcolor: 'rgba(244, 244, 244, 1)', 
          p: {
            xs: 2,
            sm: 3,
            md: 3,
            lg: 3,
            xl: 3,
          },
          height: 'calc(100% - 64px)',
         }}>
          {children}
        </Box>
      </Box>  
      )}

    </Box>
  );
}
