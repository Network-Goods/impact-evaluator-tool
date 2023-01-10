import Github from "public/images/svg/Github";
import { useState, FC } from "react";
import Button from "src/components/Button";
import Container from "src/components/layout/Container";
import Layout from "src/components/layout/Layout";
import Login from "src/components/Login";
import BasicNavbar from "src/components/navBar/BasicNavbar";

const Index: FC = () => {
  return (
    <Layout>
      <BasicNavbar />
      <main>
        <Container>
          <div className="max-w-[404px] border p-4 flex flex-col justify-between rounded-lg bg-[#f5f5f5] mx-auto">
            <h1 className="text-[#242424] text-2xl font-semibold text-center">
              Create or Join
              <br />
              Impact Evaluator Rounds
            </h1>
            <div className="py-8">
              <Login />
            </div>
          </div>
        </Container>
      </main>
    </Layout>
  );
};

export default Index;
