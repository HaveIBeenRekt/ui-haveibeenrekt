import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import { ReactQueryClientProvider } from "./components/reactQueryClientProvider";
import { QueryClient, QueryClientProvider, Hydrate } from "react-query";
import { ReactQueryProvider } from "./ReactQueryProvider";

const inter = Inter({ subsets: ["latin"] });
// const queryClient = new QueryClient();

export const metadata: Metadata = {
  title: "haveibeenrekt",
  description: "Have you been rekt, anon?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ReactQueryProvider>
  );
}
