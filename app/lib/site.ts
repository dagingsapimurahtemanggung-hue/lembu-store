export type ProductCategory = "sapi" | "kambing";

export type ProductItem = {
  id: string;
  slug: string;
  category: ProductCategory;
  img: string;
  name: string;
  cut: string;
  price: number;
  unit: string;
  weights: string[];
  defaultWeight: string;
  alt: string;
  summary: string;
  uses: string[];
};

export type ServiceItem = {
  id: string;
  slug: string;
  name: string;
  body: string;
  highlights: string[];
};

const fallbackSiteUrl = "https://lembu-baru.vercel.app";

function cleanSiteUrl(value: string | undefined) {
  const url = value?.trim() || fallbackSiteUrl;
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

export const siteUrl = cleanSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) {
    return path;
  }

  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export const site = {
  name: "Lembu Lemu",
  legalName: "Lembu Lemu Balerejo",
  description:
    "Supplier daging sapi dan kambing segar, halal, dan siap kirim dari Balerejo, Tlogomulyo, Temanggung untuk rumah tangga, katering, aqiqah, kurban, warung, dan restoran.",
  phone: "+6285174440515",
  phoneDisplay: "+62 851-7444-0515",
  whatsapp: "6285174440515",
  email: "akbaralfarizi886@gmail.com",
  address: "Desa Balerejo, RT 1, RW 1, Kecamatan Tlogomulyo, Kabupaten Temanggung, Jawa Tengah 50274",
  shortAddress: "Balerejo, Tlogomulyo, Temanggung",
  instagram: "https://www.instagram.com/lembu_lemuofficial?igsh=bG01NGx6ZDljNDdj",
  logo: "/logo.webp",
  ogImage: "/logo.webp",
};

export const navItems = [
  { href: "#beranda", label: "Beranda" },
  { href: "#galeri", label: "Galeri" },
  { href: "#tentang", label: "Tentang" },
  { href: "#produk", label: "Produk" },
  { href: "#layanan", label: "Layanan" },
  { href: "#kontak", label: "Kontak" },
] as const;

