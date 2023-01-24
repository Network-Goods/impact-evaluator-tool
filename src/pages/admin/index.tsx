import { FC } from "react";
import AdminEditDashboard from "src/components/admin/AdminEditDashboard/AdminEditDashboard";
import Container from "src/components/layout/Container";
import Layout from "src/components/layout/Layout";
import AuthNavbar from "src/components/navBar/AuthNavbar";

const Index: FC = () => {
  return (
    <Layout>
      <AuthNavbar />
      <main>
        <Container>
          <AdminEditDashboard />
        </Container>
      </main>
    </Layout>
  );
};

export default Index;
