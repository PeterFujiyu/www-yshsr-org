import { Header } from "./header";
import { Footer } from "./footer";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow relative overflow-hidden" data-swipeable>
        {children}
      </main>
      <Footer />
    </div>
  );
}
