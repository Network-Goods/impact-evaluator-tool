import Container from "src/components/layout/Container";
import Layout from "src/components/layout/Layout";
import AuthNavbar from "src/components/navBar/AuthNavbar";
import Status from "src/components/status/Status";

export default function Index() {
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
}
