import { useState, FC } from "react";
import Container from "src/components/layout/Container";
import Layout from "src/components/layout/Layout";
import AuthNavbar from "src/components/navBar/AuthNavbar";
import Voting from "src/components/voting/voting";

const Index: FC = () => {
  return (
    <Layout>
      <AuthNavbar />
      <main>
        <Container>
          <Voting />
        </Container>
      </main>
    </Layout>
  );
};

export default Index;
