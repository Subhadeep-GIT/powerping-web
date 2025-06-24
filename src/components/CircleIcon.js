export default function CircleIcon({ label, img }) {
  return (
    <div
      className="circle-icon"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        minWidth: 64, // 👈 important for scrolling
        flexShrink: 0,
      }}
    >
      <img
        src={img}
        alt={label}
        style={{
          width: 64,
          height: 64,
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />
      <span style={{ marginTop: 8, color: "#eaeaea", fontSize: 12 }}>{label}</span>
    </div>
  );
}