export const products: ProductItem[] = [
  {
    id: "k1",
    slug: "karkas-kambing-utuh",
    category: "kambing",
    img: "/kambing.png",
    name: "Karkas Kambing Utuh",
    cut: "Per ekor atau per kilogram",
    price: 130000,
    unit: "Halal",
    weights: ["0.5kg", "1kg", "2kg", "5kg"],
    defaultWeight: "1kg",
    alt: "Karkas kambing utuh segar dari Lembu Lemu Temanggung",
    summary:
      "Karkas kambing utuh untuk aqiqah, kurban, sate, gulai, dan kebutuhan dapur besar yang memerlukan potongan bersih dan konsisten.",
    uses: ["aqiqah", "kurban", "sate kambing", "gulai", "katering"],
  },
  {
    id: "k2",
    slug: "paha-kambing",
    category: "kambing",
    img: "/pahak.png",
    name: "Paha Kambing",
    cut: "Potongan paha belakang",
    price: 145000,
    unit: "Segar",
    weights: ["0.5kg", "1kg", "2kg"],
    defaultWeight: "1kg",
    alt: "Paha kambing segar potongan premium Temanggung",
    summary:
      "Paha kambing dengan serat padat dan rasa kuat, cocok untuk sate premium, tongseng, gulai, dan menu prasmanan.",
    uses: ["sate", "tongseng", "gulai", "nasi kebuli", "restoran"],
  },
  {
    id: "k3",
    slug: "iga-kambing",
    category: "kambing",
    img: "/igak.png",
    name: "Iga Kambing",
    cut: "Iga dengan daging melekat",
    price: 115000,
    unit: "Segar",
    weights: ["0.5kg", "1kg", "2kg"],
    defaultWeight: "1kg",
    alt: "Iga kambing segar untuk sup dan bakar",
    summary:
      "Iga kambing beraroma khas untuk sup, tengkleng, bakar madu, dan menu hangat yang membutuhkan kaldu pekat.",
    uses: ["sup iga", "tengkleng", "iga bakar", "gulai", "warung makan"],
  },
  {
    id: "k4",
    slug: "jeroan-kambing",
    category: "kambing",
    img: "/jeroank.png",
    name: "Jeroan Kambing",
    cut: "Hati, paru, usus, babat",
    price: 65000,
    unit: "Halal",
    weights: ["0.5kg", "1kg"],
    defaultWeight: "1kg",
    alt: "Jeroan kambing bersih untuk masakan tradisional",
    summary:
      "Jeroan kambing bersih untuk olahan tengkleng, gulai, sate jeroan, dan menu rumahan dengan pemesanan terukur.",
    uses: ["tengkleng", "gulai jeroan", "sate jeroan", "masakan rumahan"],
  },
  {
    id: "s1",
    slug: "paha-sapi",
    category: "sapi",
    img: "/pahas.png",
    name: "Paha Sapi",
    cut: "Fillet",
    price: 165000,
    unit: "Premium",
    weights: ["0.5kg", "1kg", "2kg"],
    defaultWeight: "1kg",
    alt: "Paha sapi segar premium dari Temanggung",
    summary:
      "Paha sapi premium untuk rendang, empal, semur, steak rumahan, dan kebutuhan katering yang butuh potongan rapi.",
    uses: ["rendang", "empal", "semur", "steak", "katering"],
  },
  {
    id: "s2",
    slug: "sengkel-sapi",
    category: "sapi",
    img: "/daginss.png",
    name: "Sengkel Sapi",
    cut: "Shank atau betis bawah",
    price: 110000,
    unit: "Halal",
    weights: ["0.5kg", "1kg", "2kg", "5kg"],
    defaultWeight: "1kg",
    alt: "Sengkel sapi segar untuk rawon dan sop",
    summary:
      "Sengkel sapi berkolagen untuk rawon, sop, soto, bakso urat, dan masakan berkuah yang butuh tekstur kuat.",
    uses: ["rawon", "sop sapi", "soto", "bakso urat", "restoran"],
  },
  {
    id: "s3",
    slug: "sandung-lamur",
    category: "sapi",
    img: "/dagingsh.png",
    name: "Sandung Lamur",
    cut: "Brisket atau dada bawah",
    price: 120000,
    unit: "Segar",
    weights: ["0.5kg", "1kg", "2kg"],
    defaultWeight: "1kg",
    alt: "Sandung lamur sapi segar untuk soto dan brisket",
    summary:
      "Sandung lamur sapi dengan lapisan lemak seimbang untuk soto, rawon, brisket, semur, dan kuah gurih.",
    uses: ["soto", "rawon", "brisket", "semur", "dapur besar"],
  },
  {
    id: "s4",
    slug: "tulang-sapi",
    category: "sapi",
    img: "/igas.png",
    name: "Tulang Sapi",
    cut: "Tulang muda dan sumsum",
    price: 35000,
    unit: "Segar",
    weights: ["1kg", "2kg", "5kg"],
    defaultWeight: "1kg",
    alt: "Tulang sapi dan sumsum segar untuk kaldu",
    summary:
      "Tulang sapi dan sumsum untuk kaldu, bakso, sop, kuah mie, dan kebutuhan dapur yang mengejar rasa dasar kuat.",
    uses: ["kaldu", "bakso", "sop tulang", "kuah mie", "katering"],
  },
  {
    id: "s5",
    slug: "jeroan-sapi-lengkap",
    category: "sapi",
    img: "/jeroans.png",
    name: "Jeroan Sapi Lengkap",
    cut: "Babat, iso, paru, kikil",
    price: 55000,
    unit: "Halal",
    weights: ["0.5kg", "1kg", "2kg"],
    defaultWeight: "1kg",
    alt: "Jeroan sapi lengkap bersih untuk warung dan rumah makan",
    summary:
      "Jeroan sapi lengkap untuk soto, gulai, oseng mercon, rica, dan menu warung yang membutuhkan stok stabil.",
    uses: ["soto", "gulai", "oseng mercon", "rica", "warung"],
  },
  {
    id: "s6",
    slug: "daging-giling-sapi",
    category: "sapi",
    img: "/giling.png",
    name: "Daging Giling Sapi",
    cut: "Ground beef 80/20",
    price: 95000,
    unit: "Fresh",
    weights: ["0.5kg", "1kg", "2kg"],
    defaultWeight: "1kg",
    alt: "Daging giling sapi segar untuk bakso burger dan isian",
    summary:
      "Daging giling sapi fresh untuk bakso, burger, saus bolognese, dimsum, isian pastel, dan menu siap olah.",
    uses: ["bakso", "burger", "bolognese", "dimsum", "usaha kuliner"],
  },
];

