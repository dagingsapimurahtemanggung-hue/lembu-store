import Image from "next/image";
import Link from "next/link";
import { MessageCircle, ShoppingCart } from "lucide-react";
import { site } from "../lib/site";

export function DetailHeader() {
  return (
    <header className="detail-header">
      <Link href="/#beranda" className="brand-mark">
        <Image src={site.logo} alt="Logo Lembu Lemu" width={56} height={56} />
        <span>Lembu Lemu</span>
      </Link>
      <nav aria-label="Navigasi detail">
        <Link href="/#produk">
          <ShoppingCart size={17} />
          Produk
        </Link>
        <Link href="/#layanan">Layanan</Link>
        <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer">
          <MessageCircle size={17} />
          WhatsApp
        </a>
      </nav>
    </header>
  );
}
