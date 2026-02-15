export default function Card({ children }: any) {
  return (
    <div className="card p-4 hover:scale-[1.02] transition-all">{children}</div>
  );
}
