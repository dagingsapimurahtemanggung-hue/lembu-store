"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowUp,
  Camera,
  CheckCircle,
  ChevronRight,
  Clock,
  ExternalLink,
  Leaf,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Minus,
  PackageCheck,
  Phone,
  Play,
  Plus,
  Search,
  ShieldCheck,
  ShoppingCart,
  Truck,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  faqs,
  formatRupiah,
  galleryItems,
  navItems,
  areaPath,
  productPath,
  products,
  seoClusters,
  serviceAreas,
  servicePath,
  services,
  site,
  sourceReferences,
  trustPoints,
  type ProductItem,
} from "../lib/site";

type CartItem = {
  key: string;
  productId: string;
  name: string;
  img: string;
  price: number;
  priceLabel: string;
  weight: string;
  quantity: number;
};

function weightMultiplier(weight: string) {
  return Number.parseFloat(weight.replace("kg", "")) || 1;
}

function productPriceText(product: ProductItem, weight?: string) {
  if (product.available === false) {
    return product.priceLabel ?? "Tidak dijual";
  }

  if (product.priceLabel) {
    return product.priceLabel;
  }

  if (weight) {
    return `${formatRupiah(product.price * weightMultiplier(weight))} / ${weight}`;
  }

  return `${formatRupiah(product.price)}/kg`;
}

function buildWhatsAppText(cart: CartItem[]) {
  const total = cart.reduce(
    (sum, item) => sum + item.price * weightMultiplier(item.weight) * item.quantity,
    0,
  );

  const lines = cart.map((item) => {
    const lineTotal = item.price * weightMultiplier(item.weight) * item.quantity;
    return `- ${item.name} | ${item.weight} x ${item.quantity} | ${item.priceLabel} = ${formatRupiah(lineTotal)}`;
  });

  return [
    "Pesanan dari website Lembu Lemu",
    "",
    ...lines,
    "",
    `Total sementara: ${formatRupiah(total)}`,
    "",
    "Mohon konfirmasi stok, jadwal kirim, dan ongkir. Terima kasih.",
  ].join("\n");
}

function VideoTile({ videoId, title }: { videoId: string; title: string }) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <iframe
        title={title}
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    );
  }

  return (
    <button className="video-thumb" type="button" onClick={() => setPlaying(true)}>
      <Image
        src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
        alt={`Thumbnail ${title}`}
        fill
        sizes="(max-width: 768px) 92vw, 42vw"
      />
      <span className="play-mark" aria-hidden="true">
        <Play size={28} fill="currentColor" />
      </span>
    </button>
  );
}

