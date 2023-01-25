import { FC } from "react";
import Container from "src/components/layout/Container";
import Layout from "src/components/layout/Layout";
import AuthNavbar from "src/components/navBar/AuthNavbar";
import Status from "src/components/status/Status";

const Index: FC = () => {
  return (
    <Layout>
      <AuthNavbar />
      <main>
        <Container>
          <Status />
        </Container>
      </main>
    </Layout>
  );
};

export default Index;
