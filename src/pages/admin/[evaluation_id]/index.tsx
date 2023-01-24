import { FC } from "react";
import Evaluation from "src/components/admin/Evaluation/Evaluation";
import Container from "src/components/layout/Container";
import Layout from "src/components/layout/Layout";
import AuthNavbar from "src/components/navBar/AuthNavbar";

const Index: FC = () => {
  return (
    <Layout>
      <AuthNavbar />
      <main>
        <Container>
          <Evaluation />
        </Container>
      </main>
    </Layout>
  );
};

export default Index;
