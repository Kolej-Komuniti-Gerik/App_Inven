
import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  BookOpen, 
  Code, 
  CheckCircle2, 
  Lightbulb,
  ArrowLeft,
  Layout,
  Palette,
  Music,
  Car,
  Calculator,
  ListChecks,
  Network,
  Puzzle,
  RotateCcw,
  Trophy,
  Smartphone,
  ExternalLink
} from 'lucide-react';

type TopicID = 'login' | 'paint' | 'piano' | 'car' | 'math';

interface PuzzleBlock {
  id: string;
  text: string;
  color: string;
}

interface BlockDetail {
  name: string;
  function: string;
  usage: string;
}

interface StepDetail {
  num: string;
  title: string;
  desc: string;
  tip: string;
}

interface TopicContent {
  id: TopicID;
  title: string;
  icon: React.ReactNode;
  color: string;
  desc: string;
  requiredComponents: string[];
  blocks: BlockDetail[];
  steps: StepDetail[];
  flow: string[];
  correctSequence: PuzzleBlock[];
}

const TOPICS: TopicContent[] = [
  {
    id: 'login',
    title: 'TUTORIAL 1: LOGIN PAGE (FINAL)',
    icon: <Layout />,
    color: 'bg-orange-600',
    desc: 'Membina logik pengesahan lengkap dengan mesej ralat dinamik dan navigasi skrin.',
    requiredComponents: ['Username_box', 'PasswordTextBox1', 'Button1', 'Pass_usertxt_Prob (Label)'],
    blocks: [
      { name: "when Button1.Click", function: "Pencetus logik.", usage: "Bermula apabila Button1 diklik." },
      { name: "if then else", function: "Membuat keputusan.", usage: "Asas untuk semak data betul atau salah." },
      { name: "and (Logic)", function: "Gabungan syarat.", usage: "Semak (User = admin) DAN (Pass = 123456)." },
      { name: "set Label.Visible", function: "Sembunyi/Papar Teks.", usage: "Tunjuk 'Pass_usertxt_Prob' jika login gagal." },
      { name: "open another screen", function: "Navigasi Skrin.", usage: "Masuk skrin 'Selamat_Datang' jika berjaya." }
    ],
    steps: [
      { num: "01", title: "Sedia Skrin", desc: "Namakan TextBox sebagai 'Username_box' dan 'PasswordTextBox1'.", tip: "Label ralat namakan 'Pass_usertxt_Prob' dan uncheck 'Visible' dlm Designer." },
      { num: "02", title: "Syarat Logic", desc: "Gunakan blok 'and' untuk pastikan user='admin' dan pass='123456'.", tip: "Blok hijau muda dlm kategori Logic." },
      { num: "03", title: "Aksi Berjaya (Then)", desc: "Sembunyikan label ralat (Visible=false) dan buka skrin 'Selamat_Datang'.", tip: "Pastikan nama skrin 'Selamat_Datang' ditaip tepat." },
      { num: "04", title: "Aksi Gagal (Else)", desc: "Paparkan label ralat (Visible=true) supaya user tahu login tidak sah.", tip: "Visible diset kepada blok Logic 'true'." }
    ],
    flow: [
      "Input User: 'admin' | Pass: '123456'",
      "Klik Button1",
      "Jika Betul: Sembunyi Ralat -> Buka Skrin 'Selamat_Datang'",
      "Jika Salah: Paparkan Mesej Ralat 'Pass_usertxt_Prob'"
    ],
    correctSequence: [
      { id: 'l1', text: 'when Button1.Click', color: 'bg-amber-500' },
      { id: 'l2', text: 'if (Username_box.Text = "admin" and PasswordTextBox1.Text = "123456")', color: 'bg-amber-600' },
      { id: 'l3', text: 'then: set Pass_usertxt_Prob.Visible to false', color: 'bg-amber-700' },
      { id: 'l4', text: 'then: open another screen screenName "Selamat_Datang"', color: 'bg-emerald-600' },
      { id: 'l5', text: 'else: set Pass_usertxt_Prob.Visible to true', color: 'bg-red-600' }
    ]
  },
  {
    id: 'paint',
    title: 'TUTORIAL 2: DRAWING & PAINT',
    icon: <Palette />,
    color: 'bg-purple-600',
    desc: 'Cipta aplikasi melukis mini pada kanvas telefon anda.',
    requiredComponents: ['Canvas', 'Button', 'HorizontalArrangement'],
    blocks: [
      { name: "when Canvas.Dragged", function: "Kesan jari.", usage: "Melukis garisan." },
      { name: "call DrawLine", function: "Melukis.", usage: "Sambung titik X dan Y." }
    ],
    steps: [{ num: "01", title: "Setup Canvas", desc: "Set saiz kanvas.", tip: "Guna Fill Parent." }],
    flow: ["Sentuh", "Seret", "Lukis", "Padam"],
    correctSequence: [
      { id: 'p1', text: 'when Canvas1.Dragged', color: 'bg-purple-500' },
      { id: 'p2', text: 'call Canvas1.DrawLine', color: 'bg-purple-600' },
      { id: 'p3', text: 'prevX, prevY', color: 'bg-purple-700' },
      { id: 'p4', text: 'currentX, currentY', color: 'bg-purple-800' }
    ]
  },
  {
    id: 'piano',
    title: 'TUTORIAL 3: MY PIANO',
    icon: <Music />,
    color: 'bg-slate-800',
    desc: 'Hasilkan alat muzik piano ringkas dengan kesan bunyi.',
    requiredComponents: ['Button', 'Sound'],
    blocks: [{ name: "set Sound.Source", function: "Pilih mp3.", usage: "Sediakan audio." }],
    steps: [{ num: "01", title: "Media", desc: "Upload mp3.", tip: "Fail mesti pendek." }],
    flow: ["Klik Kekunci", "Set Audio", "Main Bunyi"],
    correctSequence: [
      { id: 'm1', text: 'when ButtonDo.Click', color: 'bg-slate-500' },
      { id: 'm2', text: 'set Sound1.Source to "do.mp3"', color: 'bg-slate-600' },
      { id: 'm3', text: 'call Sound1.Play', color: 'bg-slate-700' }
    ]
  },
  {
    id: 'car',
    title: 'TUTORIAL 4: CAR BOOKING',
    icon: <Car />,
    color: 'bg-blue-600',
    desc: 'Sistem tempahan kereta dengan pilihan model dan tarikh.',
    requiredComponents: ['ListPicker', 'DatePicker'],
    blocks: [{ name: "join", function: "Gabung teks.", usage: "Bina resit." }],
    steps: [{ num: "01", title: "List", desc: "Sediakan senarai kereta.", tip: "Guna koma." }],
    flow: ["Pilih Kereta", "Pilih Tarikh", "Papar Resit"],
    correctSequence: [
      { id: 'c1', text: 'when ListPicker1.AfterPicking', color: 'bg-blue-500' },
      { id: 'c2', text: 'set Label1.Text to', color: 'bg-blue-600' },
      { id: 'c3', text: 'join ("Tempahan: ", ListPicker1.Selection)', color: 'bg-blue-700' }
    ]
  },
  {
    id: 'math',
    title: 'TUTORIAL 5: TIMES TABLE HELPER',
    icon: <Calculator />,
    color: 'bg-indigo-700',
    desc: 'Kuasai logik LOOP (Pengulangan). Wajib untuk Skor A dlm exam!',
    requiredComponents: ['TextBox', 'Button', 'Label'],
    blocks: [
      { name: "for range", function: "Looping.", usage: "Ulang 1-12." },
      { name: "join", function: "Concatenate.", usage: "Bina ayat sifir." }
    ],
    steps: [{ num: "01", title: "Loop", desc: "Guna for range block.", tip: "Pilih dari kategori Control." }],
    flow: ["Input", "Klik", "Loop 1-12", "Papar"],
    correctSequence: [
      { id: 'x1', text: 'when ButtonDisplay.Click', color: 'bg-indigo-500' },
      { id: 'x2', text: 'set LabelSifir.Text to ""', color: 'bg-indigo-600' },
      { id: 'x3', text: 'for each number from 1 to 12', color: 'bg-indigo-700' },
      { id: 'x4', text: 'set LabelSifir.Text to join(Label.Text, "\\n", ...)', color: 'bg-indigo-800' }
    ]
  }
];

