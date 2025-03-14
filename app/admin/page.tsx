import { isAdmin } from "@/lib/admin";
import { redirect } from "next/navigation";
import AdminClientApp from "./AdminClientApp";

const AdminPage = () => {
  if (!isAdmin()) {
    redirect("/");
  }

  return <AdminClientApp />;
};

export default AdminPage;
