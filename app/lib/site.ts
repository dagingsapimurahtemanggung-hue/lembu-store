export type ProductCategory = "sapi";

export type ProductItem = {
  id: string;
  slug: string;
  category: ProductCategory;
  img: string;
  name: string;
  cut: string;
  price: number;
  priceLabel?: string;
  available?: boolean;
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

const fallbackSiteUrl = "https://www.lembulemu.com";

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
    "Supplier daging sapi segar, halal, dan siap kirim dari Balerejo, Tlogomulyo, Temanggung untuk rumah tangga, katering, kurban sapi, warung, dan restoran.",
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

const beefBoardImage = "/product-images/raw-beef.jpg";
const rawBeefImage = "/product-images/raw-beef.jpg";
const beefLiverImage = "/product-images/ati-limpo.jpg";
const beefTripeImage = "/product-images/babat-iso.jpg";
const beefHeartImage = "/product-images/jantung-ginjal.jpg";
const beefBrisketImage = "/product-images/pipi-sandung-lamur.jpg";
const beefLungImage = "/product-images/paru.jpg";
const beefRibImage = "/product-images/balung-igo.jpg";
const beefOxtailImage = "/product-images/buntut.jpg";
const beefBonesImage = "/product-images/balung.jpg";
const beefBrainImage = "/product-images/otak.jpg";
const beefTongueImage = "/product-images/lidah.jpg";
const beefMuzzleImage = "/product-images/congor.jpg";
const beefHeadImage = "/product-images/kepala-utuh.jpg";
const beefShankImage = "/product-images/sekengkel.jpg";
const beefSuetImage = "/product-images/gajih.jpg";
const beefTendonImage = "/product-images/urat.jpg";

export const products: ProductItem[] = [
  {
    id: "s1",
    slug: "daging-super",
    category: "sapi",
    img: beefBoardImage,
    name: "Daging Super",
    cut: "Potongan daging sapi kualitas super",
    price: 145000,
    unit: "Per kg",
    weights: ["0.5kg", "1kg", "2kg"],
    defaultWeight: "1kg",
    alt: "Daging sapi super segar Lembu Lemu Temanggung",
    summary:
      "Daging Super adalah pilihan daging sapi segar untuk menu premium, rendang, semur, empal, dan kebutuhan dapur yang mengejar tekstur bersih.",
    uses: ["rendang", "semur", "empal", "katering", "restoran"],
  },
  {
    id: "s2",
    slug: "daging-no-2",
    category: "sapi",
    img: rawBeefImage,
    name: "Daging No 2",
    cut: "Potongan daging sapi harian",
    price: 140000,
    unit: "Per kg",
    weights: ["0.5kg", "1kg", "2kg"],
    defaultWeight: "1kg",
    alt: "Daging sapi nomor dua segar dari Lembu Lemu",
    summary:
      "Daging No 2 cocok untuk masakan rumahan, warung makan, dan stok dapur harian yang membutuhkan potongan sapi segar dengan harga seimbang.",
    uses: ["masakan rumahan", "warung makan", "soto", "oseng", "katering"],
  },
  {
    id: "s3",
    slug: "daging-no-3",
    category: "sapi",
    img: rawBeefImage,
    name: "Daging No 3",
    cut: "Potongan ekonomis untuk olahan matang",
    price: 135000,
    unit: "Per kg",
    weights: ["0.5kg", "1kg", "2kg"],
    defaultWeight: "1kg",
    alt: "Daging sapi nomor tiga segar untuk olahan harian",
    summary:
      "Daging No 3 menjadi opsi ekonomis untuk oseng, tumis, semur, campuran sop, dan kebutuhan produksi makanan yang tetap butuh daging sapi segar.",
    uses: ["oseng", "tumis", "semur", "sop", "dapur produksi"],
  },
  {
    id: "s4",
    slug: "ati-limpo",
    category: "sapi",
    img: beefLiverImage,
    name: "Ati + Limpo",
    cut: "Ati sapi dan limpa sapi",
    price: 70000,
    priceLabel: "Ati Rp70.000 / Limpo Rp80.000",
    unit: "Per kg",
    weights: ["0.5kg", "1kg"],
    defaultWeight: "1kg",
    alt: "Ati sapi dan limpa sapi segar",
    summary:
      "Ati sapi dan limpa sapi untuk olahan bacem, sambal goreng, sate jeroan, dan menu warung yang membutuhkan bahan bersih.",
    uses: ["sambal goreng", "bacem", "sate jeroan", "warung makan"],
  },
  {
    id: "s5",
    slug: "babat-iso",
    category: "sapi",
    img: beefTripeImage,
    name: "Babat Iso",
    cut: "Babat dan iso sapi",
    price: 55000,
    unit: "Per kg",
    weights: ["0.5kg", "1kg"],
    defaultWeight: "1kg",
    alt: "Babat dan iso sapi bersih untuk soto dan gulai",
    summary:
      "Babat Iso disiapkan untuk soto, gulai, oseng, dan menu tradisional yang membutuhkan jeroan sapi bersih.",
    uses: ["soto", "gulai", "oseng", "warung makan"],
  },
  {
    id: "s6",
    slug: "jantung-ginjal",
    category: "sapi",
    img: beefHeartImage,
    name: "Jantung Ginjal",
    cut: "Jantung sapi dan ginjal sapi",
    price: 80000,
    unit: "Per kg",
    weights: ["0.5kg", "1kg"],
    defaultWeight: "1kg",
    alt: "Jantung dan ginjal sapi segar",
    summary:
      "Jantung Ginjal cocok untuk semur, oseng, sambal goreng, dan menu jeroan sapi yang memerlukan tekstur padat.",
    uses: ["semur", "oseng", "sambal goreng", "menu jeroan"],
  },
  {
    id: "s7",
    slug: "pipi-sandung-lamur",
    category: "sapi",
    img: beefBrisketImage,
    name: "Pipi + S. Lamur",
    cut: "Pipi sapi dan sandung lamur",
    price: 98000,
    unit: "Per kg",
    weights: ["0.5kg", "1kg", "2kg"],
    defaultWeight: "1kg",
    alt: "Pipi sapi dan sandung lamur segar",
    summary:
      "Pipi dan sandung lamur cocok untuk rawon, soto, semur, dan masakan berkuah yang membutuhkan rasa gurih.",
    uses: ["rawon", "soto", "semur", "kaldu", "dapur besar"],
  },
  {
    id: "s8",
    slug: "paru",
    category: "sapi",
    img: beefLungImage,
    name: "Paru",
    cut: "Paru sapi",
    price: 80000,
    unit: "Per kg",
    weights: ["0.5kg", "1kg"],
    defaultWeight: "1kg",
    alt: "Paru sapi segar untuk goreng dan balado",
    summary:
      "Paru sapi untuk paru goreng, balado, sambal goreng, dan menu warung yang membutuhkan bahan empuk setelah direbus.",
    uses: ["paru goreng", "balado", "sambal goreng", "warung makan"],
  },
  {
    id: "s9",
    slug: "tetelan",
    category: "sapi",
    img: beefBrisketImage,
    name: "Tetelan",
    cut: "Tetelan daging dan lemak sapi",
    price: 90000,
    unit: "Per kg",
    weights: ["0.5kg", "1kg", "2kg"],
    defaultWeight: "1kg",
    alt: "Tetelan sapi segar untuk sop dan rawon",
    summary:
      "Tetelan sapi berisi campuran daging dan lemak untuk sop, rawon, kuah bakso, dan masakan yang membutuhkan rasa kaldu kuat.",
    uses: ["sop", "rawon", "kuah bakso", "kaldu"],
  },
  {
    id: "s10",
    slug: "balung-igo",
    category: "sapi",
    img: beefRibImage,
    name: "Balung Igo",
    cut: "Tulang iga sapi",
    price: 85000,
    unit: "Per kg",
    weights: ["1kg", "2kg", "5kg"],
    defaultWeight: "1kg",
    alt: "Balung igo sapi untuk sop iga dan bakar",
    summary:
      "Balung Igo cocok untuk sop iga, iga bakar, kaldu, dan menu berkuah yang membutuhkan tulang dengan daging melekat.",
    uses: ["sop iga", "iga bakar", "kaldu", "restoran"],
  },
  {
    id: "s11",
    slug: "buntut",
    category: "sapi",
    img: beefOxtailImage,
    name: "Buntut",
    cut: "Buntut sapi",
    price: 85000,
    unit: "Per kg",
    weights: ["0.5kg", "1kg", "2kg"],
    defaultWeight: "1kg",
    alt: "Buntut sapi segar untuk sop buntut",
    summary:
      "Buntut sapi untuk sop buntut, kuah rempah, dan olahan slow cook yang membutuhkan tekstur empuk.",
    uses: ["sop buntut", "slow cook", "kuah rempah", "restoran"],
  },
  {
    id: "s12",
    slug: "balung-cengel",
    category: "sapi",
    img: beefBonesImage,
    name: "Balung Cengel",
    cut: "Tulang cengel sapi",
    price: 75000,
    unit: "Per kg",
    weights: ["1kg", "2kg", "5kg"],
    defaultWeight: "1kg",
    alt: "Balung cengel sapi untuk sop dan kaldu",
    summary:
      "Balung Cengel cocok untuk sop tulang, kaldu, kuah bakso, dan masakan berkuah yang membutuhkan rasa dasar kuat.",
    uses: ["sop tulang", "kaldu", "kuah bakso", "warung makan"],
  },
  {
    id: "s13",
    slug: "otak",
    category: "sapi",
    img: beefBrainImage,
    name: "Otak",
    cut: "Otak sapi",
    price: 65000,
    unit: "Per kg",
    weights: ["0.5kg", "1kg"],
    defaultWeight: "1kg",
    alt: "Otak sapi segar untuk olahan tradisional",
    summary:
      "Otak sapi untuk pepes, goreng telur, gulai, dan olahan tradisional dengan pemesanan sesuai stok harian.",
    uses: ["pepes", "gulai", "goreng telur", "masakan rumahan"],
  },
  {
    id: "s14",
    slug: "lidah",
    category: "sapi",
    img: beefTongueImage,
    name: "Lidah",
    cut: "Lidah sapi",
    price: 110000,
    unit: "Per kg",
    weights: ["0.5kg", "1kg", "2kg"],
    defaultWeight: "1kg",
    alt: "Lidah sapi segar untuk semur dan sate",
    summary:
      "Lidah sapi cocok untuk semur lidah, sate lidah, bistik, dan menu spesial yang membutuhkan potongan lembut.",
    uses: ["semur lidah", "sate lidah", "bistik", "restoran"],
  },
  {
    id: "s15",
    slug: "congor-mateng",
    category: "sapi",
    img: beefMuzzleImage,
    name: "Congor Mateng",
    cut: "Congor sapi matang",
    price: 75000,
    unit: "Per kg",
    weights: ["0.5kg", "1kg"],
    defaultWeight: "1kg",
    alt: "Congor sapi matang siap olah",
    summary:
      "Congor Mateng memudahkan dapur yang ingin mengolah oseng, sambal, dan menu siap masak dengan waktu persiapan lebih singkat.",
    uses: ["oseng", "sambal", "menu siap masak", "warung makan"],
  },
  {
    id: "s16",
    slug: "has-dalam",
    category: "sapi",
    img: beefBoardImage,
    name: "Has Dalam",
    cut: "Tenderloin sapi",
    price: 150000,
    unit: "Per kg",
    weights: ["0.5kg", "1kg", "2kg"],
    defaultWeight: "1kg",
    alt: "Has dalam sapi segar premium",
    summary:
      "Has Dalam adalah potongan sapi premium untuk steak, tumis cepat, bistik, dan menu yang membutuhkan serat halus.",
    uses: ["steak", "bistik", "tumis", "restoran"],
  },
  {
    id: "s17",
    slug: "kaki-mentah",
    category: "sapi",
    img: beefShankImage,
    name: "Kaki Mentah",
    cut: "Kaki sapi mentah",
    price: 35000,
    unit: "Per kg",
    weights: ["1kg", "2kg"],
    defaultWeight: "1kg",
    alt: "Kaki sapi mentah untuk kaldu dan kikil",
    summary:
      "Kaki Mentah digunakan untuk kaldu, kikil, sop kaki, dan olahan berkolagen yang membutuhkan perebusan lama.",
    uses: ["kaldu", "kikil", "sop kaki", "olahan kolagen"],
  },
  {
    id: "s18",
    slug: "congor-mentah",
    category: "sapi",
    img: beefMuzzleImage,
    name: "Congor Mentah",
    cut: "Congor sapi mentah",
    price: 60000,
    unit: "Per kg",
    weights: ["0.5kg", "1kg"],
    defaultWeight: "1kg",
    alt: "Congor sapi mentah untuk olahan tradisional",
    summary:
      "Congor Mentah cocok untuk pelanggan yang ingin merebus dan mengolah sendiri sesuai bumbu dapur.",
    uses: ["oseng", "sambal", "rebus", "masakan tradisional"],
  },
  {
    id: "s19",
    slug: "kepala-utuh",
    category: "sapi",
    img: beefHeadImage,
    name: "Kepala Utuh / kg",
    cut: "Kepala sapi utuh",
    price: 0,
    priceLabel: "Tidak dijual",
    available: false,
    unit: "Info stok",
    weights: ["1kg"],
    defaultWeight: "1kg",
    alt: "Kepala sapi utuh tidak dijual",
    summary:
      "Kepala Utuh dicantumkan sebagai informasi katalog. Untuk saat ini item ini tidak dijual melalui pemesanan website.",
    uses: ["informasi katalog", "konfirmasi stok"],
  },
  {
    id: "s20",
    slug: "sekengkel",
    category: "sapi",
    img: beefShankImage,
    name: "Sekengkel / biji",
    cut: "Sekengkel sapi per biji",
    price: 30000,
    unit: "Per biji",
    weights: ["1 biji", "2 biji", "5 biji"],
    defaultWeight: "1 biji",
    alt: "Sekengkel sapi per biji",
    summary:
      "Sekengkel sapi dijual per biji untuk kebutuhan sop, kaldu, dan olahan berkuah yang membutuhkan tulang berisi.",
    uses: ["sop", "kaldu", "kuah bakso", "warung makan"],
  },
  {
    id: "s21",
    slug: "balung-olo",
    category: "sapi",
    img: beefBonesImage,
    name: "Balung Olo / kg",
    cut: "Balung olo sapi",
    price: 30000,
    unit: "Per kg",
    weights: ["1kg", "2kg", "5kg"],
    defaultWeight: "1kg",
    alt: "Balung olo sapi untuk kaldu",
    summary:
      "Balung Olo cocok untuk kaldu, sop tulang, dan kebutuhan dapur yang memerlukan rasa dasar sapi.",
    uses: ["kaldu", "sop tulang", "kuah mie", "dapur besar"],
  },
  {
    id: "s22",
    slug: "gajih",
    category: "sapi",
    img: beefSuetImage,
    name: "Gajih",
    cut: "Lemak sapi",
    price: 30000,
    unit: "Per kg",
    weights: ["0.5kg", "1kg", "2kg"],
    defaultWeight: "1kg",
    alt: "Gajih atau lemak sapi segar",
    summary:
      "Gajih sapi untuk campuran bakso, tumisan, kaldu, dan masakan yang membutuhkan aroma lemak sapi.",
    uses: ["bakso", "kaldu", "tumisan", "campuran masakan"],
  },
  {
    id: "s23",
    slug: "urat",
    category: "sapi",
    img: beefTendonImage,
    name: "Urat",
    cut: "Urat sapi",
    price: 70000,
    unit: "Per kg",
    weights: ["0.5kg", "1kg", "2kg"],
    defaultWeight: "1kg",
    alt: "Urat sapi segar untuk bakso urat dan sop",
    summary:
      "Urat sapi cocok untuk bakso urat, sop, soto, dan olahan yang membutuhkan tekstur kenyal.",
    uses: ["bakso urat", "sop", "soto", "warung bakso"],
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
    slug: "paket-kurban",
    name: "Paket Kurban Sapi",
    body: "Terima rencana kurban sapi jauh hari. Tim membantu pemilihan potongan, pemotongan halal, pengemasan, dan distribusi sesuai kebutuhan.",
    highlights: ["kurban sapi", "idul adha", "potongan sapi", "distribusi"],
  },
  {
    id: "05",
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
    alt: "Proses pemotongan daging sapi",
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
      "Ya. Pelanggan bisa membeli daging sapi mulai dari 0.5 kg untuk beberapa produk, 1 kg, 2 kg, sampai 5 kg sesuai ketersediaan stok harian.",
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
    question: "Apakah tersedia layanan kurban sapi?",
    answer:
      "Ya. Lembu Lemu melayani kebutuhan kurban sapi mulai dari pemotongan halal, pengemasan, hingga distribusi sesuai kebutuhan pelanggan.",
  },
  {
    question: "Apakah bisa pesan jeroan sapi seperti babat, paru, lidah, dan urat?",
    answer:
      "Bisa, selama stok harian tersedia. Pelanggan dapat menanyakan babat iso, paru, lidah, ati, limpa, jantung, ginjal, gajih, urat, congor, kaki, dan bagian sapi lain melalui WhatsApp.",
  },
  {
    question: "Apakah harga di katalog sudah final?",
    answer:
      "Harga di katalog adalah harga awal per kg atau per biji sesuai produk. Total pesanan tetap dikonfirmasi ulang karena stok, berat aktual, jenis potongan, dan kebutuhan pengiriman dapat berubah.",
  },
  {
    question: "Apakah Lembu Lemu cocok untuk warung bakso, soto, rawon, dan katering?",
    answer:
      "Ya. Lembu Lemu melayani kebutuhan daging sapi, tetelan, tulang, urat, sandung lamur, dan jeroan untuk warung bakso, soto, rawon, katering, rumah makan, dan dapur produksi.",
  },
  {
    question: "Kapan waktu terbaik memesan daging sapi segar?",
    answer:
      "Waktu terbaik adalah satu hari sebelumnya atau pagi hari saat stok baru disiapkan. Untuk pesanan besar, katering, dan kurban sapi, sebaiknya konfirmasi jadwal lebih awal.",
  },
  {
    question: "Apakah pengiriman bisa ke luar Tlogomulyo?",
    answer:
      "Bisa dikonfirmasi sesuai jarak, jumlah pesanan, dan jadwal. Area utama tetap Balerejo, Tlogomulyo, dan Temanggung, dengan kemungkinan pengiriman ke wilayah sekitar sesuai kesepakatan.",
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
  "Mudal",
  "Tanjungsari",
  "Losari",
  "Legoksari",
  "Pagersari",
  "Candisari",
  "Tembarak",
  "Selopampang",
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
  "Gemawang",
  "Bejen",
  "Tretep",
  "Wonoboyo",
  "Bansari",
  "Kledung",
  "Magelang",
  "Wonosobo",
  "Secang",
  "Grabag",
  "Bandongan",
  "Mertoyudan",
  "Muntilan",
  "Ambarawa",
  "Salatiga",
  "Semarang",
  "Jogja",
];

const purchaseIntents = [
  "daging sapi segar",
  "supplier daging sapi",
  "jual daging sapi halal",
  "jual daging sapi segar",
  "harga daging sapi hari ini",
  "harga daging sapi per kg",
  "harga daging sapi Temanggung",
  "toko daging sapi terdekat",
  "penjual daging sapi terdekat",
  "agen daging sapi",
  "distributor daging sapi",
  "grosir daging sapi",
  "daging sapi kiloan",
  "daging sapi murah berkualitas",
  "daging sapi lokal",
  "daging sapi fresh",
  "daging sapi pagi hari",
  "pesan daging sapi online",
  "order daging sapi WhatsApp",
  "delivery daging sapi",
  "antar daging sapi",
  "daging sapi untuk hajatan",
  "daging sapi untuk syukuran",
  "daging sapi untuk acara keluarga",
  "daging sapi untuk rumah makan",
  "daging sapi untuk dapur produksi",
  "pemotongan sapi halal",
  "jagal sapi halal",
  "jasa potong sapi",
  "jasa pemotongan sapi",
  "jagal sapi Temanggung",
  "pemotongan daging sapi",
  "daging super sapi",
  "daging no 2 sapi",
  "daging no 3 sapi",
  "ati sapi",
  "limpo sapi",
  "babat iso sapi",
  "jantung sapi",
  "ginjal sapi",
  "pipi sapi",
  "sengkel sapi segar",
  "sandung lamur sapi",
  "paru sapi",
  "tetelan sapi",
  "balung igo sapi",
  "buntut sapi",
  "balung cengel sapi",
  "otak sapi",
  "lidah sapi",
  "congor sapi",
  "has dalam sapi",
  "kaki sapi mentah",
  "balung olo sapi",
  "gajih sapi",
  "urat sapi",
  "paket kurban sapi",
  "daging untuk katering",
  "daging untuk restoran",
  "daging untuk warung makan",
  "daging halal terdekat",
  "daging segar terdekat",
  "pesan daging via WhatsApp",
  "antar daging segar",
];

const productSynonyms = [
  "daging paha sapi",
  "daging sapi tanpa tulang",
  "daging sapi untuk rendang",
  "daging sapi untuk semur",
  "daging sapi untuk empal",
  "daging sapi untuk bakso",
  "daging sapi untuk steak",
  "tenderloin sapi",
  "has dalam sapi",
  "brisket sapi",
  "sandung lamur sapi",
  "sengkel sapi",
  "shank sapi",
  "tetelan sapi segar",
  "tulang sapi kaldu",
  "tulang iga sapi",
  "buntut sapi",
  "kaki sapi",
  "kikil sapi",
  "urat sapi bakso",
  "lemak sapi",
  "gajih sapi",
  "jeroan sapi",
  "babat sapi",
  "iso sapi",
  "paru sapi",
  "hati sapi",
  "limpa sapi",
  "jantung sapi",
  "ginjal sapi",
  "otak sapi",
  "lidah sapi",
  "congor sapi",
  "kepala sapi",
];

const cookingIntents = [
  "rendang",
  "empal",
  "semur",
  "rawon",
  "soto sapi",
  "sop iga",
  "bakso",
  "sop buntut",
  "gulai sapi",
  "brisket",
  "kaldu sapi",
  "oseng mercon",
  "tongseng",
  "daging slice",
  "daging fillet",
  "daging dadu",
  "boneless sapi",
  "karkas utuh",
  "sate sapi",
  "tumis daging",
  "oseng daging",
  "dendeng sapi",
  "geprek daging",
  "malbi sapi",
  "krengsengan sapi",
  "semur lidah",
  "sambal goreng ati",
  "sambal goreng jeroan",
  "paru goreng",
  "babat gongso",
  "soto babat",
  "soto daging",
  "sop tulang",
  "sop kaki",
  "kuah bakso",
  "kaldu tulang",
  "mie kocok",
  "bakso urat",
];

export const seoKeywords = Array.from(
  new Set([
    "Lembu Lemu",
    "Lembu Lemu Temanggung",
    "Lembu Lemu Tlogomulyo",
    "Lembu Lemu Balerejo",
    "lembulemu.com",
    "daging sapi segar Temanggung",
    "daging sapi segar Tlogomulyo",
    "daging sapi segar Balerejo",
    "jual daging sapi Temanggung",
    "jual daging sapi Tlogomulyo",
    "supplier daging sapi Temanggung",
    "supplier daging halal Jawa Tengah",
    "pemotongan daging halal Tlogomulyo",
    "jasa jagal sapi Temanggung",
    "paket kurban sapi Temanggung",
    "daging sapi untuk katering Temanggung",
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
      `${service.name} Balerejo`,
      ...service.highlights.map((highlight) => `${service.name} ${highlight}`),
    ]),
    ...purchaseIntents.flatMap((intent) => serviceAreas.map((area) => `${intent} ${area}`)),
    ...productSynonyms.flatMap((intent) => [
      `${intent} Temanggung`,
      `${intent} Tlogomulyo`,
      `${intent} Balerejo`,
      `${intent} halal`,
      `${intent} segar`,
      `harga ${intent}`,
    ]),
    ...cookingIntents.flatMap((intent) => [
      `daging untuk ${intent} Temanggung`,
      `potongan daging untuk ${intent}`,
      `supplier daging ${intent}`,
      `daging sapi untuk ${intent}`,
      `bagian sapi untuk ${intent}`,
      `pesan daging ${intent}`,
    ]),
  ]),
);

