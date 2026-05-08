export default function LoadingSpinner({ size = "md" }) {
  const dim = size === "sm" ? 20 : size === "lg" ? 40 : 28;
  const border = size === "sm" ? 2 : 3;
  return (
    <div className="flex items-center justify-center py-12">
      <div
        style={{
          width: dim,
          height: dim,
          border: `${border}px solid rgba(245,158,11,0.15)`,
          borderTopColor: "#F59E0B",
          borderRadius: "50%",
          animation: "spin 0.7s linear infinite",
        }}
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
