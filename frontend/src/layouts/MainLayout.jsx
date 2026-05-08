import Navbar from "../components/Navbar";

/**
 * Shell layout for authenticated pages: Navbar + centered content container.
 */
export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-5xl">{children}</main>
    </div>
  );
}
