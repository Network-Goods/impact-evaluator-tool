import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const { id } = router.query;

  return <div>Evaluation id: {id}</div>;
}