const DesignerPreview: React.FC<{ id: TopicID }> = ({ id }) => {
  if (id !== 'login') return null;

  return (
    <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-xl max-w-sm mx-auto mb-10 overflow-hidden">
      <div className="border-[6px] border-slate-800 rounded-[2.5rem] bg-slate-50 overflow-hidden flex flex-col h-[500px] shadow-2xl">
        <div className="bg-slate-800 h-6 flex justify-center items-center">
          <div className="w-10 h-1 bg-slate-700 rounded-full" />
        </div>
        <div className="bg-[#3f51b5] p-3 text-white text-xs font-bold shadow-md flex justify-between items-center">
          <span>Screen1</span>
          <div className="flex gap-1">
             <div className="w-1 h-1 bg-white rounded-full opacity-50" />
             <div className="w-1 h-1 bg-white rounded-full opacity-50" />
             <div className="w-1 h-1 bg-white rounded-full opacity-50" />
          </div>
        </div>
        
        <div className="flex-1 p-6 flex flex-col items-center space-y-4">
          <div className="w-full text-center">
            <label className="text-[11px] font-bold text-slate-700 block mb-1">Username:</label>
            <div className="w-full h-8 bg-white border border-slate-200 rounded-sm shadow-sm" />
          </div>
          
          <div className="w-full text-center">
            <label className="text-[11px] font-bold text-slate-700 block mb-1">Password:</label>
            <div className="w-full h-8 bg-white border border-slate-200 rounded-sm flex items-center px-2">
               <span className="text-slate-400 font-black">•••••••••</span>
            </div>
          </div>
          
          <button className="bg-slate-600 text-white px-8 py-2 text-xs font-bold rounded-sm shadow-md hover:bg-slate-700 transition-colors">
            Login
          </button>
          
          {/* Pass_usertxt_Prob simulation */}
          <div className="mt-4 p-1 px-3 border border-[#99cc00] bg-white text-center">
             <span className="text-[10px] font-bold text-red-600">Username atau password tidak tepat</span>
          </div>
          
          <div className="flex-1" />
          <div className="w-full flex justify-around opacity-30">
             <div className="w-4 h-4 rounded-full border border-slate-400" />
             <div className="w-4 h-4 rounded-full border border-slate-400" />
             <div className="w-4 h-4 rounded-full border border-slate-400" />
          </div>
        </div>
      </div>
      <p className="text-center text-[10px] text-slate-400 font-black mt-4 uppercase tracking-widest">Preview Designer Tutorial 1</p>
    </div>
  );
};

