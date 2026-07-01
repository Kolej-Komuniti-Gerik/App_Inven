import React from 'react';
import { 
  Layout, 
  Box, 
  Settings, 
  Layers, 
  Smartphone, 
  Image as ImageIcon,
  Code,
  MousePointer2,
  CheckSquare,
  Loader2,
  Calendar,
  List,
  MessageSquare,
  Lock,
  Sliders,
  ChevronDown,
  ToggleRight,
  Clock,
  Globe,
  SquarePen,
  Type,
  ChevronsRight,
  TriangleAlert,
  Square
} from 'lucide-react';
import { InterfacePart, BlockInfo, PaletteComponent } from './types';

export const INTERFACE_PARTS: InterfacePart[] = [
  {
    id: 'palette',
    name: 'Palette',
    description: 'Koleksi komponen yang boleh ditarik ke dalam aplikasi anda.',
    icon: 'Layout'
  },
  {
    id: 'viewer',
    name: 'Viewer',
    description: 'Paparan visual rupa aplikasi anda.',
    icon: 'Smartphone'
  },
  {
    id: 'components',
    name: 'Components',
    description: 'Senarai komponen yang sedang digunakan.',
    icon: 'Layers'
  },
  {
    id: 'properties',
    name: 'Properties',
    description: 'Tetapan terperinci bagi setiap komponen.',
    icon: 'Settings'
  }
];

export const UI_COMPONENTS: PaletteComponent[] = [
  { 
    name: 'Button', 
    description: 'Komponen yang mempunyai keupayaan untuk mengesan klik pengguna.', 
    usage: 'Digunakan untuk mencetuskan aksi program melalui event "When Button.Click".' 
  },
  { 
    name: 'CheckBox', 
    description: 'Komponen yang menukar keadaan daripada ditanda (checked) kepada tidak ditanda.', 
    usage: 'Sesuai untuk pilihan dwi-keadaan (boolean) seperti menetapkan pilihan pengguna.' 
  },
  { 
    name: 'CircularProgress', 
    description: 'Penunjuk kemajuan berbentuk bulat yang menunjukkan proses sedang berjalan secara berterusan.', 
    usage: 'Gunakan apabila anda tidak tahu berapa lama masa yang diperlukan untuk menyelesaikan sesuatu proses.' 
  },
  { 
    name: 'DatePicker', 
    description: 'Butang yang memaparkan dialog kalendar untuk membolehkan pengguna memilih tarikh.', 
    usage: 'Digunakan untuk mendapatkan input tarikh yang tepat (hari, bulan, tahun) daripada pengguna.' 
  },
  { 
    name: 'Image', 
    description: 'Komponen untuk memaparkan gambar pada antaramuka aplikasi.', 
    usage: 'Boleh ditetapkan melalui Designer atau Blocks dengan menggunakan fail media yang dimuat naik.' 
  },
  { 
    name: 'Label', 
    description: 'Digunakan untuk memaparkan teks statik atau dinamik yang biasanya tidak boleh diubah oleh pengguna.', 
    usage: 'Gunakan untuk tajuk, arahan, atau memaparkan hasil pengiraan daripada Blocks.' 
  },
  { 
    name: 'LinearProgress', 
    description: 'Bar kemajuan mendatar yang boleh menunjukkan nilai spesifik (0 hingga 100) atau mod berulang.', 
    usage: 'Sesuai untuk menunjukkan status muat turun atau peratusan tugasan yang telah disiapkan.' 
  },
  { 
    name: 'ListPicker', 
    description: 'Butang yang apabila diklik akan memaparkan senarai item untuk dipilih oleh pengguna.', 
    usage: 'Menyediakan cara mudah untuk memilih satu item daripada senarai yang panjang tanpa memakan ruang skrin.' 
  },
  { 
    name: 'ListView', 
    description: 'Komponen yang memaparkan senarai item secara terus pada skrin Viewer.', 
    usage: 'Digunakan untuk memaparkan koleksi data seperti senarai kenalan atau mesej.' 
  },
  { 
    name: 'Notifier', 
    description: 'Komponen "non-visible" yang membolehkan aplikasi memaparkan mesej amaran, dialog input, atau pop-up.', 
    usage: 'Digunakan untuk memberi maklum balas penting atau meminta pengesahan daripada pengguna.' 
  },
  { 
    name: 'PasswordTextBox', 
    description: 'Sama seperti TextBox biasa tetapi aksara yang ditaip akan disembunyikan menggunakan simbol.', 
    usage: 'Wajib digunakan untuk sebarang input maklumat sensitif seperti kata laluan atau kod PIN.' 
  },
  { 
    name: 'Slider', 
    description: 'Bar gelongsor mendatar yang membolehkan pengguna memilih nilai dengan menggerakkan penunjuk (thumb).', 
    usage: 'Gunakan untuk input nilai dalam julat tertentu seperti tahap kelantangan bunyi atau kecerahan skrin.' 
  },
  { 
    name: 'Spinner', 
    description: 'Komponen yang memaparkan menu lungsur (dropdown) apabila diklik untuk memilih satu item.', 
    usage: 'Mirip ListPicker tetapi lebih menjimatkan ruang dan biasa digunakan dalam borang input.' 
  },
  { 
    name: 'Switch', 
    description: 'Suis yang mempunyai dua keadaan iaitu "ON" atau "OFF".', 
    usage: 'Digunakan untuk tetapan yang memerlukan pertukaran status dengan pantas secara visual.' 
  },
  { 
    name: 'TextBox', 
    description: 'Ruang untuk pengguna memasukkan teks secara manual. Boleh ditetapkan untuk mod nombor sahaja atau pelbagai baris.', 
    usage: 'Gunakan untuk input nama, komen, atau sebarang maklumat teks daripada pengguna.' 
  },
  { 
    name: 'TimePicker', 
    description: 'Butang yang memaparkan dialog jam untuk memilih masa tertentu.', 
    usage: 'Sesuai untuk aplikasi penggera (alarm), jadual waktu, atau penetapan janji temu.' 
  },
  { 
    name: 'WebViewer', 
    description: 'Komponen yang bertindak sebagai pelayar web mini di dalam aplikasi anda.', 
    usage: 'Digunakan untuk memaparkan kandungan HTML luaran atau laman web terus pada skrin aplikasi.' 
  }
];

