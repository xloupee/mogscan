import Image from "next/image";
import Link from "next/link";

export default function SiteBrand() {
  return (
    <Link href="/" className="brand-wrap" aria-label="Mogscan home">
      <Image
        src="/brand/mogscan-word-tight.png"
        alt="Mogscan"
        width={560}
        height={180}
        className="brand-logo"
        priority
      />
    </Link>
  );
}
