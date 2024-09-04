import PublicHeader from "@/components/headers/PublicHeader";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <PublicHeader />
      <main className="p-4">{children}</main>
    </>
  );
}