export const BLOCK_CATEGORIES: BlockInfo[] = [
  {
    id: 'control',
    name: 'Kawalan (Control)',
    category: 'Built-in',
    description: 'Blok untuk mengawal aliran program (flow), gelung (loops), dan navigasi antara skrin aplikasi.',
    color: 'bg-amber-500',
    example: 'if [condition] then [do]',
    subBlocks: [
      {
        name: 'if then',
        description: 'Menguji satu keadaan. Jika keadaan adalah BENAR (true), maka blok di dalam "then" akan dijalankan.',
        example: 'if (Score > 10) then (Set LabelWinner.Text to "Anda Menang!")'
      },
      {
        name: 'if then else',
        description: 'Menguji satu keadaan. Jika BENAR, jalankan aksi di bawah "then". Jika PALSU (false), jalankan aksi di bawah "else".',
        example: 'if (UserText = "1234") then (Open Screen "Home") else (Set LabelRalat.Text to "Kata Laluan Salah")'
      },
      {
        name: 'for each number from to by do',
        description: 'Gelung berulang (loop). Memulakan kaunter pembolehubah dari nilai mula hingga nilai akhir mengikut langkah gandaan yang ditetapkan.',
        example: 'for each number from 1 to 5 by 1 do (Kira Sifir)'
      },
      {
        name: 'for each item in list do',
        description: 'Mengulangi aksi bagi setiap item yang tersimpan di dalam senarai (list) yang diberikan.',
        example: 'for each item in (Senarai_Nama) do (Hantar SMS kepada item)'
      },
      {
        name: 'while test do',
        description: 'Mengulangi aksi di dalam "do" secara berterusan selagi syarat/kondisi di "test" adalah BENAR.',
        example: 'while (Nyawa_Pemain > 0) do (Tunjukkan Animasi Gerak)'
      },
      {
        name: 'open another screen',
        description: 'Membuka skrin aplikasi baharu yang ditetapkan mengikut nama skrin.',
        example: 'open another screen screenName: "MenuScreen"'
      },
      {
        name: 'open another screen with start value',
        description: 'Membuka skrin baharu sambil menghantar satu nilai permulaan (data) ke skrin tersebut.',
        example: 'open another screen screenName: "MainGame" startValue: "Tahap_Sukar"'
      },
      {
        name: 'get start value',
        description: 'Mengambil nilai permulaan yang dihantar dari skrin sebelumnya ketika skrin ini dibuka.',
        example: 'set global Mod_Permainan to get start value'
      },
      {
        name: 'close screen',
        description: 'Menutup skrin semasa dan membawa pengguna kembali ke skrin sebelumnya.',
        example: 'when Button_Kembali.Click do (close screen)'
      },
      {
        name: 'close screen with value',
        description: 'Menutup skrin semasa dan menghantar semula satu nilai keputusan kembali ke skrin yang membukanya.',
        example: 'close screen with value result: "Data_Disimpan"'
      },
      {
        name: 'close application',
        description: 'Menamatkan program dan menutup aplikasi sepenuhnya dari telefon.',
        example: 'when Button_Keluar.Click do (close application)'
      }
    ]
  },
  {
    id: 'logic',
    name: 'Logik (Logic)',
    category: 'Built-in',
    description: 'Blok untuk perbandingan logik (sama dengan, tidak sama dengan) dan operasi logik (and, or, not).',
    color: 'bg-emerald-500',
    example: '[value1] = [value2]',
    subBlocks: [
      {
        name: 'true',
        description: 'Mengembalikan nilai logik BENAR (keadaan sedia ada atau diaktifkan).',
        example: 'set Switch_Bunyi.On to true'
      },
      {
        name: 'false',
        description: 'Mengembalikan nilai logik PALSU (keadaan tidak aktif atau dimatikan).',
        example: 'set Button_Hantar.Enabled to false'
      },
      {
        name: 'not',
        description: 'Menyongsangkan nilai logik. BENAR menjadi PALSU, dan PALSU menjadi BENAR.',
        example: 'not (is empty TextBox_Nama.Text)'
      },
      {
        name: '=',
        description: 'Membandingkan sama ada dua nilai atau objek adalah sama.',
        example: 'TextBox_Input.Text = "Cikgu"'
      },
      {
        name: 'not = (≠)',
        description: 'Membandingkan sama ada dua nilai atau objek adalah tidak sama.',
        example: 'global Gred_Pelajar ≠ "E"'
      },
      {
        name: 'and',
        description: 'Menggabungkan dua syarat. Mengembalikan BENAR hanya jika KEDUA-DUA syarat adalah benar.',
        example: '(Skor > 50) and (Masa < 10)'
      },
      {
        name: 'or',
        description: 'Menggabungkan dua syarat. Mengembalikan BENAR jika SALAH SATU syarat adalah benar.',
        example: '(Sambungan_Wifi = true) or (Sambungan_Data = true)'
      }
    ]
  },
  {
    id: 'math',
    name: 'Matematik (Math)',
    category: 'Built-in',
    description: 'Blok untuk pengiraan matematik seperti tambah, tolak, darab, bahagi, nombor rawak, dan pembundaran.',
    color: 'bg-blue-600',
    example: '1 + 1',
    subBlocks: [
      {
        name: 'number (0)',
        description: 'Kotak angka untuk memasukkan nilai nombor bulat, negatif, atau perpuluhan secara langsung.',
        example: 'set global Skor_Terkumpul to 100'
      },
      {
        name: 'comparison (=, ≠, <, ≤, >, ≥)',
        description: 'Membandingkan hubungan antara dua nombor. Mengembalikan nilai logik true atau false.',
        example: 'global Nyawa_Pemain <= 0'
      },
      {
        name: 'basic operators (+, -, *, /)',
        description: 'Melakukan operasi asas matematik iaitu tambah, tolak, darab, atau bahagi antara dua nombor.',
        example: 'global Skor + 10'
      },
      {
        name: 'random integer from to',
        description: 'Menjana satu nombor bulat secara rawak dalam julat [mula] dan [tamat] yang ditetapkan (sangat berguna untuk game!).',
        example: 'random integer from 1 to 6 (balingan dadu rawak)'
      },
      {
        name: 'random fraction',
        description: 'Menjana satu nombor perpuluhan rawak antara 0.0 hingga 1.0.',
        example: 'random fraction'
      },
      {
        name: 'round',
        description: 'Membundarkan nombor perpuluhan kepada nombor bulat yang paling hampir.',
        example: 'round (4.7) -> 5'
      },
      {
        name: 'min',
        description: 'Mengambil dan mengembalikan nilai yang paling kecil daripada sekumpulan nombor yang diberikan.',
        example: 'min (Skor1, Skor2, Skor3)'
      },
      {
        name: 'max',
        description: 'Mengambil dan mengembalikan nilai yang paling besar daripada sekumpulan nombor yang diberikan.',
        example: 'max (Skor1, Skor2, Skor3)'
      },
      {
        name: 'square root',
        description: 'Mengira punca kuasa dua bagi sesuatu nombor.',
        example: 'square root (16) -> 4'
      }
    ]
  },
  {
    id: 'text',
    name: 'Teks (Text)',
    category: 'Built-in',
    description: 'Blok untuk memanipulasi teks, menyambung perkataan, mengira panjang aksara, dan menukar format huruf.',
    color: 'bg-pink-600',
    example: 'join "Hello" "World"',
    subBlocks: [
      {
        name: 'string ("")',
        description: 'Kotak teks kosong untuk menulis perkataan, huruf, ayat, atau simbol secara terus.',
        example: 'set Label_Status.Text to "Sila cuba lagi."'
      },
      {
        name: 'join',
        description: 'Menggabungkan beberapa teks, nombor, atau nilai pembolehubah menjadi satu ayat yang lengkap.',
        example: 'join "Selamat Datang, " (TextBox_Nama.Text) "!"'
      },
      {
        name: 'length',
        description: 'Mengira dan mengembalikan jumlah bilangan aksara (termasuk huruf, nombor, tanda baca, dan ruang kosong) dalam teks.',
        example: 'length (TextBox_KataLaluan.Text)'
      },
      {
        name: 'is empty',
        description: 'Memeriksa sama ada kotak teks itu kosong (tiada sebarang aksara). Mengembalikan true jika kosong.',
        example: 'is empty (TextBox_Email.Text)'
      },
      {
        name: 'compare texts',
        description: 'Membandingkan susunan abjad (alfabetikal) antara dua teks.',
        example: 'compare texts (Teks_A, Teks_B)'
      },
      {
        name: 'trim',
        description: 'Membuang semua ruang kosong (whitespace) di permulaan dan penghujung sesuatu teks.',
        example: 'trim (TextBox_Input.Text)'
      },
      {
        name: 'upcase',
        description: 'Menukarkan semua huruf dalam teks kepada format huruf besar (capital letters).',
        example: 'upcase ("malaysia") -> "MALAYSIA"'
      },
      {
        name: 'downcase',
        description: 'Menukarkan semua huruf dalam teks kepada format huruf kecil semuanya.',
        example: 'downcase ("KEDAH") -> "kedah"'
      },
      {
        name: 'starts at',
        description: 'Mencari indeks kedudukan mula bagi satu perkataan/aksara di dalam teks yang lebih besar (mengembalikan 0 jika tiada).',
        example: 'starts at "App" in "MIT App Inventor" -> 5'
      },
      {
        name: 'contains',
        description: 'Menyemak sama ada teks mengandungi sesuatu perkataan atau aksara yang dicari (mengembalikan true atau false).',
        example: 'contains text: (TextBox_Sms.Text) piece: "Menang" -> true'
      },
      {
        name: 'split',
        description: 'Memotong satu teks panjang kepada senarai (list) beberapa item berdasarkan pemisah tertentu.',
        example: 'split "Epal,Pisang,Oren" at "," -> ["Epal", "Pisang", "Oren"]'
      }
    ]
  },
  {
    id: 'lists',
    name: 'Senarai (Lists)',
    category: 'Built-in',
    description: 'Blok untuk menyimpan, menyusun, dan menguruskan senarai data (array) secara dinamik.',
    color: 'bg-sky-500',
    example: 'add items to list',
    subBlocks: [
      {
        name: 'create empty list',
        description: 'Membina satu senarai kosong baharu yang sedia untuk diisi dengan data.',
        example: 'set global Senarai_Hadir to create empty list'
      },
      {
        name: 'make a list',
        description: 'Membina senarai baharu dengan memasukkan beberapa item permulaan secara manual.',
        example: 'make a list ("Ahad", "Isnin", "Selasa")'
      },
      {
        name: 'add items to list',
        description: 'Menambah satu atau beberapa item baharu di penghujung senarai yang sedia ada.',
        example: 'add items to list (Senarai_Buah) item: "Mangga"'
      },
      {
        name: 'is in list',
        description: 'Menyemak sama ada sesuatu nilai atau item wujud di dalam senarai yang diberikan (mengembalikan true/false).',
        example: 'is in list? thing: "Ali" list: (global Senarai_Pelajar)'
      },
      {
        name: 'length of list',
        description: 'Mengira dan mengembalikan jumlah keseluruhan bilangan item yang tersimpan di dalam senarai.',
        example: 'length of list (Senarai_Hari) -> 7'
      },
      {
        name: 'select list item',
        description: 'Mengambil satu item daripada senarai pada kedudukan indeks tertentu (Penting: Indeks bermula dari 1!).',
        example: 'select list item list: (Senarai_Hari) index: 1 -> "Ahad"'
      },
      {
        name: 'replace list item',
        description: 'Menggantikan item sedia ada pada kedudukan indeks tertentu dengan nilai yang baharu.',
        example: 'replace list item list: (Senarai_Skor) index: 2 replacement: 95'
      },
      {
        name: 'remove list item',
        description: 'Memadam terus item pada kedudukan indeks tertentu daripada senarai.',
        example: 'remove list item list: (Senarai_Kerja) index: 3'
      }
    ]
  },
  {
    id: 'dictionary',
    name: 'Kamus (Dictionaries)',
    category: 'Built-in',
    description: 'Blok untuk menyimpan data berstruktur dalam bentuk pasangan Kunci (Key) dan Nilai (Value).',
    color: 'bg-indigo-600',
    example: 'create empty dictionary',
    subBlocks: [
      {
        name: 'create empty dictionary',
        description: 'Membina satu kamus kosong baharu untuk menyimpan pasangan kunci-nilai.',
        example: 'set global Profil_Pengguna to create empty dictionary'
      },
      {
        name: 'make a dictionary',
        description: 'Membina kamus baharu dengan beberapa pasangan kunci-nilai (key-value) sedia ada.',
        example: 'make a dictionary (key: "Nama" value: "Siti", key: "Gred" value: "A")'
      },
      {
        name: 'get value for key',
        description: 'Mengambil nilai daripada kamus berdasarkan nama kunci yang diberikan. Boleh dipadankan dengan nilai lalai (default) jika kunci tiada.',
        example: 'get value for key "Nama" in (global Profil_Pengguna) notFound: "Tiada Nama"'
      },
      {
        name: 'set value for key',
        description: 'Menambah kunci baharu atau mengemas kini nilai kunci yang sedia ada di dalam kamus.',
        example: 'set value for key "Umur" in (global Profil_Pengguna) to 17'
      },
      {
        name: 'remove db key',
        description: 'Membuang sesuatu kunci berserta nilainya daripada kamus secara kekal.',
        example: 'remove db key "Gred" from (global Profil_Pengguna)'
      },
      {
        name: 'is key in dictionary',
        description: 'Menyemak sama ada sesuatu kunci wujud di dalam kamus (mengembalikan true/false).',
        example: 'is key "Nama" in dictionary (global Profil_Pengguna) -> true'
      }
    ]
  },
  {
    id: 'colors',
    name: 'Warna (Colors)',
    category: 'Built-in',
    description: 'Blok untuk menentukan warna komponen seperti warna latar belakang skrin, warna butang, atau warna teks.',
    color: 'bg-slate-500',
    example: 'make color with list',
    subBlocks: [
      {
        name: 'color box',
        description: 'Kotak warna visual sedia ada (Merah, Biru, Hijau, Kuning, dll) untuk diwarnakan terus pada komponen.',
        example: 'set Button_Main.BackgroundColor to [Red Box]'
      },
      {
        name: 'make color',
        description: 'Mencipta warna tersendiri (custom) menggunakan senarai 3 atau 4 nombor berasaskan kod format RGB (Red, Green, Blue, Alpha).',
        example: 'make color with list (255, 165, 0) (Warna Jingga / Orange)'
      },
      {
        name: 'split color',
        description: 'Memecahkan kod warna sesuatu komponen kepada komponen RGB asasnya dalam satu senarai.',
        example: 'split color (Button_Main.BackgroundColor) -> [255, 165, 0, 255]'
      }
    ]
  },
  {
    id: 'variables',
    name: 'Pembolehubah (Variables)',
    category: 'Built-in',
    description: 'Blok untuk menyimpan nilai, data, atau status sementara dalam memori aplikasi dengan menggunakan nama tertentu.',
    color: 'bg-orange-600',
    example: 'initialize global name to ""',
    subBlocks: [
      {
        name: 'initialize global to',
        description: 'Mewujudkan pembolehubah global yang boleh dibaca dan diubah suai dari mana-mana bahagian skrin semasa.',
        example: 'initialize global Skor_Pemain to 0'
      },
      {
        name: 'get',
        description: 'Mengambil nilai terkini yang sedang disimpan di dalam sesuatu pembolehubah.',
        example: 'get global Skor_Pemain'
      },
      {
        name: 'set to',
        description: 'Mengemas kini atau menukarkan nilai lama di dalam pembolehubah kepada satu nilai yang baharu.',
        example: 'set global Skor_Pemain to (get global Skor_Pemain + 10)'
      },
      {
        name: 'initialize local to in do',
        description: 'Mewujudkan pembolehubah lokal yang hanya boleh diakses di dalam lingkungan skop blok berkenaan sahaja.',
        example: 'initialize local temp to (get global Skor) in (set Label_Skor.Text to temp)'
      }
    ]
  },
  {
    id: 'procedures',
    name: 'Prosedur (Procedures)',
    category: 'Built-in',
    description: 'Blok untuk membina fungsi (sub-rutin) tersendiri bagi menghimpunkan siri arahan agar boleh diguna semula dengan mudah.',
    color: 'bg-purple-600',
    example: 'to procedure do',
    subBlocks: [
      {
        name: 'to procedure do',
        description: 'Mendefinisikan satu fungsi arahan tanpa pulangan nilai. Sesuai untuk merumuskan langkah pembersihan atau kemas kini rupa aplikasi.',
        example: 'to Set_Semula_Borang do (set TextBox_Nama.Text to "", set CheckBox_Setuju.Checked to false)'
      },
      {
        name: 'to procedure result',
        description: 'Mendefinisikan satu fungsi yang mengira sesuatu kerja dan memulangkan (return) nilai keputusan akhir.',
        example: 'to Kira_Cukai (gaji) result (gaji * 0.05)'
      },
      {
        name: 'call procedure',
        description: 'Menjalankan siri arahan yang tersimpan di dalam fungsi/prosedur yang telah ditakrifkan.',
        example: 'call Set_Semula_Borang'
      }
    ]
  }
];