const BlockPuzzle: React.FC<{ topic: TopicContent }> = ({ topic }) => {
  const [availableBlocks, setAvailableBlocks] = useState<PuzzleBlock[]>([]);
  const [placedBlocks, setPlacedBlocks] = useState<PuzzleBlock[]>([]);
  const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' | 'none' }>({ text: '', type: 'none' });

  useEffect(() => {
    setAvailableBlocks([...topic.correctSequence].sort(() => Math.random() - 0.5));
    setPlacedBlocks([]);
    setMessage({ text: 'Susun blok mengikut aliran logik yang betul!', type: 'none' });
  }, [topic]);

  const selectBlock = (block: PuzzleBlock) => {
    const nextExpectedIndex = placedBlocks.length;
    if (topic.correctSequence[nextExpectedIndex].id === block.id) {
      setPlacedBlocks([...placedBlocks, block]);
      setAvailableBlocks(availableBlocks.filter(b => b.id !== block.id));
      setMessage({ text: 'Bagus! Teruskan...', type: 'none' });
      
      if (placedBlocks.length + 1 === topic.correctSequence.length) {
        setMessage({ text: 'TAHNIAH! Logik Aplikasi Pintar Berjaya Disusun! 🎉', type: 'success' });
      }
    } else {
      setMessage({ text: 'Opss! Blok itu bukan dlm turutan logik yang betul. Cuba lagi.', type: 'error' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
        <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4 italic">Workspace App Inventor (Simulasi)</h4>
        <div className="min-h-[250px] flex flex-col gap-1 items-start">
          {placedBlocks.length === 0 && (
            <div className="w-full h-32 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center text-slate-300 italic text-sm">
              Klik blok dlm Peti Blok dlm turutan yang betul...
            </div>
          )}
          {placedBlocks.map((block, i) => (
            <div 
              key={i} 
              className={`${block.color} text-white px-6 py-3 rounded-r-xl rounded-bl-xl font-bold text-xs shadow-md border-l-8 border-white/20 animate-slideIn`}
              style={{ marginLeft: `${i * 14}px` }}
            >
              {block.text}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest px-2">Peti Blok (Tarik Dari Sini)</h4>
          <button onClick={() => {
             setAvailableBlocks([...topic.correctSequence].sort(() => Math.random() - 0.5));
             setPlacedBlocks([]);
             setMessage({ text: 'Mula semula!', type: 'none' });
          }} className="p-2 text-slate-400 hover:text-orange-600 transition-colors">
            <RotateCcw size={18} />
          </button>
        </div>
        <div className="flex flex-wrap gap-3 p-5 bg-white rounded-3xl border border-slate-100 shadow-inner">
          {availableBlocks.map((block) => (
            <button
              key={block.id}
              onClick={() => selectBlock(block)}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-3 rounded-2xl font-bold text-xs border border-slate-200 transition-all hover:scale-105 active:scale-95 shadow-sm"
            >
              {block.text}
            </button>
          ))}
        </div>
      </div>

      {message.text && (
        <div className={`p-4 rounded-2xl text-center font-bold text-sm animate-bounce ${
          message.type === 'success' ? 'bg-green-100 text-green-700 border border-green-200' : 
          message.type === 'error' ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-blue-100 text-blue-700 border border-blue-200'
        }`}>
          {message.text}
        </div>
      )}
    </div>
  );
};

const Tutorial: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<TopicContent | null>(null);
  const [activeTab, setActiveTab] = useState<'info' | 'blocks' | 'steps' | 'challenge'>('info');

  if (selectedTopic) {
    return (
      <div className="max-w-5xl mx-auto space-y-6 animate-fadeIn pb-20">
        <button 
          onClick={() => setSelectedTopic(null)}
          className="flex items-center gap-2 text-slate-500 font-bold hover:text-orange-600 transition-colors mb-4 group"
        >
          <div className="p-2 bg-white rounded-xl shadow-sm group-hover:bg-orange-50 transition-colors">
            <ArrowLeft size={18} />
          </div>
          KEMBALI KE SENARAI TUTORIAL
        </button>

        <div className={`${selectedTopic.color} rounded-[2.5rem] p-10 text-white shadow-xl relative overflow-hidden`}>
          <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12">
            {React.cloneElement(selectedTopic.icon as any, { size: 140 })}
          </div>
          <div className="relative z-10 space-y-4">
             <div className="bg-white/20 px-4 py-1.5 rounded-full text-xs font-black inline-block tracking-widest uppercase backdrop-blur-sm">
                Langkah Demi Langkah
             </div>
             <h1 className="text-4xl md:text-5xl font-black tracking-tight">{selectedTopic.title}</h1>
             <p className="text-white/80 max-w-2xl font-medium text-lg">{selectedTopic.desc}</p>
          </div>
        </div>

        <div className="flex bg-white p-2 rounded-2xl shadow-sm border border-slate-100 gap-2 overflow-x-auto overflow-hidden">
          {[
            { id: 'info', label: 'Info & Rupa', icon: <Network size={18} /> },
            { id: 'blocks', label: 'Laci Blok', icon: <ListChecks size={18} /> },
            { id: 'steps', label: 'Langkah Susun', icon: <Code size={18} /> },
            { id: 'challenge', label: 'Cabaran Blok', icon: <Puzzle size={18} /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 min-w-[140px] flex items-center justify-center gap-3 py-4 rounded-xl font-black text-xs uppercase tracking-tight transition-all ${
                activeTab === tab.id 
                ? `${selectedTopic.color} text-white shadow-lg` 
                : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-8">
          {activeTab === 'info' && (
            <div className="space-y-10 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
                  <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
                    <Layout className="text-orange-500" /> Komponen Terlibat
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedTopic.requiredComponents.map((comp, idx) => (
                      <span key={idx} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold border border-slate-200">
                        {comp}
                      </span>
                    ))}
                  </div>
                  <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100 text-xs text-orange-800 font-medium space-y-3">
                    <div>
                      <strong>Nota:</strong> Pastikan anda namakan komponen sama dlm Designer (cth: <code>Username_box</code>) supaya blok mudah dicari nanti.
                    </div>
                    <div className="pt-2 border-t border-orange-200">
                      <a 
                        href="https://docs.google.com/document/d/1OUFE4qMgWJbwKCffwcQOWZ5zRyjYVivCrRqF45LS-LE/edit?usp=sharing" 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-orange-700 font-black hover:underline group"
                      >
                        <BookOpen size={14} className="group-hover:scale-110 transition-transform" /> 
                        LIHAT MODUL RUJUKAN PENUH (GOOGLE DOCS)
                      </a>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
                  <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
                    <Network className="text-blue-500" /> Aliran Proses
                  </h3>
                  <div className="space-y-4">
                    {selectedTopic.flow.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-4">
                        <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0 text-[10px] font-black">
                          {idx + 1}
                        </div>
                        <p className="text-slate-600 text-sm font-medium">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Added Designer Preview Section */}
              <div className="bg-slate-900 rounded-[3rem] p-12 text-white">
                 <div className="flex flex-col md:flex-row gap-10 items-center">
                    <div className="flex-1 space-y-6">
                       <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-orange-400">
                          <Smartphone size={14} /> Designer View
                       </div>
                       <h3 className="text-3xl font-black tracking-tight">Rupa Fizikal Aplikasi</h3>
                       <p className="text-slate-400 text-sm leading-relaxed">
                          Ini adalah rupa skrin aplikasi anda dalam Viewer MIT App Inventor. Susun komponen mengikut hierarki ini untuk hasil yang sama.
                       </p>
                       <ul className="space-y-3 text-xs font-bold text-slate-300">
                          <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-green-500" /> Label Username & TextBox</li>
                          <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-green-500" /> Label Password & PasswordTextBox</li>
                          <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-green-500" /> Button Login</li>
                          <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-orange-500" /> Pass_usertxt_Prob (Label Ralat)</li>
                       </ul>
                    </div>
                    <div className="shrink-0">
                       <DesignerPreview id={selectedTopic.id} />
                    </div>
                 </div>
              </div>
            </div>
          )}

          {activeTab === 'blocks' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
              {selectedTopic.blocks.map((block, idx) => (
                <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm group hover:shadow-md transition-shadow">
                   <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${selectedTopic.color} text-white shadow-lg`}>
                      <Lightbulb size={24} />
                   </div>
                   <h4 className="text-lg font-black text-slate-800 mb-2 uppercase tracking-tight">{block.name}</h4>
                   <p className="text-slate-500 text-xs font-bold leading-relaxed mb-4">{block.function}</p>
                   <div className="pt-4 border-t border-slate-50">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 tracking-tighter">Dalam Projek Ini:</p>
                      <p className="text-slate-600 text-[11px] font-medium leading-relaxed italic">{block.usage}</p>
                   </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'challenge' && (
             <div className="max-w-3xl mx-auto animate-fadeIn">
               <div className="text-center mb-10 space-y-2">
                 <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <Trophy size={32} />
                 </div>
                 <h3 className="text-2xl font-black text-slate-800 tracking-tight uppercase">Ujian Logik Blok</h3>
                 <p className="text-slate-500 text-sm font-medium">Susun blok dlm turutan logik MIT App Inventor yang betul.</p>
               </div>
               <BlockPuzzle topic={selectedTopic} />
             </div>
          )}

          {activeTab === 'steps' && (
            <div className="max-w-3xl mx-auto space-y-4 animate-fadeIn">
              {selectedTopic.steps.map((step, idx) => (
                <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-100 flex gap-6 items-start shadow-sm hover:border-orange-200 transition-colors">
                  <div className={`w-12 h-12 ${selectedTopic.color} rounded-2xl flex items-center justify-center text-white font-black text-xl shrink-0 shadow-lg`}>
                    {step.num}
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">{step.title}</h3>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed">{step.desc}</p>
                    <div className="flex items-center gap-2 pt-2 text-emerald-600 font-black text-[10px] uppercase tracking-widest">
                      <CheckCircle2 size={14} /> Tip: {step.tip}
                    </div>
                  </div>
                </div>
              ))}
              <div className="mt-8 p-8 bg-slate-900 rounded-[2.5rem] text-white text-center shadow-xl space-y-4">
                 <h4 className="text-xl font-black uppercase">Anda Sedia Mencuba?</h4>
                 <p className="text-slate-400 text-sm">Buka MIT App Inventor dan bina aplikasi {selectedTopic.id} sekarang!</p>
                 <a 
                  href="https://ai2.appinventor.mit.edu" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 px-10 py-4 bg-orange-600 text-white rounded-2xl font-black text-sm hover:scale-105 transition-all shadow-lg shadow-orange-900/20"
                >
                   Buka Laman App Inventor <ArrowRight size={20} />
                 </a>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-fadeIn">
      <div className="text-center space-y-4 py-6">
        <h2 className="text-5xl font-black text-slate-900 tracking-tight uppercase">Pusat <span className="text-orange-600">Tutorial Pintar</span></h2>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg font-medium">
          Membina kemahiran pembangunan aplikasi langkah demi langkah mengikut modular.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TOPICS.map((topic) => (
          <div 
            key={topic.id}
            onClick={() => setSelectedTopic(topic)}
            className="group bg-white rounded-[2.5rem] p-8 border-2 border-slate-100 hover:border-orange-500 shadow-xl shadow-slate-100 hover:shadow-orange-100 transition-all cursor-pointer relative overflow-hidden"
          >
            <div className={`w-16 h-16 ${topic.color} text-white rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-slate-200`}>
              {React.cloneElement(topic.icon as any, { size: 28 })}
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">{topic.title}</h3>
              <p className="text-slate-500 leading-relaxed font-medium text-xs line-clamp-2">
                {topic.desc}
              </p>
            </div>
            <div className="mt-8 flex items-center gap-2 text-orange-600 font-black text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
              Mula Belajar <ArrowRight size={16} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tutorial;
