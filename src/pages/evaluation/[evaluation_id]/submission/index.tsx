import Container from "src/components/layout/Container";
import Layout from "src/components/layout/Layout";
import AuthNavbar from "src/components/navBar/AuthNavbar";
import RoundDetails from "src/components/roundDetails/RoundDetails";

export default function Index() {
  return (
    <Layout>
      <AuthNavbar />
      <main>
        <Container>
          <RoundDetails />
        </Container>
      </main>
    </Layout>
  );
}
