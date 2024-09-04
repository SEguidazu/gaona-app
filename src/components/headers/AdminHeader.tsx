import { auth } from "@/lib/auth";
import NavigationMenu from "./NavigationMenu";

async function AdminHeader() {
  const session = await auth();

  return (
    <header className="p-4">
      <h1 className="mr-2">Admin Header</h1>
      <NavigationMenu isSession={!!session} />
    </header>
  );
}

export default AdminHeader;
