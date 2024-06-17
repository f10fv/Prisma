import AddContract from "@/app/components/addContract";
export default function Page({ params }) {
  const id = params.id;
  console.log("ID", id);
  return <AddContract id={params.id} />;
}
