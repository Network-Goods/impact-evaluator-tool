import Container from "src/components/layout/Container";
import Layout from "src/components/layout/Layout";
import AuthNavbar from "src/components/navBar/AuthNavbar";
import SubmissionPage from "src/components/submission/SubmissionPage";

export default function Index() {
  return (
    <Layout>
      <AuthNavbar />
      <main>
        <Container>
          <SubmissionPage />
        </Container>
      </main>
    </Layout>
  );
}