export const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'Layout': return <Layout size={20} />;
    case 'Smartphone': return <Smartphone size={20} />;
    case 'Layers': return <Layers size={20} />;
    case 'Settings': return <Settings size={20} />;
    default: return <Box size={20} />;
  }
};

export const getComponentIcon = (name: string, isWhite: boolean = false) => {
  const size = 16;
  const colorClass = isWhite ? "text-white" : "text-slate-500";
  
  switch (name) {
    case 'Button': return <MousePointer2 size={size} className={colorClass} />;
    case 'CheckBox': return <CheckSquare size={size} className={colorClass} />;
    case 'CircularProgress': return <Loader2 size={size} className={`${colorClass} animate-spin`} />;
    case 'DatePicker': return <Calendar size={size} className={colorClass} />;
    case 'Image': return <ImageIcon size={size} className={colorClass} />;
    case 'Label': return (
      <div className={`w-4 h-4 flex items-center justify-center border border-slate-400 text-[10px] font-bold ${colorClass}`}>
        A
      </div>
    );
    case 'LinearProgress': return <ChevronsRight size={size} className={colorClass} />;
    case 'ListPicker': return <List size={size} className={colorClass} />;
    case 'ListView': return <List size={size} className={colorClass} />;
    case 'Notifier': return <TriangleAlert size={size} className="text-yellow-600 fill-yellow-100" />;
    case 'PasswordTextBox': return <Lock size={size} className={colorClass} />;
    case 'Slider': return <Sliders size={size} className={colorClass} />;
    case 'Spinner': return <ChevronDown size={size} className={colorClass} />;
    case 'Switch': return <ToggleRight size={size} className={colorClass} />;
    case 'TextBox': return <SquarePen size={size} className={colorClass} />;
    case 'TimePicker': return <Clock size={size} className={colorClass} />;
    case 'WebViewer': return <Globe size={size} className={colorClass} />;
    case 'Screen': return <div className="w-4 h-4 bg-green-200 border border-green-600 rounded-sm" />;
    case 'Arrangement': return <div className="w-4 h-4 border-2 border-slate-400 flex items-center justify-center"><div className="w-1 h-1 bg-slate-400" /></div>;
    default: return <Box size={size} className={colorClass} />;
  }
};
