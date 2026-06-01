import { ReactNode } from "react";
import Footer from "../Footer";
import WhatsAppBar from "./WhatsAppBar";

export default function PageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <WhatsAppBar />
    </div>
  );
}