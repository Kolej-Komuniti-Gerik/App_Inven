import { GoogleGenAI } from '@google/genai';

export default async function handler(req: any, res: any) {
  // Tetapkan header CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { question } = req.body || {};
  if (!question) {
    return res.status(400).json({ error: 'Sila berikan soalan.' });
  }

  try {
    // Vercel Environment Variables
    const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
    if (!apiKey) {
      return res.status(200).json({ 
        text: `### 🔑 Kunci API Gemini Tidak Dijumpai (Vercel)

Cikgu AI memerlukan Kunci API Gemini untuk berfungsi secara penuh di Vercel. Sila ikuti langkah mudah ini untuk memasukkannya:

1. Pergi ke **Vercel Dashboard** projek anda.
2. Masuk ke bahagian **Settings** > **Environment Variables**.
3. Tambah satu pembolehubah (variable) baharu:
   - **Key**: \`GEMINI_API_KEY\`
   - **Value**: *(Masukkan Kunci API Gemini anda di sini)*
4. Klik **Save**.
5. Pergi ke tab **Deployments** dan klik **Redeploy** projek anda supaya kunci ini diaktifkan!

*Nota: Anda boleh mendapatkan Kunci API Gemini secara percuma di **[Google AI Studio](https://aistudio.google.com/)**.*`
      });
    }

    const ai = new GoogleGenAI({ apiKey });

    // Cuba model mengikut keutamaan
    const modelsToTry = ['gemini-2.5-flash', 'gemini-3.5-flash', 'gemini-3.1-flash-lite'];
    let lastError: any = null;
    let responseText = '';

    for (const modelName of modelsToTry) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: question,
          config: {
            systemInstruction: `Anda adalah pakar MIT App Inventor yang mesra dan membantu pelajar sekolah. 
            Jelaskan konsep dalam Bahasa Melayu yang mudah difahami. 
            Gunakan analogi jika perlu. Fokus pada komponen (Designer) dan blok program (Blocks).`,
            temperature: 0.7,
          },
        });
        
        if (response && response.text) {
          responseText = response.text;
          break; // Berjaya!
        }
      } catch (err: any) {
        lastError = err;
      }
    }

    if (responseText) {
      return res.status(200).json({ text: responseText });
    }

    // Jika ada sekatan akses API (403 Permission Denied)
    const errorStr = lastError?.message || String(lastError);
    if (errorStr.includes('PERMISSION_DENIED') || errorStr.includes('denied access') || errorStr.includes('403')) {
      return res.status(200).json({
        text: `### ⚠️ Masalah Kebenaran Kunci API (403 Permission Denied)

Kunci API Gemini yang telah anda masukkan ke dalam Environment Variable Vercel anda disekat atau tidak sah.

**Cara Menyelesaikannya:**
1. Cipta kunci API baharu yang segar di **[Google AI Studio](https://aistudio.google.com/)**.
2. Masuk ke **Vercel Dashboard > Settings > Environment Variables**.
3. Kemas kini nilai pembolehubah \`GEMINI_API_KEY\` dengan kunci API baharu yang anda cipta tadi.
4. Klik **Save** dan buat **Redeploy** semula projek anda.`
      });
    }

    // Jika ralat lain, gunakan fallback pintar tempatan supaya aplikasi tidak tergantung
    return res.status(200).json({ text: getLocalClientFallback(question, errorStr) });

  } catch (error: any) {
    return res.status(200).json({ text: getLocalClientFallback(question, error?.message || error) });
  }
}

// Pembantu pintar tempatan terbina dalam Vercel sekiranya ralat pelayan berlaku
function getLocalClientFallback(query: string, errReason?: string): string {
  const text = query.toLowerCase();
  
  const statusHeader = `> 💡 **Nota Sambungan (Mod Pintar Tempatan Aktif)**
${errReason ? `> Cikgu AI mengaktifkan mod tempatan kerana ralat teknikal: \`${errReason}\`` : '> Cikgu AI sedang berjalan dalam mod tempatan.'}
> Sila pastikan \`GEMINI_API_KEY\` telah dimasukkan di **Vercel Dashboard > Settings > Environment Variables** dan dideploy semula!
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

Sila taip salah satu kata kunci di bawah untuk mendapatkan panduan lengkap:
1. **Butang** (Button) — Mengesan sentuhan pengguna.
2. **Label** (Label) — Memaparkan teks dinamik.
3. **Kanvas** (Canvas) — Melukis grafik & membina game.
4. **Notifier** — Mengeluarkan amaran dialog.
5. **Blocks** — Menyusun logik & matematik aplikasi.
6. **List** (Senarai) — Menyimpan berbilang maklumat/data.`;
}