export const services: ServiceItem[] = [
  {
    id: "01",
    slug: "potong-custom",
    name: "Potong Custom",
    body: "Dadu, fillet, slice tipis, boneless, karkas utuh, atau potongan besar untuk dapur produksi. Ukuran potong bisa disesuaikan sebelum pengiriman.",
    highlights: ["dadu", "fillet", "slice", "boneless", "karkas"],
  },
  {
    id: "02",
    slug: "antar-gratis-tlogomulyo",
    name: "Antar Area Sekitar",
    body: "Pengiriman untuk Tlogomulyo dan area sekitar Temanggung. Jadwal subuh dapat dikonfirmasi untuk katering, warung makan, dan kebutuhan acara.",
    highlights: ["Tlogomulyo", "Temanggung", "jadwal subuh", "pesanan acara"],
  },
  {
    id: "03",
    slug: "paket-katering",
    name: "Paket Katering",
    body: "Harga khusus untuk pembelian volume besar. Cocok untuk katering, warung, rumah makan, restoran, hotel kecil, dan dapur produksi harian.",
    highlights: ["volume besar", "restoran", "warung", "stok stabil"],
  },
  {
    id: "04",
    slug: "paket-aqiqah",
    name: "Paket Aqiqah",
    body: "Bantuan pemilihan kambing, penyembelihan sesuai syariat, pemotongan, pengemasan, hingga distribusi sesuai kebutuhan keluarga.",
    highlights: ["aqiqah", "kambing pilihan", "pemotongan halal", "pengemasan"],
  },
  {
    id: "05",
    slug: "paket-kurban",
    name: "Paket Kurban",
    body: "Terima rencana kurban jauh hari. Tim membantu pemilihan hewan, penyembelihan halal, pemotongan, pengemasan, dan distribusi.",
    highlights: ["kurban", "idul adha", "hewan pilihan", "distribusi"],
  },
  {
    id: "06",
    slug: "langganan-bulanan",
    name: "Langganan Bulanan",
    body: "Pelanggan tetap mendapat prioritas stok, pengingat harga, dan pilihan potongan yang konsisten untuk kebutuhan dapur rutin.",
    highlights: ["stok prioritas", "harga rutin", "dapur harian", "WhatsApp"],
  },
];

export const trustPoints = [
  {
    label: "Rantai produksi ringkas",
    body: "Ternak, pemotongan, sortasi, dan pengiriman dikelola dekat dengan sumber sehingga harga tetap masuk akal.",
  },
  {
    label: "Potong segar",
    body: "Stok disiapkan harian agar pelanggan menerima daging yang lebih segar dan tidak tercampur potongan lama.",
  },
  {
    label: "Halal dan bersih",
    body: "Proses pemotongan mengikuti kebutuhan halal, kebersihan alat, dan pemisahan potongan sesuai pesanan.",
  },
  {
    label: "Siap untuk bisnis",
    body: "Katering, warung makan, dan restoran bisa meminta ukuran potong, jadwal kirim, dan estimasi stok lebih awal.",
  },
];

