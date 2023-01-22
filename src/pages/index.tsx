import { FC } from "react";
import Dashboard from "src/components/admin/Dashboard/Dashboard";
import Container from "src/components/layout/Container";
import Layout from "src/components/layout/Layout";
import AuthNavbar from "src/components/navBar/AuthNavbar";

const Index: FC = () => {
  return (
    <Layout>
      <AuthNavbar />
      <main>
        <Container>
          <Dashboard />
        </Container>
      </main>
    </Layout>
  );
};

export default Index;
