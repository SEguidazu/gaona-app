import { auth } from "@/lib/auth";
import NavigationMenu from "@/components/menu/NavigationMenu";
import AdminMenu from "@/components/menu/AdminMenu";

async function AdminHeader() {
  const session = await auth();

  return (
    <header className="p-4">
      <h1 className="mr-2">Admin Header</h1>
      <NavigationMenu isSession={!!session} />
      <AdminMenu />
    </header>
  );
}

export default AdminHeader;
