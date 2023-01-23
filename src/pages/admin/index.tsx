import { FC } from "react";
import AdminEdit from "src/components/admin/Edit/AdminEdit";
import Container from "src/components/layout/Container";
import Layout from "src/components/layout/Layout";
import AuthNavbar from "src/components/navBar/AuthNavbar";

const Index: FC = () => {
  return (
    <Layout>
      <AuthNavbar />
      <main>
        <Container>
          <AdminEdit />
        </Container>
      </main>
    </Layout>
  );
};

export default Index;