export const galleryItems = [
  {
    type: "video",
    title: "Proses produksi",
    videoId: "WrOzwoMKzH4",
    label: "Video proses",
  },
  {
    type: "photo",
    title: "Kualitas premium",
    img: "/kualtitas.jpg",
    alt: "Daging segar berkualitas dari Lembu Lemu",
  },
  {
    type: "photo",
    title: "Pemotongan",
    img: "/pemotongan.jpg",
    alt: "Proses pemotongan daging sapi dan kambing",
  },
  {
    type: "video",
    title: "Standar halal",
    videoId: "jLjP9xVJx-8",
    label: "Video halal",
  },
  {
    type: "photo",
    title: "Kemasan",
    img: "/kemasan.jpg",
    alt: "Kemasan daging segar siap kirim",
  },
] as const;

export const faqs = [
  {
    question: "Apakah Lembu Lemu melayani pembelian kiloan?",
    answer:
      "Ya. Pelanggan bisa membeli daging sapi atau kambing mulai dari 0.5 kg untuk beberapa produk, 1 kg, 2 kg, sampai 5 kg sesuai ketersediaan stok harian.",
  },
  {
    question: "Area pengiriman Lembu Lemu mencakup mana saja?",
    answer:
      "Area utama adalah Balerejo, Tlogomulyo, Temanggung, dan sekitarnya. Untuk Magelang, Wonosobo, dan Jogja, jadwal pengiriman dapat dikonfirmasi melalui WhatsApp.",
  },
  {
    question: "Apakah bisa pesan potongan khusus untuk katering?",
    answer:
      "Bisa. Lembu Lemu menerima potong dadu, fillet, slice, boneless, karkas utuh, tulang, dan jeroan sesuai kebutuhan dapur katering atau restoran.",
  },
  {
    question: "Bagaimana cara memastikan stok hari ini?",
    answer:
      "Cara tercepat adalah mengirim daftar kebutuhan melalui WhatsApp. Tim akan mengonfirmasi stok, pilihan berat, estimasi harga, dan jadwal kirim.",
  },
  {
    question: "Apakah tersedia layanan aqiqah dan kurban?",
    answer:
      "Ya. Lembu Lemu melayani paket aqiqah dan kurban mulai dari pemilihan hewan, penyembelihan sesuai syariat, pemotongan, pengemasan, hingga distribusi.",
  },
];

export const sourceReferences = [
  {
    label: "BPJPH - Sertifikasi Halal",
    href: "https://bpjph.halal.go.id/detail/sertifikasi-halal/",
    note: "Rujukan pengakuan kehalalan produk di Indonesia.",
  },
  {
    label: "Kementerian Pertanian - Prinsip ASUH",
    href: "https://www.pertanian.go.id/?act=view&id=4810&show=news",
    note: "Rujukan pangan asal hewan yang aman, sehat, utuh, dan halal.",
  },
];

export const serviceAreas = [
  "Balerejo",
  "Tlogomulyo",
  "Temanggung",
  "Kedu",
  "Parakan",
  "Ngadirejo",
  "Candiroto",
  "Bulu",
  "Kranggan",
  "Pringsurat",
  "Kaloran",
  "Kandangan",
  "Jumo",
  "Magelang",
  "Wonosobo",
  "Secang",
  "Jogja",
];

const purchaseIntents = [
  "daging sapi segar",
  "daging kambing segar",
  "supplier daging sapi",
  "supplier daging kambing",
  "jual daging sapi halal",
  "jual daging kambing halal",
  "pemotongan sapi halal",
  "pemotongan kambing halal",
  "jagal sapi halal",
  "jagal kambing halal",
  "paha sapi segar",
  "sengkel sapi segar",
  "sandung lamur sapi",
  "tulang sapi sumsum",
  "jeroan sapi bersih",
  "daging giling sapi",
  "karkas kambing utuh",
  "paha kambing segar",
  "iga kambing segar",
  "jeroan kambing bersih",
  "paket aqiqah kambing",
  "paket kurban sapi",
  "paket kurban kambing",
  "daging untuk katering",
  "daging untuk restoran",
  "daging untuk warung makan",
  "daging halal terdekat",
  "daging segar terdekat",
  "pesan daging via WhatsApp",
  "antar daging segar",
];

