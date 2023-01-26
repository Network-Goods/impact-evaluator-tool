import AdminEditDashboard from "src/components/admin/AdminEditDashboard/AdminEditDashboard";
import Container from "src/components/layout/Container";
import Layout from "src/components/layout/Layout";
import AuthNavbar from "src/components/navBar/AuthNavbar";

export default function Index() {
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
}