export const seoClusters = [
  {
    title: "Daging sapi segar Temanggung",
    body: "Halaman ini menjawab pencarian daging sapi segar Temanggung, supplier daging halal Tlogomulyo, jual daging sapi Balerejo, dan pesan daging sapi via WhatsApp untuk rumah tangga maupun bisnis kuliner.",
    terms: [
      "daging sapi segar",
      "supplier daging sapi",
      "daging Temanggung",
      "daging segar terdekat",
      "jual daging sapi Tlogomulyo",
      "daging sapi Balerejo",
    ],
  },
  {
    title: "Potong custom dan kurban sapi",
    body: "Lembu Lemu juga relevan untuk pencarian paket kurban sapi Temanggung, pemotongan sapi halal, potong dadu, fillet, slice, boneless, tulang, jeroan, dan potongan sesuai kebutuhan dapur.",
    terms: [
      "paket kurban sapi",
      "potong custom",
      "pemotongan sapi halal",
      "jeroan sapi",
      "jagal sapi Temanggung",
      "potong daging dadu",
    ],
  },
  {
    title: "Dapur bisnis, katering, warung, dan restoran",
    body: "Untuk pencarian daging katering Temanggung, stok daging restoran, daging untuk warung makan, sengkel sapi rawon, tulang sapi kaldu, dan sandung lamur soto, katalog ini memberi harga awal dan opsi berat yang bisa dikonfirmasi.",
    terms: [
      "daging katering",
      "stok restoran",
      "daging warung makan",
      "kaldu sapi",
      "supplier warung bakso",
      "stok rumah makan",
    ],
  },
  {
    title: "Jeroan dan bagian sapi lengkap",
    body: "Katalog mencakup ati, limpa, babat, iso, paru, jantung, ginjal, lidah, otak, congor, gajih, urat, kaki, balung, buntut, dan kepala sapi sebagai rujukan stok yang bisa ditanyakan langsung.",
    terms: [
      "babat iso sapi",
      "paru sapi",
      "lidah sapi",
      "urat sapi",
      "gajih sapi",
      "congor sapi",
    ],
  },
  {
    title: "Menu populer harian",
    body: "Untuk kebutuhan rendang, rawon, soto, sop iga, sop buntut, bakso urat, semur lidah, paru goreng, babat gongso, dan kaldu tulang, pelanggan bisa memilih potongan yang sesuai sebelum konfirmasi stok.",
    terms: [
      "daging rendang",
      "sandung lamur rawon",
      "tulang sapi kaldu",
      "bakso urat",
      "sop buntut",
      "soto babat",
    ],
  },
  {
    title: "Area sekitar Temanggung",
    body: "Lembu Lemu berpusat di Balerejo, Tlogomulyo, dan melayani konfirmasi pesanan untuk wilayah Temanggung, Kedu, Parakan, Ngadirejo, Kranggan, Pringsurat, Secang, Magelang, Wonosobo, dan area sekitar.",
    terms: [
      "daging sapi Tlogomulyo",
      "daging sapi Kedu",
      "daging sapi Parakan",
      "daging sapi Secang",
      "daging sapi Magelang",
      "daging sapi Wonosobo",
    ],
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

export function areaSlug(area: string) {
  return area
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function areaPath(area: string) {
  return `/area/${areaSlug(area)}`;
}
