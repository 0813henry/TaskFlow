import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";

export default function MainLayout({ children }) {
  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ background: "#0B0F19" }}
    >
      <Sidebar />
      <div className="flex flex-col flex-1 ml-60 min-w-0">
        <TopBar />
        <motion.main
          className="flex-1 overflow-y-auto p-6"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}
