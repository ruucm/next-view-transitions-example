import { Link } from "@/lib/next-view-transitions";

export default function Home() {
  return (
    <div className="bg-red-500">
      <Link href="/about">About</Link>
    </div>
  );
}
