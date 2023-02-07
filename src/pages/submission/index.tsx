import Container from "src/components/layout/Container";
import Layout from "src/components/layout/Layout";
import AuthNavbar from "src/components/navBar/AuthNavbar";
import Submission from "src/components/submission/Submission";

export default function Index() {
  return (
    <Layout>
      <AuthNavbar />
      <main>
        <Container>
          <Submission />
        </Container>
      </main>
    </Layout>
  );
}