const cookingIntents = [
  "rendang",
  "empal",
  "semur",
  "rawon",
  "soto sapi",
  "sop iga",
  "bakso",
  "tengkleng",
  "sate kambing",
  "gulai kambing",
  "nasi kebuli",
  "brisket",
  "kaldu sapi",
  "oseng mercon",
  "tongseng",
  "daging slice",
  "daging fillet",
  "daging dadu",
  "boneless sapi",
  "karkas utuh",
];

export const seoKeywords = Array.from(
  new Set([
    "Lembu Lemu",
    "Lembu Lemu Temanggung",
    "Lembu Lemu Tlogomulyo",
    "daging sapi segar Temanggung",
    "daging kambing segar Temanggung",
    "supplier daging halal Jawa Tengah",
    "pemotongan daging halal Tlogomulyo",
    "jasa jagal sapi Temanggung",
    "jasa jagal kambing Temanggung",
    "paket aqiqah Temanggung",
    "paket kurban Temanggung",
    "daging sapi untuk katering Temanggung",
    "daging kambing untuk sate Temanggung",
    ...products.flatMap((product) => [
      `${product.name} Temanggung`,
      `${product.name} Tlogomulyo`,
      `${product.name} halal`,
      `${product.name} segar`,
      ...product.uses.map((use) => `${product.name} untuk ${use}`),
    ]),
    ...services.flatMap((service) => [
      `${service.name} Temanggung`,
      `${service.name} Tlogomulyo`,
      ...service.highlights.map((highlight) => `${service.name} ${highlight}`),
    ]),
    ...purchaseIntents.flatMap((intent) => serviceAreas.map((area) => `${intent} ${area}`)),
    ...cookingIntents.flatMap((intent) => [
      `daging untuk ${intent} Temanggung`,
      `potongan daging untuk ${intent}`,
      `supplier daging ${intent}`,
    ]),
  ]),
);

export const seoClusters = [
  {
    title: "Daging sapi dan kambing segar Temanggung",
    body: "Halaman ini menargetkan pencarian daging sapi segar Temanggung, daging kambing segar Temanggung, supplier daging halal Tlogomulyo, dan pesan daging via WhatsApp untuk kebutuhan rumah tangga maupun bisnis kuliner.",
    terms: ["daging sapi segar", "daging kambing halal", "supplier daging Temanggung", "daging segar terdekat"],
  },
  {
    title: "Aqiqah, kurban, dan potong custom",
    body: "Lembu Lemu juga relevan untuk pencarian paket aqiqah Temanggung, paket kurban sapi, pemotongan kambing halal, potong dadu, fillet, slice, boneless, karkas utuh, dan potongan sesuai kebutuhan dapur.",
    terms: ["paket aqiqah", "paket kurban", "potong custom", "karkas kambing"],
  },
  {
    title: "Dapur bisnis, katering, warung, dan restoran",
    body: "Untuk pencarian daging katering Temanggung, stok daging restoran, daging untuk warung makan, sengkel sapi rawon, tulang sapi kaldu, dan sandung lamur soto, katalog ini memberi harga awal dan opsi berat yang bisa dikonfirmasi.",
    terms: ["daging katering", "stok restoran", "daging warung makan", "kaldu sapi"],
  },
];

export function formatRupiah(value: number) {
  return `Rp ${value.toLocaleString("id-ID")}`;
}

export function productPath(product: ProductItem) {
  return `/produk/${product.slug}`;
}

export function servicePath(service: ServiceItem) {
  return `/layanan/${service.slug}`;
}
