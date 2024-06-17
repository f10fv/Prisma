import ContractProfile from "@/app/components/contractProfile";
export default function Page({ params }) {
  const id = params.id;
  console.log("ID", id);
  return <ContractProfile id={params.id} />;
}
