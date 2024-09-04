import { auth } from "@/lib/auth";
import NavigationMenu from "./NavigationMenu";

async function PublicHeader() {
  const session = await auth();

  return (
    <header className="p-4">
      <h1>Gaona app</h1>
      <NavigationMenu isSession={!!session} />
    </header>
  );
}

export default PublicHeader;
