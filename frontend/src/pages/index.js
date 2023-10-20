import Head from "next/head";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import AppHeader from "../components/app-header";
import { useRouter } from 'next/router';
import { Button } from "react-bootstrap";
import styled from "styled-components";


const StartButtonsWrapper = styled.div`
    margin-top: 40px;
    display: flex;
    justify-content: space-around;
`;

export default function Home() {

  const router = useRouter();

  const handleGoToAdmin = () => {
      router.push('/admin');
  };
  const handleStartGame = () => {
    router.push('/game');
};

  return (
    <>
      <Head>
        <title>Quizz app</title>
        <meta name="description" content="Simple quizz app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main center">
        <AppHeader />
        <StartButtonsWrapper>
        <Button 
          variant="info"
          onClick={handleStartGame}
          className="buttonMinWidth" >
          Seijak 🥋
        </Button>
        <Button 
          variant="warning"
          onClick={handleGoToAdmin}
          className="buttonMinWidth">
          Admin
        </Button>
        </StartButtonsWrapper>
      </main>
    </>
  );
}
