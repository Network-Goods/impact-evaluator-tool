import Container from "src/components/layout/Container";
import Layout from "src/components/layout/Layout";
import AuthNavbar from "src/components/navBar/AuthNavbar";
import SubmissionOverview from "src/components/submission/SubmissionOverview";

export default function Index() {
  return (
    <Layout>
      <AuthNavbar />
      <main>
        <Container>
          <SubmissionOverview />
        </Container>
      </main>
    </Layout>
  );
}
