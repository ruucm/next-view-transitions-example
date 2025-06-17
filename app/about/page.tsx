import { Link } from "@/lib/next-view-transitions";

export default function About() {
  return (
    <div className="bg-amber-200">
      <Link href="/">Home</Link>
      <h1>About Page</h1>
    </div>
  );
}
