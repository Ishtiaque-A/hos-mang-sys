import Head from "next/head";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  ButtonGroup,
  Button,
  Card,
} from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import Link from "next/link";

const styles = {
  container: {
    backgroundColor: "#f0f0f0",
    padding: "2rem",
    textAlign: "center",
    backgroundImage: 'url("/assets/Rectangl.png")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "550px",
  },
  container2: {
    backgroundColor: "#f0f0f0",
    padding: "2rem",
    textAlign: "center",
    backgroundImage: 'url("/assets/image.png")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "580px",
    mt: "8rem",
  },

  appBar: {
    width: "90%",
    margin: "0 auto",
  },
  logo: {
    maxWidth: "150px", // Adjust the size of your logo as needed
    marginRight: "20px",
  },
  menu: {
    marginLeft: "auto",
    display: "flex", // Display the menu items horizontally
    alignItems: "center",
  },
  menuItem: {
    marginLeft: "20px",
  },
};

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Home </title>
        <meta name="description" content="Welcome to my website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box sx={styles.container}>
        <div style={styles.appBar}>
          <Toolbar sx={{ color: "#FFFF" }}>
            <Grid container alignItems="center">
              <Grid item>
                <Typography variant="h5">
                  Bdtask <samp style={{ color: "#16994A", fontSize: "26px" }}>Media</samp>{" "}
                </Typography>
              </Grid>
              <Grid item sx={styles.menu}>
                <List component="nav" aria-labelledby="menu-navigation" sx={{ display: "flex" }}>
                  <ListItem button>
                    <ListItemText primary="Home" />
                  </ListItem>
                  <ListItem button>
                    <ListItemText primary="Services" />
                  </ListItem>
                  <ListItem button>
                    <ListItemText primary="Portfolio" />
                  </ListItem>
                  <ListItem button>
                    <ListItemText primary="Clients" />
                  </ListItem>
                  <ListItem button>
                    <ListItemText primary="Review" />
                  </ListItem>

                  <ListItem button>
                    <Link href="/auth/login" sx={{ textDecoration: "none" }}>
                      <Button sx={{ background: "#16994A", color: "#FFFF", fontSize: "10px" }}>
                        Login
                      </Button>
                    </Link>
                  </ListItem>
                  <ListItem button>
                    <Button
                      sx={{
                        background: "#16994A",
                        color: "#FFFF",
                        fontSize: "16px",
                        borderRadius: "33px",
                        padding: "5px",
                      }}
                    >
                      <LocalPhoneIcon
                        style={{
                          backgroundColor: "#FFFF",
                          borderRadius: "50%",
                          padding: "5px",
                          fontSize: "45px",
                          color: "#16994A",
                        }}
                      />
                      01757820284
                    </Button>
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Toolbar>
        </div>
        <div style={{ color: "#FFFF", marginTop: "4rem" }}>
          <label>Bdtask Media</label>
          <Typography variant="h5">Digital Content, Animation & Video </Typography>
          <Typography variant="h5">Editing Service Provider in Bangladesh.</Typography>
        </div>
        <div style={{ marginTop: "2rem" }}>
          <Button sx={{ background: "#16994A", color: "#FFFF", fontSize: "10px" }}>
            HIRE US NOW
          </Button>
          <Button
            sx={{ border: "1px solid #16994A", color: "#FFFF", fontSize: "10px", marginLeft: "1%" }}
          >
            Contact Us
          </Button>
        </div>
        <div styles={{}}>
          <Card sx={{ maxWidth: 445, margin: "0 auto", mt: "4rem", border: "5px solid #FFFF" }}>
            <CardMedia sx={{ height: 240 }} image="/assets/Dashboard 1.png" title="green iguana" />
          </Card>
        </div>
      </Box>

      <Box sx={styles.container2}></Box>

      <Box
        sx={{
          backgroundColor: "#000000",
          color: "#fff",
          padding: "1rem",
          textAlign: "center",
          mt: "2rem",
        }}
      >
        <Grid container spacing={4} sx={{ width: "90%", margin: "0 auto", mt: "5rem", mb: "5rem" }}>
          <Grid item xs={6} sx={{ padding: "50px" }}>
            <Typography variant="h6" sx={{ fontSize: "20px", textAlign: "left", mb: "15px" }}>
              Bdtask <samp style={{ color: "#16994A", fontSize: "26px" }}>Media</samp>{" "}
            </Typography>
            <Typography variant="h6" sx={{ fontSize: "14px", textAlign: "left" }}>
              Custom software development conveys “personalizing it specifically only for that
              dedicated entrepreneur or organization”. Creating, building.
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h6" sx={{ fontSize: "17px", mb: "15px" }}>
              Company
            </Typography>
            <div
              style={{ textAlign: "center", textDecoration: "underline", listStyleType: "square" }}
            >
              <ul style={{ textAlign: "left" }}>
                <li>About us </li>
                <li>Blog</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h6" sx={{ fontSize: "17px", mb: "15px" }}>
              Resource
            </Typography>
            <div
              style={{ textAlign: "center", textDecoration: "underline", listStyleType: "square" }}
            >
              <ul style={{ textAlign: "left" }}>
                <li>Downloads </li>
                <li>Help Center</li>
                <li>Partners</li>
                <li>Press Kit</li>
              </ul>
            </div>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h6" sx={{ fontSize: "17px", mb: "15px" }}>
              Social Media
            </Typography>
            <div
              style={{ textAlign: "center", textDecoration: "underline", listStyleType: "square" }}
            >
              <ul style={{ textAlign: "left" }}>
                <li>Facebook </li>
                <li>Twitter</li>
                <li>Instagram</li>
                <li>Linkedin</li>
              </ul>
            </div>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default HomePage;
