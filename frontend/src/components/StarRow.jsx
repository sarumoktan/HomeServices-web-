export function StarRow({ rating, size = 11 }) {
  return (
    <span>
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} style={{ fontSize: size, opacity: n <= Math.floor(rating) ? 1 : 0.22 }}>
          ⭐
        </span>
      ))}
    </span>
  );
}
