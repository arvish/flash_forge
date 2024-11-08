'use client'
import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { AppBar, Box, Button, Container, Grid2, Toolbar, Typography } from "@mui/material";
import Head from "next/head";

export default function Home() {
  const handleSubmit = async () => {
    const checkoutSession = await fetch('/api/checkout_sessions', {
      method: 'POST',
      headers: { origin: 'http://localhost:3000' },
    })
    const checkoutSessionJson = await checkoutSession.json()
  
    const stripe = await getStripe()
    const {error} = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    })
  
    if (error) {
      console.warn(error.message)
    }
  }
  return (
    <Container maxWidth="100vw">
      <Head>
        <title>FlashForge SaaS</title>
        <meta name="description" content="Create flashcards for your text!"/>
      </Head>

      <AppBar position="static" sx={{borderRadius: 5}}>
        <Toolbar>
          <Typography variant="h6" style={{flexGrow: 1}}>FlashForge SaaS</Typography>
          <SignedOut>
            <Button color="inherit" href="/sign-in">Log In</Button>
            <Button color="inherit" href="/sign-up">Sign Up</Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Box sx={{textAlign: 'center', my: 4}}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to FlashForge SaaS
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          The easiest way to create flashcards from your text!
        </Typography>
        <Button variant="contained" color="primary" sx={{mt: 2, mr: 2}} href="/generate">
          Get Started
        </Button>
        <Button variant="outlined" color="primary" sx={{mt: 2}}>
          Learn More
        </Button>
      </Box>

      <Box sx={{my: 6, textAlign: 'center'}}>
        <Typography variant="h4" component="h2" gutterBottom>Features</Typography>
        <Grid2 container spacing={4} justifyContent="center">
            <Grid2 item xs={12} md={4}>
              <Typography variant="h6">Easy Text Input</Typography>
              <Typography>
                {' '}
                Simply input your text and let our software do the rest.
              </Typography>
            </Grid2>
            <Grid2 item xs={12} md={4}>
              <Typography variant="h6">Smart Flashcards</Typography>
              <Typography>
                {' '}
                Simply input your text and let our software do the rest.
              </Typography>
            </Grid2>
            <Grid2 item xs={12} md={4}>
              <Typography variant="h6">Access anywhere!</Typography>
              <Typography>
                {' '}
                Simply input your text and let our software do the rest.
              </Typography>
            </Grid2>
        </Grid2>
      </Box>

      <Box sx={{my: 6, textAlign: 'center'}}>
        <Typography variant="h4" component="h2" gutterBottom>Pricing</Typography>
        <Grid2 container spacing={6} justifyContent="center">
          <Grid2 item xs={12} md={6}>
            <Box sx={{p: 3, border: '1px solid', borderColor: 'grey.500', borderRadius: 5,}}>
              <Typography variant="h5" gutterBottom>Basic</Typography>
              <Typography variant="h6" gutterBottom>Free</Typography>
              <Typography>
                {' '}
                Access to basic flashcard features and limited storage.
              </Typography>
              <Button variant="contained" color="primary">Choose Basic</Button>
            </Box>
          </Grid2>
          <Grid2 item xs={12} md={6}>
            <Box sx={{p: 3, border: '1px solid', borderColor: 'grey.500', borderRadius: 5}}>
              <Typography variant="h5" gutterBottom>Pro</Typography>
              <Typography variant="h6" gutterBottom>$10 / month</Typography>
              <Typography>
                {' '}
                Unlimited flashcards and storage, with priority support.
              </Typography>
              <Button variant="contained" color="primary" sx={{mt: 2}} onClick={handleSubmit}>Choose Pro</Button>
            </Box>
          </Grid2>
        </Grid2>
      </Box>
    </Container>
  );
}
