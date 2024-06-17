import User from "@/app/components/user";
export default function Page({ params }) {
    const id = params.id
    console.log("ID", id);
    return (
        <User id={params.id}/>
  );
}