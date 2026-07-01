import React, { useState } from 'react';
import { BLOCK_CATEGORIES } from '../constants';
import { 
  Play, 
  Code, 
  Info, 
  ChevronRight, 
  ExternalLink,
  Settings,
  Cpu,
  Calculator,
  Type,
  List,
  BookOpen,
  Palette,
  Bookmark,
  Sparkles,
  Search,
  HelpCircle,
  FileText
} from 'lucide-react';

interface BlocksGuideProps {
  onAskTutor?: (query: string) => void;
}

const BlocksGuide: React.FC<BlocksGuideProps> = ({ onAskTutor }) => {
  const [selectedCategory, setSelectedCategory] = useState(BLOCK_CATEGORIES[0]);
  const [searchTerm, setSearchTerm] = useState('');

  // Map category IDs to official document URLs
  const getDocUrl = (id: string) => {
    switch (id) {
      case 'control': return 'https://ai2.appinventor.mit.edu/reference/blocks/control.html';
      case 'logic': return 'https://ai2.appinventor.mit.edu/reference/blocks/logic.html';
      case 'math': return 'https://ai2.appinventor.mit.edu/reference/blocks/math.html';
      case 'text': return 'https://ai2.appinventor.mit.edu/reference/blocks/text.html';
      case 'lists': return 'https://ai2.appinventor.mit.edu/reference/blocks/lists.html';
      case 'dictionary': return 'https://ai2.appinventor.mit.edu/reference/blocks/dictionaries.html';
      case 'colors': return 'https://ai2.appinventor.mit.edu/reference/blocks/colors.html';
      case 'variables': return 'https://ai2.appinventor.mit.edu/reference/blocks/variables.html';
      case 'procedures': return 'https://ai2.appinventor.mit.edu/reference/blocks/procedures.html';
      default: return 'https://ai2.appinventor.mit.edu/reference/blocks/';
    }
  };

  // Get matching icon for each category
  const getCategoryIcon = (id: string, size = 18) => {
    switch (id) {
      case 'control': return <Settings size={size} />;
      case 'logic': return <Cpu size={size} />;
      case 'math': return <Calculator size={size} />;
      case 'text': return <Type size={size} />;
      case 'lists': return <List size={size} />;
      case 'dictionary': return <BookOpen size={size} />;
      case 'colors': return <Palette size={size} />;
      case 'variables': return <Bookmark size={size} />;
      case 'procedures': return <Code size={size} />;
      default: return <Settings size={size} />;
    }
  };

  // Get summary brief for each category
  const getCategorySummary = (id: string) => {
    switch (id) {
      case 'control': return 'Membuat keputusan (if-then), gelung (loops), dan kawalan skrin.';
      case 'logic': return 'Membandingkan nilai (true, false, =, ≠, and, or, not).';
      case 'math': return 'Pengiraan angka, nombor rawak, dan formula aritmetik.';
      case 'text': return 'Memanipulasi perkataan (join, length, contains, split).';
      case 'lists': return 'Menyimpan dan mengurus senarai data tersusun.';
      case 'dictionary': return 'Menyusun data secara pasangan Kunci-Nilai (Key-Value).';
      case 'colors': return 'Memilih dan mencipta warna RGB tersendiri.';
      case 'variables': return 'Menyimpan data sementara dalam memori (get, set).';
      case 'procedures': return 'Membina kumpulan kod arahan (fungsi) boleh guna semula.';
      default: return 'Panduan blok kod terbina dalam.';
    }
  };

  // Get brief custom tips for Cikgu AI
  const getCategoryTips = (id: string) => {
    switch (id) {
      case 'control': return 'Gunakan blok "if then else" jika anda mempunyai dua jalan alternatif berdasarkan satu syarat.';
      case 'logic': return 'Pastikan jenis data yang dibandingkan adalah sama untuk mengelakkan ralat logik.';
      case 'math': return 'Blok "random integer" amat sesuai digunakan untuk meniru balingan dadu atau memilih rawak dalam game.';
      case 'text': return 'Gunakan blok "join" untuk menyambungkan teks tetap dengan nilai pembolehubah, seperti "Skor anda ialah: ".';
      case 'lists': return 'Ingat! Indeks senarai dalam App Inventor bermula daripada angka 1, bukannya 0 seperti bahasa pengaturcaraan lain.';
      case 'dictionary': return 'Sangat berkuasa apabila digabungkan dengan pangkalan data cloud (TinyDB / Firebase) untuk simpan profil.';
      case 'colors': return 'Warna boleh diubah secara dinamik mengikut situasi, contohnya latar belakang bertukar merah jika nyawa rendah.';
      case 'variables': return 'Bayangkan pembolehubah global seperti laci besar yang boleh dibuka dari mana-mana skrin aplikasi anda.';
      case 'procedures': return 'Jika anda dapati ada siri blok yang sama diulang 3 kali dalam kod, jadikannya sebagai Prosedur!';
      default: return 'Fahami setiap fungsi blok untuk menulis kod yang kemas dan cekap.';
    }
  };

  // Render decorative visual HTML blocks representing genuine App Inventor blocks
  const renderVisualBlocks = (id: string) => {
    const commonClass = "relative px-4 py-2 text-xs font-mono font-bold text-white shadow-md flex items-center gap-1 shrink-0 select-none transition-all hover:scale-105 duration-200";
    
    switch (id) {
      case 'control':
        return (
          <div className="flex flex-wrap gap-4 items-center py-2">
            {/* if then block - C-shaped simulation */}
            <div className={`w-40 bg-amber-500 rounded-lg text-white shadow-md border-t-4 border-amber-600/40 relative overflow-hidden`}>
              <div className="p-2.5 font-mono text-[11px] font-bold flex items-center justify-between">
                <span>if [  ] then</span>
              </div>
              <div className="h-8 bg-white/90 m-1 rounded-md border border-dashed border-amber-300 flex items-center justify-center">
                <span className="text-[10px] text-amber-600 italic">blok arahan di sini</span>
              </div>
            </div>

            {/* open another screen block */}
            <div className={`${commonClass} bg-amber-500 rounded-r-lg rounded-bl-lg`}>
              {/* Left puzzle hook */}
              <div className="absolute -left-1.5 top-3 w-3 h-3 rounded-full bg-amber-500" />
              <span>open another screen</span>
              <span className="bg-white/20 px-1.5 py-0.5 rounded text-[10px]">"Screen2"</span>
            </div>
          </div>
        );

      case 'logic':
        return (
          <div className="flex flex-wrap gap-4 items-center py-2">
            {/* true block */}
            <div className={`${commonClass} bg-emerald-500 rounded-lg`}>
              <div className="absolute -left-1 top-2.5 w-2 h-2 rounded-full bg-emerald-500" />
              <span>true</span>
            </div>

            {/* not block */}
            <div className={`${commonClass} bg-emerald-500 rounded-r-lg rounded-bl-lg`}>
              <div className="absolute -left-1.5 top-3 w-3 h-3 rounded-full bg-emerald-500" />
              <span>not [  ]</span>
            </div>

            {/* equals block */}
            <div className={`${commonClass} bg-emerald-500 rounded-lg flex items-center gap-2`}>
              <span className="bg-white/20 w-8 h-4 rounded inline-block" />
              <span>=</span>
              <span className="bg-white/20 w-8 h-4 rounded inline-block" />
            </div>
          </div>
        );

      case 'math':
        return (
          <div className="flex flex-wrap gap-4 items-center py-2">
            {/* number block */}
            <div className={`${commonClass} bg-blue-600 rounded-md`}>
              <span>0</span>
            </div>

            {/* addition block */}
            <div className={`${commonClass} bg-blue-600 rounded-lg flex items-center gap-2`}>
              <span className="bg-white/20 w-6 h-4 rounded" />
              <span>+</span>
              <span className="bg-white/20 w-6 h-4 rounded" />
            </div>

            {/* random integer block */}
            <div className={`${commonClass} bg-blue-600 rounded-r-lg rounded-bl-lg`}>
              <div className="absolute -left-1.5 top-3 w-3 h-3 rounded-full bg-blue-600" />
              <span>random integer from 1 to 6</span>
            </div>
          </div>
        );

      case 'text':
        return (
          <div className="flex flex-wrap gap-4 items-center py-2">
            {/* string box block */}
            <div className="relative px-4 py-2.5 text-xs font-mono font-bold text-white bg-[#a81c4e] rounded-md shadow-md border-y border-[#c0235e] flex items-center gap-1 shrink-0 select-none">
              <span className="text-pink-300">“</span>
              <span>Hello World</span>
              <span className="text-pink-300">”</span>
            </div>

            {/* join block */}
            <div className="relative px-4 py-3 text-xs font-mono font-bold text-white bg-[#a81c4e] rounded-r-lg rounded-bl-lg shadow-md flex items-center gap-1.5 shrink-0 select-none">
              <div className="absolute -left-1.5 top-3.5 w-3 h-3 rounded-full bg-[#a81c4e]" />
              <span>join</span>
              <div className="w-12 h-5 bg-[#590d22] rounded flex items-center justify-center text-[10px]">“Hello”</div>
              <div className="w-12 h-5 bg-[#590d22] rounded flex items-center justify-center text-[10px]">“World”</div>
            </div>
          </div>
        );

      case 'lists':
        return (
          <div className="flex flex-wrap gap-4 items-center py-2">
            {/* create empty list block */}
            <div className={`${commonClass} bg-sky-500 rounded-r-lg rounded-bl-lg`}>
              <div className="absolute -left-1.5 top-3 w-3 h-3 rounded-full bg-sky-500" />
              <span>create empty list</span>
            </div>

            {/* select list item */}
            <div className={`${commonClass} bg-sky-500 rounded-r-lg rounded-bl-lg flex items-center gap-1.5`}>
              <div className="absolute -left-1.5 top-3.5 w-3 h-3 rounded-full bg-sky-500" />
              <span>select list item</span>
              <span className="bg-sky-700/50 text-[10px] px-1 rounded">list</span>
              <span className="bg-white/20 text-[10px] px-1 rounded">index: 1</span>
            </div>
          </div>
        );

      case 'dictionary':
        return (
          <div className="flex flex-wrap gap-4 items-center py-2">
            {/* make a dictionary block */}
            <div className={`${commonClass} bg-indigo-600 rounded-r-lg rounded-bl-lg`}>
              <div className="absolute -left-1.5 top-3 w-3 h-3 rounded-full bg-indigo-600" />
              <span>make a dictionary</span>
            </div>

            {/* get value for key block */}
            <div className={`${commonClass} bg-indigo-600 rounded-r-lg rounded-bl-lg flex items-center gap-1.5`}>
              <div className="absolute -left-1.5 top-3.5 w-3 h-3 rounded-full bg-indigo-600" />
              <span>get value for key</span>
              <span className="bg-indigo-800/80 text-[10px] px-1 rounded">"Nama"</span>
            </div>
          </div>
        );

      case 'colors':
        return (
          <div className="flex flex-wrap gap-4 items-center py-2">
            {/* color box block */}
            <div className={`${commonClass} bg-slate-500 rounded-md flex items-center gap-1.5`}>
              <div className="w-3.5 h-3.5 rounded bg-red-600 border border-white" />
              <span>Red</span>
            </div>

            {/* make color block */}
            <div className={`${commonClass} bg-slate-500 rounded-r-lg rounded-bl-lg flex items-center gap-1`}>
              <div className="absolute -left-1.5 top-3 w-3 h-3 rounded-full bg-slate-500" />
              <span>make color</span>
              <span className="bg-white/20 text-[9px] px-1.5 rounded">RGB list</span>
            </div>
          </div>
        );

      case 'variables':
        return (
          <div className="flex flex-wrap gap-4 items-center py-2">
            {/* initialize global block */}
            <div className={`${commonClass} bg-orange-600 rounded-lg flex items-center gap-2`}>
              <span>initialize global</span>
              <span className="bg-orange-800 px-1 py-0.5 rounded text-[10px]">Skor</span>
              <span>to</span>
              <span className="bg-white/20 px-1 rounded">0</span>
            </div>

            {/* get global variable */}
            <div className={`${commonClass} bg-orange-600 rounded-r-lg rounded-bl-lg`}>
              <div className="absolute -left-1.5 top-3 w-3 h-3 rounded-full bg-orange-600" />
              <span>get global</span>
              <span className="bg-orange-800 px-1.5 py-0.5 rounded text-[10px] ml-1">Skor</span>
            </div>
          </div>
        );

      case 'procedures':
        return (
          <div className="flex flex-wrap gap-4 items-center py-2">
            {/* procedure bracket */}
            <div className="w-48 bg-purple-600 rounded-lg text-white shadow-md border-t-4 border-purple-700 relative overflow-hidden">
              <div className="p-2.5 font-mono text-[11px] font-bold">
                <span>to [ Prosedur1 ] do</span>
              </div>
              <div className="h-6 bg-white/90 m-1 rounded border border-dashed border-purple-300" />
            </div>

            {/* call procedure block */}
            <div className={`${commonClass} bg-purple-600 rounded-r-lg rounded-bl-lg`}>
              <div className="absolute -left-1.5 top-3 w-3 h-3 rounded-full bg-purple-600" />
              <span>call Prosedur1</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const currentTips = getCategoryTips(selectedCategory.id);
  const currentSummary = getCategorySummary(selectedCategory.id);

  // Filter sub-blocks based on search term
  const filteredSubBlocks = selectedCategory.subBlocks?.filter(sub => 
    sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sub.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sub.example.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleAskTutorClick = () => {
    if (onAskTutor) {
      onAskTutor(`Boleh terangkan lebih lanjut tentang kategori blok "${selectedCategory.name}" dalam MIT App Inventor beserta contoh yang sesuai?`);
    }
  };

  return (
    <div className="animate-fadeIn flex flex-col gap-8">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Sidebar - KATEGORI BLOK */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-slate-900 text-white px-5 py-4 rounded-t-3xl shadow-md flex items-center justify-between border-b border-slate-800">
            <span className="text-xs font-black uppercase tracking-widest text-slate-400">KATEGORI BLOK</span>
            <HelpCircle size={16} className="text-orange-500" />
          </div>
          <div className="bg-white p-3 rounded-b-3xl shadow-sm border border-slate-100 flex flex-col gap-1.5">
            {BLOCK_CATEGORIES.map((block) => {
              const isSelected = selectedCategory.id === block.id;
              return (
                <button
                  key={block.id}
                  onClick={() => {
                    setSelectedCategory(block);
                    setSearchTerm('');
                  }}
                  className={`w-full text-left px-4 py-3.5 rounded-2xl border transition-all flex items-center gap-3 group relative ${
                    isSelected
                      ? 'bg-orange-50/50 border-orange-500/30 text-orange-700 shadow-sm font-bold scale-[1.02]'
                      : 'bg-white border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                  }`}
                >
                  <div className={`p-2 rounded-xl transition-colors ${
                    isSelected 
                      ? `${block.color} text-white shadow-md shadow-orange-100` 
                      : 'bg-slate-50 text-slate-500 group-hover:bg-slate-100'
                  }`}>
                    {getCategoryIcon(block.id, 16)}
                  </div>
                  <div className="flex-1">
                    <h5 className={`text-[13px] tracking-tight ${isSelected ? 'font-black text-slate-900' : 'font-semibold'}`}>
                      {block.name.split(' ')[0]}
                    </h5>
                    <p className="text-[10px] text-slate-400 font-normal truncate max-w-[140px]">
                      {block.name.includes('(') ? block.name.match(/\(([^)]+)\)/)?.[0] : ''}
                    </p>
                  </div>
                  {isSelected && (
                    <div className="absolute right-4 w-1.5 h-1.5 rounded-full bg-orange-600" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Area - Detail, Contoh, and Blocks List */}
        <div className="lg:col-span-9 space-y-8">
          
          {/* Category Showcase Header Card */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden relative">
            <div className={`absolute top-0 left-0 right-0 h-2.5 ${selectedCategory.color}`} />
            
            <div className="p-8 space-y-6">
              
              {/* Card Header row */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl ${selectedCategory.color} text-white flex items-center justify-center shadow-lg shadow-slate-100 shrink-0`}>
                    {getCategoryIcon(selectedCategory.id, 28)}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
                      {selectedCategory.name}
                    </h3>
                    <p className="text-slate-500 text-xs mt-1 font-medium leading-relaxed">
                      {currentSummary}
                    </p>
                  </div>
                </div>
                
                {/* Ask AI Tutor Action Button */}
                <button
                  onClick={handleAskTutorClick}
                  className="sm:self-center self-start px-4 py-2.5 bg-indigo-50 text-indigo-700 rounded-2xl text-xs font-black hover:bg-indigo-100 active:scale-95 transition-all flex items-center gap-2 border border-indigo-200/40"
                >
                  <Sparkles size={14} className="text-indigo-600 animate-pulse" />
                  Tanya AI Tutor
                </button>
              </div>

              {/* Contoh Blok Section */}
              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3">Contoh Blok:</h4>
                <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100 flex flex-wrap gap-4 items-center">
                  {renderVisualBlocks(selectedCategory.id)}
                </div>
              </div>

              {/* Nota Ringkas Section */}
              <div className="p-5 bg-sky-50/50 rounded-2xl border border-sky-100/50 flex gap-4 items-start">
                <div className="p-2 bg-sky-100 text-sky-600 rounded-xl shrink-0">
                  <BookOpen size={16} />
                </div>
                <div>
                  <h5 className="text-xs font-black text-sky-800 uppercase tracking-wider mb-1">Nota Ringkas</h5>
                  <p className="text-xs text-sky-700/95 leading-relaxed">
                    {selectedCategory.description} {getCategoryTips(selectedCategory.id)}
                  </p>
                </div>
              </div>

              {/* External Doc Link */}
              <div className="flex items-center justify-between text-xs pt-1">
                <a 
                  href={getDocUrl(selectedCategory.id)} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-bold text-orange-600 hover:text-orange-700 underline decoration-2 underline-offset-4"
                >
                  Rujuk Dokumentasi Rasmi {selectedCategory.name.split(' ')[0]} Blocks
                  <ExternalLink size={12} />
                </a>
              </div>

            </div>
          </div>

          {/* Sub-blocks Interactive List Section */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-2">
              <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest">
                Blok-Blok Popular dlm {selectedCategory.name.split(' ')[0]} ({filteredSubBlocks.length})
              </h4>
              
              {/* Dynamic Live Search Bar */}
              <div className="relative w-full sm:w-72">
                <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cari blok... (cth: if, join, split)"
                  className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all text-slate-800"
                />
              </div>
            </div>

            {/* Sub-blocks Display Grid */}
            <div className="grid grid-cols-1 gap-4">
              {filteredSubBlocks.length > 0 ? (
                filteredSubBlocks.map((sub, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group flex flex-col md:flex-row gap-5 items-start">
                    
                    {/* Simulated block visual representation */}
                    <div className="shrink-0">
                      <div className={`px-4 py-2.5 text-xs font-mono font-bold text-white ${selectedCategory.color} rounded-r-xl rounded-bl-xl shadow-md relative min-w-[120px] flex items-center justify-center text-center`}>
                        <div className="absolute -left-1.5 top-3 w-3 h-3 rounded-full bg-inherit" />
                        <span className="truncate max-w-[140px] uppercase text-[10px] tracking-wide">{sub.name}</span>
                      </div>
                    </div>
                    
                    {/* Info and example */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h5 className="font-black text-slate-800 uppercase text-xs tracking-wider">{sub.name}</h5>
                        <ChevronRight size={14} className="text-slate-300 group-hover:text-orange-500 group-hover:translate-x-0.5 transition-all" />
                      </div>
                      
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {sub.description}
                      </p>
                      
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 font-mono text-[10px] text-slate-600 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Contoh Logik:</span>
                          <span className="text-slate-800 font-semibold">{sub.example}</span>
                        </div>
                        <button
                          onClick={() => onAskTutor && onAskTutor(`Boleh terangkan cara menggunakan blok "${sub.name}" dalam MIT App Inventor, berikan contoh logik "${sub.example}" yang anda tulis?`)}
                          className="px-2 py-1 bg-white border border-slate-200 hover:border-indigo-200 text-indigo-600 hover:text-indigo-700 rounded-lg text-[9px] font-bold transition-all shrink-0 shadow-sm"
                        >
                          Tanya Blok Ini
                        </button>
                      </div>
                    </div>

                  </div>
                ))
              ) : (
                <div className="p-16 text-center bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center gap-3">
                  <div className="p-4 bg-slate-50 text-slate-400 rounded-full">
                    <FileText size={24} />
                  </div>
                  <h5 className="font-bold text-slate-700 text-sm">Tiada Blok Ditemui</h5>
                  <p className="text-slate-400 text-xs italic">Tiada padanan dijumpai untuk carian "{searchTerm}". Sila cuba carian yang lain.</p>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default BlocksGuide;
