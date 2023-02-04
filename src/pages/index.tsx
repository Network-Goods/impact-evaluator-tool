import Dashboard from "src/components/dashboard/Dashboard";
import Container from "src/components/layout/Container";
import Layout from "src/components/layout/Layout";
import AuthNavbar from "src/components/navBar/AuthNavbar";

export default function Index() {
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
}
