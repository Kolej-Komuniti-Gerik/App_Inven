export const askTutor = async (question: string): Promise<string> => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Ralat pelayan: ${response.status}`);
    }

    const data = await response.json();
    return data.text || 'Tiada jawapan diterima daripada Cikgu AI.';
  } catch (error: any) {
    console.warn('Backend server API unavailable. Activating local client-side fallback tutor.', error);
    return getLocalClientFallback(question);
  }
};

// Local rule-based offline smart tutor to ensure the app works fully on Vercel or offline
function getLocalClientFallback(query: string): string {
  const text = query.toLowerCase();
  
  const statusHeader = `> 💡 **Nota Hos / Vercel (Mod Pintar Tempatan Aktif)**
> Anda melihat mesej ini kerana aplikasi telah dideploy ke **Vercel** atau pelayan backend tidak diaktifkan. 
> Vercel adalah platform statik/serverless dan secara lalai tidak menyokong pelayan Node.js/Express berterusan (\`server.ts\` kami). 
> 
> **Saranan Deploy Penuh:** Untuk mengaktifkan ciri AI dinamik sepenuhnya dengan pangkalan data & API, sila deploy kod ini ke platform seperti **Render**, **Railway**, atau **Koyeb** yang menyokong pelayan Node.js yang sentiasa aktif.
> 
> *Jangan risau! Cikgu AI versi Pintar Tempatan sedia membantu anda di bawah ini:*
\n\n`;

  if (text.includes('hi') || text.includes('hello') || text.includes('hai') || text.includes('assalamualaikum') || text.includes('mula') || text.includes('siapa')) {
    return statusHeader + `### 👋 Hai! Saya Cikgu AI Pembantu Pintar Tempatan Anda!

Saya sedia membantu anda mempelajari komponen **Designer** dan logik pengaturcaraan **Blocks** dalam MIT App Inventor menggunakan Bahasa Melayu yang ringkas dan mesra.

**Anda boleh bertanya soalan seperti:**
* "Apa itu Button?"
* "Bagaimana mahu paparkan teks?" (Label)
* "Bagaimana cara buat game lukisan?" (Canvas)
* "Apa fungsi Blocks?"
* "Bagaimana menunjukkan mesej amaran?" (Notifier)
* "Cerita pasal list" (Senarai)

Sila taip sebarang komponen di atas untuk bermula!`;
  }

  if (text.includes('list') || text.includes('senarai') || text.includes('cerita sal list')) {
    return statusHeader + `### 📋 Pengenalan kepada Blocks: List (Senarai)

Dalam MIT App Inventor, **List** digunakan untuk menyimpan banyak maklumat atau data dalam satu tempat tunggal (seperti senarai nama pelajar, senarai skor tinggi, atau senarai tugasan).

#### 🧩 Di Bahagian Blocks (Logik List):
Anda boleh mencari blok ini dalam kategori **Lists** berwarna biru terang:

1. **\`create empty list\`**
   - Membina satu senarai kosong baharu. Sesuai digunakan semasa mula-mula mencipta pembolehubah (variable).

2. **\`make a list\`**
   - Membolehkan anda menambah item awal ke dalam senarai. Anda boleh menambah slot item dengan mengetik butang gear (mutator) biru pada blok tersebut.

3. **\`add items to list\`**
   - Menambah item baru ke dalam senarai yang sedia ada semasa aplikasi sedang berjalan.
   - *Contoh:* Menambah nama pelajar baru ke dalam senarai apabila butang ditekan.

4. **\`select list item\`**
   - Mengambil satu item spesifik daripada senarai berdasarkan nombor kedudukannya (Index).
   - *Nota Penting:* Dalam App Inventor, kedudukan senarai bermula dari nombor **1** (bukan 0 seperti bahasa pengaturcaraan lain!).

5. **\`length of list\`**
   - Mengira jumlah keseluruhan item yang ada di dalam senarai tersebut.

#### 💡 Contoh Analogi Mudah:
Bayangkan senarai ini seperti senarai barang dapur yang ditulis di atas kertas. Setiap kali anda mahu membeli barang baru, anda gunakan **add item**. Apabila anda mahu mengambil barang nombor 3 dalam senarai, anda gunakan **select list item** dengan index **3**!`;
  }

  if (text.includes('button') || text.includes('butang') || text.includes('klik') || text.includes('tekan')) {
    return statusHeader + `### 🔘 Komponen: Button (Butang)

**Butang** adalah komponen interaktif paling utama yang membolehkan pengguna memulakan tindakan (aksi) dengan mengetik skrin.

#### 🎨 Di Bahagian Designer (Antaramuka):
1. Cari **Button** dalam tab **User Interface** di sebelah kiri.
2. Seret dan letakkan di dalam skrin telefon (Viewer).
3. Di panel **Properties** sebelah kanan, anda boleh menukar:
   - **Text**: Perkataan pada butang (cth: "Tekan Saya!").
   - **BackgroundColor**: Warna latar butang.
   - **FontSize** & **FontBold**: Saiz dan ketebalan tulisan.

#### 🧩 Di Bahagian Blocks (Logik):
Untuk membuat butang melakukan sesuatu apabila diklik, gunakan blok acara (event handler) berikut:
- \`when Button1.Click do\`
  *(Semua blok arahan yang diletakkan di dalam lubang ini akan dilaksanakan apabila butang ditekan!)*`;
  }

  if (text.includes('label') || text.includes('teks') || text.includes('tulisan') || text.includes('paparan')) {
    return statusHeader + `### 📝 Komponen: Label (Paparan Teks)

**Label** digunakan khusus untuk memaparkan teks statik atau dinamik pada skrin aplikasi yang tidak boleh ditaip atau diubah secara langsung oleh pengguna.

#### 🎨 Di Bahagian Designer (Antaramuka):
1. Seret **Label** dari **User Interface** ke skrin **Viewer**.
2. Gunakan sifat **Text** untuk menulis mesej asal atau tajuk halaman.

#### 🧩 Di Bahagian Blocks (Logik):
Anda boleh menukar isi teks Label semasa aplikasi sedang berjalan dengan menggunakan blok:
- \`set Label1.Text to\` [ "Selamat Datang!" ]`;
  }

  if (text.includes('canvas') || text.includes('kanvas') || text.includes('lukis') || text.includes('game') || text.includes('permainan') || text.includes('gambar') || text.includes('image')) {
    return statusHeader + `### 🎨 Komponen: Canvas (Kanvas) & Grafik

Sekiranya anda ingin membina permainan (seperti Flappy Bird, Pong) atau aplikasi melukis, anda memerlukan komponen **Canvas**!

#### 🎨 Di Bahagian Designer:
- Cari **Canvas** di bawah kategori **Drawing and Animation**.
- Sifat penting:
  - **Width** & **Height**: Tetapkan kepada *Fill Parent* supaya memenuhi skrin.
  - **BackgroundImage**: Tambah gambar latar belakang.

#### 🧩 Di Bahagian Blocks (Logik):
- \`when Canvas1.Dragged do\`: Mengesan apabila pengguna menyentuh dan menyeret jari pada kanvas.
- \`call Canvas1.DrawLine\`: Blok untuk melukis garisan dari titik mula (x1, y1) ke titik tamat (x2, y2).`;
  }

  if (text.includes('notifier') || text.includes('notifikasi') || text.includes('amaran') || text.includes('popup') || text.includes('mesej')) {
    return statusHeader + `### 🔔 Komponen: Notifier (Mesej Amaran)

**Notifier** adalah komponen tidak kelihatan (non-visible component) yang berfungsi menunjukkan mesej penting atau amaran secara tiba-tiba (pop-up) di tengah skrin.

#### 🎨 Di Bahagian Designer:
- Seret **Notifier** ke skrin. Ia tidak akan kelihatan di dalam skrin tetapi akan tersenarai di bahagian bawah viewer.

#### 🧩 Di Bahagian Blocks (Logik):
- \`call Notifier1.ShowMessageDialog\`: Memaparkan kotak mesej yang memerlukan pengguna menekan butang "OK" untuk menutupnya. Sesuai untuk memberi amaran atau mesej tahniah!`;
  }

  if (text.includes('block') || text.includes('blok') || text.includes('logik') || text.includes('kod') || text.includes('coding')) {
    return statusHeader + `### 🧩 Blok Pengaturcaraan (Blocks)

**Blocks** adalah otak kepada aplikasi anda. Ia disusun seperti kepingan yap/puzzle untuk membina logik sistem.

#### 📁 Kumpulan Blok Utama (Built-in Blocks):
1. **Control**: Mengawal aliran program (seperti syarat \`if... then\` atau gelung ulang \`for each\`).
2. **Logic**: Pengesahan komputer seperti \`true\`, \`false\`, \`not\`, \`and\`, \`or\`.
3. **Math**: Operasi nombor (cth: menambah markah \`+ 1\`, memilih nombor rawak \`random integer\`).
4. **Text**: Menggabungkan beberapa perkataan menggunakan blok \`join\`.
5. **Variables**: Membuka "kotak simpanan" maklumat sementara untuk menyimpan skor, nama, atau data pengguna.`;
  }

  return statusHeader + `### 📚 Cikgu AI: Panduan Pintar App Inventor

Saya menerima pertanyaan anda tentang: *"${query}"*.

Memandangkan saya sedang berjalan dalam **Mod Tempatan (Vercel Offline Fallback)**, saya sedia menerangkan konsep penting MIT App Inventor! Sila taip salah satu kata kunci di bawah:
1. **Butang** (Button) — Mengesan sentuhan pengguna.
2. **Label** (Label) — Memaparkan teks dinamik.
3. **Kanvas** (Canvas) — Melukis grafik & membina game.
4. **Notifier** — Mengeluarkan amaran dialog.
5. **Blocks** — Menyusun logik & matematik aplikasi.
6. **List** (Senarai) — Menyimpan berbilang maklumat/data.

*Tip: Untuk menggunakan keupayaan model AI penuh, anda disarankan menghoskan aplikasi ini di platform pelayan Node.js seperti **Render**, **Railway**, atau **Koyeb**.*`;
}
