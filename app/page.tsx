import Link from "next/link";
import Image from "next/image";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Link href="/dashboard">
        <Image
          src="https://loodibee.com/wp-content/uploads/International-Pokemon-logo.png"
          alt="Pokemon Logo"
          width={500}
          height={500}
          priority
        />
      </Link>
    </div>
  );
}