export function LembuHome() {
  const [selectedWeights, setSelectedWeights] = useState<Record<string, string>>(() =>
    Object.fromEntries(products.map((product) => [product.id, product.defaultWeight])),
  );
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [backTopVisible, setBackTopVisible] = useState(false);
  const [notice, setNotice] = useState("");

  const cartQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * weightMultiplier(item.weight) * item.quantity,
    0,
  );

  useEffect(() => {
    const onScroll = () => {
      setBackTopVisible(window.scrollY > 560);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!notice) {
      return;
    }

    const timer = window.setTimeout(() => setNotice(""), 2200);
    return () => window.clearTimeout(timer);
  }, [notice]);

  useEffect(() => {
    document.body.style.overflow = cartOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setCartOpen(false);
        setMobileOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function addProduct(product: ProductItem) {
    if (product.available === false) {
      setNotice(`${product.name} tidak dijual saat ini`);
      return;
    }

    const weight = selectedWeights[product.id] ?? product.defaultWeight;
    const key = `${product.id}-${weight}`;

    setCart((current) => {
      const existing = current.find((item) => item.key === key);
      if (existing) {
        return current.map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }

      return [
        ...current,
        {
          key,
          productId: product.id,
          name: product.name,
          img: product.img,
          price: product.price,
          priceLabel: productPriceText(product),
          weight,
          quantity: 1,
        },
      ];
    });

    setNotice(`${product.name} ${weight} masuk keranjang`);
    setCartOpen(true);
  }

  function changeQuantity(key: string, delta: number) {
    setCart((current) =>
      current
        .map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + delta } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  function checkout() {
    if (!cart.length) {
      return;
    }

    const message = encodeURIComponent(buildWhatsAppText(cart));
    window.open(`https://wa.me/${site.whatsapp}?text=${message}`, "_blank", "noopener,noreferrer");
  }

  function handleContactSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !email || !message) {
      setNotice("Lengkapi nama, email, dan pesan dulu");
      return;
    }

    const subject = encodeURIComponent(`Pesan website dari ${name}`);
    const body = encodeURIComponent(`${message}\n\nNama: ${name}\nEmail: ${email}`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    event.currentTarget.reset();
    setNotice("Pesan siap dikirim lewat email");
  }

  function handleSubscribe(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") || "").trim();

    if (!email) {
      setNotice("Masukkan email dulu");
      return;
    }

    event.currentTarget.reset();
    setNotice("Email dicatat untuk update stok dan harga");
  }

  return (
    <>
      <div className="topbar">
        <a href="#kontak" className="topbar-link">
          <MapPin size={14} />
          {site.shortAddress}
        </a>
        <a href={`mailto:${site.email}`} className="topbar-link">
          <Mail size={14} />
          {site.email}
        </a>
        <a href={site.instagram} className="topbar-icon" target="_blank" rel="noopener noreferrer">
          <Camera size={15} />
          <span className="sr-only">Instagram Lembu Lemu</span>
        </a>
      </div>

      <header className="site-header">
        <a href="#beranda" className="brand-mark" onClick={() => setMobileOpen(false)}>
          <Image src={site.logo} alt="Logo Lembu Lemu" width={64} height={64} priority />
          <span>Lembu Lemu</span>
        </a>

        <nav className="desktop-nav" aria-label="Menu utama">
          {navItems.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <button className="cart-trigger" type="button" onClick={() => setCartOpen(true)}>
            <ShoppingCart size={18} />
            <span>{cartQuantity}</span>
          </button>
          <button
            className="menu-trigger"
            type="button"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <nav className={`mobile-nav ${mobileOpen ? "open" : ""}`} aria-label="Menu mobile">
        {navItems.map((item) => (
          <a href={item.href} key={item.href} onClick={() => setMobileOpen(false)}>
            {item.label}
          </a>
        ))}
      </nav>

      <main>
        <section className="hero-section" id="beranda">
          <div className="hero-copy">
            <span className="eyebrow">Balerejo, Tlogomulyo, Temanggung</span>
            <h1>
              Daging segar
              <span>halal.</span>
            </h1>
            <p>
              Dari sumber dekat untuk rumah tangga, katering, kurban sapi,
              warung, dan restoran. Pilih potongan, tentukan berat, lalu konfirmasi
              stok lewat WhatsApp.
            </p>
            <div className="hero-actions">
              <a className="primary-action" href="#produk">
                <ShoppingCart size={18} />
                Lihat produk
              </a>
              <a
                className="secondary-action"
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={18} />
                Tanya stok
              </a>
            </div>
          </div>

          <div className="hero-product" aria-label="Daging sapi segar Lembu Lemu">
            <Image
              src="/daging.png"
              alt="Daging sapi segar Lembu Lemu"
              fill
              priority
              sizes="(max-width: 620px) 68vw, (max-width: 920px) 78vw, 36vw"
            />
          </div>

          <div className="hero-proof">
            <div>
              <Image
                src="/halal.png"
                alt="Logo halal"
                width={34}
                height={61}
              />
              <span>Halal</span>
            </div>
            <div>
              <strong>15+</strong>
              <span>Tahun pengalaman jagal dan distribusi</span>
            </div>
            <div>
              <strong>04.00</strong>
              <span>Mulai layanan pagi</span>
            </div>
          </div>
        </section>

        <section className="gallery-section" id="galeri">
          <div className="section-head split">
            <div>
              <span className="eyebrow">Galeri proses</span>
              <h2>Lihat potongan, proses, dan tim kami.</h2>
            </div>
            <p>
              Foto asli dan video proses membantu pelanggan menilai kesegaran, cara potong,
              dan kesiapan pengiriman sebelum pesan.
            </p>
          </div>

          <div className="gallery-grid">
            {galleryItems.map((item, index) => (
              <article
                className={`gallery-tile ${index === 0 ? "feature" : ""}`}
                key={`${item.title}-${index}`}
              >
                <div className="gallery-media">
                  {item.type === "video" ? (
                    <VideoTile videoId={item.videoId} title={item.title} />
                  ) : (
                    <Image
                      src={item.img}
                      alt={item.alt}
                      fill
                      sizes={index === 0 ? "55vw" : "28vw"}
                    />
                  )}
                </div>
                <span>{String(index + 1).padStart(2, "0")} / {item.title}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="about-section" id="tentang">
          <div className="about-title">
            <span className="eyebrow">Tentang Lembu Lemu</span>
            <h2>
              Bukan sekadar jagal.
              <span>Ini dapur pasokan daging lokal.</span>
            </h2>
            <p>
              Lembu Lemu menyediakan dan mendistribusikan daging sapi berkualitas
              melalui produksi yang dekat, ringkas, bersih, dan mudah dikonfirmasi.
            </p>
          </div>
          <div className="trust-list">
            {trustPoints.map((point, index) => (
              <article key={point.label}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{point.label}</h3>
                <p>{point.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="product-section" id="produk">
          <div className="section-head split">
            <div>
              <span className="eyebrow">Menu dan harga awal</span>
              <h2>Pilih potongan hari ini.</h2>
            </div>
            <p>
              Harga mengikuti berat yang dipilih. Stok, jadwal kirim, dan kebutuhan
              potong custom tetap dikonfirmasi lewat WhatsApp.
            </p>
          </div>

          <div className="product-grid">
            {products.map((product) => {
              const weight = selectedWeights[product.id] ?? product.defaultWeight;
              const displayPrice = productPriceText(product, weight);

              return (
                <article className="product-card" key={product.id}>
                  <Link className="product-image" href={productPath(product)}>
                    <Image
                      src={product.img}
                      alt={product.alt}
                      fill
                      sizes="(max-width: 768px) 92vw, (max-width: 1200px) 45vw, 25vw"
                    />
                    <span>{displayPrice}</span>
                  </Link>
                  <div className="product-body">
                    <div>
                      <p className="product-kicker">Daging sapi / {product.unit}</p>
                      <h3>{product.name}</h3>
                      <p>{product.cut}</p>
                    </div>
                    <div className="weight-row" aria-label={`Pilih berat ${product.name}`}>
                      {product.weights.map((itemWeight) => (
                        <button
                          key={itemWeight}
                          type="button"
                          className={weight === itemWeight ? "selected" : ""}
                          onClick={() =>
                            setSelectedWeights((current) => ({
                              ...current,
                              [product.id]: itemWeight,
                            }))
                          }
                        >
                          {itemWeight}
                        </button>
                      ))}
                    </div>
                    <div className="product-actions">
                      <button
                        type="button"
                        onClick={() => addProduct(product)}
                        disabled={product.available === false}
                      >
                        <Plus size={17} />
                        {product.available === false ? "Tidak dijual" : "Tambah"}
                      </button>
                      <Link href={productPath(product)}>
                        Detail
                        <ChevronRight size={16} />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="service-section" id="layanan">
          <div className="section-head">
            <span className="eyebrow">Layanan</span>
            <h2>Lebih dari beli daging.</h2>
            <p>Kami bantu dari pilihan potongan sampai jadwal kirim yang cocok dengan dapur Anda.</p>
          </div>
          <div className="service-grid">
            {services.map((service) => (
              <article className="service-card" key={service.id}>
                <span>{service.id}</span>
                <h3>{service.name}</h3>
                <p>{service.body}</p>
                <Link href={servicePath(service)}>
                  Lihat layanan
                  <ChevronRight size={16} />
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="seo-section" aria-labelledby="panduan-belanja">
          <div className="section-head split">
            <div>
              <span className="eyebrow">Panduan belanja</span>
              <h2 id="panduan-belanja">Jawaban cepat untuk pencarian pelanggan.</h2>
            </div>
            <p>
              Konten ini ditulis answer-first agar mudah dipahami pelanggan, mesin pencari,
              dan mesin AI saat mencari rujukan daging halal di Temanggung.
            </p>
          </div>
          <div className="cluster-grid">
            {seoClusters.map((cluster) => (
              <article className="cluster-card" key={cluster.title}>
                <Search size={20} />
                <h3>{cluster.title}</h3>
                <p>{cluster.body}</p>
                <div>
                  {cluster.terms.map((term) => (
                    <span key={term}>{term}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="area-section">
          <div>
            <span className="eyebrow">Area layanan</span>
            <h2>Dari Tlogomulyo untuk Temanggung dan sekitarnya.</h2>
          </div>
          <div className="area-list">
            {serviceAreas.map((area) => (
              <Link href={areaPath(area)} key={area}>
                {area}
              </Link>
            ))}
          </div>
        </section>

        <section className="standards-section">
          <div className="standard-copy">
            <span className="eyebrow">Rujukan standar</span>
            <h2>Halal, bersih, dan mudah ditelusuri.</h2>
            <p>
              Untuk pelanggan yang ingin mengecek konteks halal dan keamanan pangan asal
              hewan, kami sertakan rujukan resmi yang relevan. Pemesanan tetap
              dikonfirmasi langsung agar stok dan proses sesuai kebutuhan.
            </p>
          </div>
          <div className="reference-list">
            {sourceReferences.map((reference) => (
              <a
                key={reference.href}
                href={reference.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink size={18} />
                <span>
                  <strong>{reference.label}</strong>
                  {reference.note}
                </span>
              </a>
            ))}
          </div>
        </section>

        <section className="faq-section">
          <div className="section-head">
            <span className="eyebrow">FAQ</span>
            <h2>Pertanyaan yang paling sering ditanyakan.</h2>
          </div>
          <div className="faq-list">
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <section className="prefooter">
        <div>
          <span className="eyebrow">Ikuti kami</span>
          <a href={site.instagram} target="_blank" rel="noopener noreferrer">
            <Camera size={18} />
            Instagram Lembu Lemu
          </a>
        </div>
        <Image src={site.logo} alt="Lembu Lemu" width={148} height={148} />
        <form onSubmit={handleSubscribe}>
          <label htmlFor="subscribe-email">Update harga dan stok</label>
          <div>
            <input
              id="subscribe-email"
              name="email"
              type="email"
              placeholder="email@anda.com"
              aria-label="Alamat email"
            />
            <button type="submit">Daftar</button>
          </div>
        </form>
      </section>

      <footer className="site-footer" id="kontak">
        <div className="footer-grid">
          <div className="contact-column">
            <span className="eyebrow">Hubungi kami</span>
            <h2>Kirim pesan atau daftar kebutuhan.</h2>
            <form onSubmit={handleContactSubmit}>
              <input name="name" type="text" placeholder="Nama Anda" />
              <input name="email" type="email" placeholder="Email Anda" />
              <textarea name="message" placeholder="Tulis kebutuhan daging, berat, dan jadwal..." />
              <button type="submit">Kirim email</button>
            </form>
          </div>

          <div className="footer-info">
            <span className="eyebrow">Informasi kontak</span>
            <p>
              <MapPin size={17} />
              {site.address}
            </p>
            <a href={`tel:${site.phone}`}>
              <Phone size={17} />
              {site.phoneDisplay}
            </a>
            <a href={`mailto:${site.email}`}>
              <Mail size={17} />
              {site.email}
            </a>
            <a
              className="wa-footer"
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={18} />
              Chat via WhatsApp
            </a>
          </div>

          <div className="footer-info">
            <span className="eyebrow">Jam operasional</span>
            <p>
              <Clock size={17} />
              Senin - Sabtu, 04.00 - 11.00 WIB. Minggu dan hari besar konfirmasi
              lewat WhatsApp.
            </p>
            <div className="quality-stack">
              <span><ShieldCheck size={18} /> Halal</span>
              <span><PackageCheck size={18} /> Siap kemas</span>
              <span><Truck size={18} /> Bisa kirim</span>
              <span><Leaf size={18} /> Sumber lokal</span>
            </div>
          </div>
        </div>
        <div className="footer-map">
          <iframe
            title="Peta Google Maps Lembu Lemu"
            src="https://www.google.com/maps?q=Desa%20Balerejo%20Tlogomulyo%20Temanggung&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="footer-bottom">
          <strong>Lembu Lemu</strong>
          <span>2026 - Halal, segar, terpercaya - Tlogomulyo, Temanggung</span>
        </div>
      </footer>

      <aside className={`cart-panel ${cartOpen ? "open" : ""}`} aria-hidden={!cartOpen}>
        <button className="cart-backdrop" type="button" onClick={() => setCartOpen(false)} />
        <div className="cart-drawer" role="dialog" aria-modal="true" aria-label="Keranjang belanja">
          <div className="cart-head">
            <div>
              <span>Keranjang</span>
              <strong>{cartQuantity} item</strong>
            </div>
            <button type="button" onClick={() => setCartOpen(false)} aria-label="Tutup keranjang">
              <X size={22} />
            </button>
          </div>

          <div className="cart-items">
            {!cart.length ? (
              <div className="empty-cart">
                <ShoppingCart size={36} />
                <p>Keranjang masih kosong.</p>
              </div>
            ) : (
              cart.map((item) => {
                const lineTotal = item.price * weightMultiplier(item.weight) * item.quantity;
                return (
                  <article className="cart-row" key={item.key}>
                    <Image src={item.img} alt={item.name} width={58} height={58} />
                    <div>
                      <h3>{item.name}</h3>
                      <p>{item.weight} x {item.priceLabel}</p>
                      <strong>{formatRupiah(lineTotal)}</strong>
                    </div>
                    <div className="quantity-control">
                      <button type="button" onClick={() => changeQuantity(item.key, -1)}>
                        <Minus size={15} />
                      </button>
                      <span>{item.quantity}</span>
                      <button type="button" onClick={() => changeQuantity(item.key, 1)}>
                        <Plus size={15} />
                      </button>
                    </div>
                  </article>
                );
              })
            )}
          </div>

          <div className="cart-foot">
            <div>
              <span>Total sementara</span>
              <strong>{formatRupiah(cartTotal)}</strong>
            </div>
            <button type="button" onClick={checkout} disabled={!cart.length}>
              <MessageCircle size={18} />
              Pesan via WhatsApp
            </button>
          </div>
        </div>
      </aside>

      <button
        className={`back-top ${backTopVisible ? "visible" : ""}`}
        type="button"
        aria-label="Kembali ke atas"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ArrowUp size={20} />
      </button>

      {notice ? (
        <div className="toast" role="status">
          <CheckCircle size={18} />
          {notice}
        </div>
      ) : null}
    </>
  );
}
