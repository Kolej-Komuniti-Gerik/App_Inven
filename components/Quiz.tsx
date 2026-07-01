
import React, { useState } from 'react';
import { CheckCircle2, XCircle, RefreshCcw, Layout, Box, ArrowRight, Trophy, Star, UserCircle2 } from 'lucide-react';
import { QuizResult } from '../types';

interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

const DESIGNER_QUESTIONS: Question[] = [
  { id: 1, question: "Di manakah anda mencari komponen 'Button' untuk ditarik ke dalam aplikasi?", options: ["Viewer", "Palette", "Properties", "Components"], answer: "Palette" },
  { id: 2, question: "Bahagian manakah yang memaparkan rupa fizikal aplikasi anda pada skrin telefon?", options: ["Components", "Media", "Viewer", "Blocks"], answer: "Viewer" },
  { id: 3, question: "Jika anda ingin menukar warna latar belakang butang, di manakah tetapan itu berada?", options: ["Properties", "Palette", "Media", "Screen1"], answer: "Properties" },
  { id: 4, question: "Apakah kegunaan panel 'Components'?", options: ["Melihat logik program", "Melihat senarai semua komponen yang telah digunakan", "Memilih warna", "Memuat naik gambar"], answer: "Melihat senarai semua komponen yang telah digunakan" },
  { id: 5, question: "Di manakah komponen 'non-visible' (seperti Notifier) dipaparkan dalam Designer?", options: ["Di atas Viewer", "Di dalam Palette sahaja", "Di bawah skrin telefon Viewer", "Di dalam Properties"], answer: "Di bawah skrin telefon Viewer" },
  { id: 6, question: "Apakah maksud 'Fill Parent' dalam tetapan Width/Height?", options: ["Saiz mengikut teks sahaja", "Saiz memenuhi ruang yang ada pada 'container'", "Saiz tetap 100 pixel", "Saiz menjadi kosong"], answer: "Saiz memenuhi ruang yang ada pada 'container'" },
  { id: 7, question: "Kategori Palette yang manakah mengandungi komponen 'VerticalArrangement'?", options: ["User Interface", "Media", "Layout", "Connectivity"], answer: "Layout" },
  { id: 8, question: "Komponen manakah yang digunakan untuk memaparkan teks yang tidak boleh diubah oleh pengguna?", options: ["TextBox", "Label", "Button", "PasswordTextBox"], answer: "Label" },
  { id: 9, question: "Bagaimanakah cara untuk memuat naik fail gambar ke dalam projek?", options: ["Melalui panel Properties", "Melalui panel Media", "Melalui panel Palette", "Melalui panel Viewer"], answer: "Melalui panel Media" },
  { id: 10, question: "Apakah sambungan fail (file extension) bagi projek MIT App Inventor yang boleh dikongsi?", options: [".apk", ".aia", ".exe", ".png"], answer: ".aia" }
];

const BLOCKS_QUESTIONS: Question[] = [
  { id: 1, question: "Apakah warna bagi kategori blok 'Control'?", options: ["Biru", "Hijau", "Oren/Amber", "Ungu"], answer: "Oren/Amber" },
  { id: 2, question: "Blok manakah yang digunakan untuk melakukan perbandingan 'sama dengan' (=)?", options: ["Math", "Logic", "Text", "Control"], answer: "Logic" },
  { id: 3, question: "Jika anda ingin menyambung dua perkataan menjadi satu ayat, blok kategori mana yang perlu digunakan?", options: ["Variables", "Math", "Text", "Lists"], answer: "Text" },
  { id: 4, question: "Apakah blok pertama yang biasanya diperlukan untuk memulakan aksi butang?", options: ["if then", "when Button.Click", "set Button.Text", "call Notifier"], answer: "when Button.Click" },
  { id: 5, question: "Dalam MIT App Inventor, indeks (nombor kedudukan) pertama dalam List bermula dengan nombor berapa?", options: ["0", "1", "-1", "Tiada nombor"], answer: "1" },
  { id: 6, question: "Blok manakah yang digunakan untuk menyimpan nilai sementara yang boleh diakses dari mana-mana?", options: ["Local variable", "Global variable", "Procedure", "Math block"], answer: "Global variable" },
  { id: 7, question: "Blok kategori 'Math' berwarna biru tua digunakan untuk apa?", options: ["Membuat keputusan", "Pengiraan nombor", "Menukar warna", "Menyimpan teks"], answer: "Pengiraan nombor" },
  { id: 8, question: "Blok 'open another screen' berada dalam kategori mana?", options: ["Logic", "Variables", "Control", "Lists"], answer: "Control" },
  { id: 9, question: "Apakah kegunaan blok 'if then else'?", options: ["Untuk membuat pengulangan", "Untuk membuat keputusan berdasarkan syarat", "Untuk menambah nombor", "Untuk menutup aplikasi"], answer: "Untuk membuat keputusan berdasarkan syarat" },
  { id: 10, question: "Apakah beza antara 'Getter' dan 'Setter' dalam blok Variables?", options: ["Getter untuk ambil nilai, Setter untuk tukar nilai", "Getter untuk tukar nilai, Setter untuk ambil nilai", "Kedua-duanya sama", "Tiada beza"], answer: "Getter untuk ambil nilai, Setter untuk tukar nilai" }
];

const THEME_STYLES = {
  designer: {
    progress: "bg-purple-600",
    text: "text-purple-600",
    bg: "bg-purple-50",
    border: "border-purple-200",
    hoverBorder: "hover:border-purple-300"
  },
  blocks: {
    progress: "bg-amber-500",
    text: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
    hoverBorder: "hover:border-amber-300"
  }
};

const Quiz: React.FC = () => {
  const [studentName, setStudentName] = useState('');
  const [quizMode, setQuizMode] = useState<'name_input' | 'selection' | 'designer' | 'blocks'>('name_input');
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const questions = (quizMode === 'designer' || quizMode === 'blocks') ? (quizMode === 'designer' ? DESIGNER_QUESTIONS : BLOCKS_QUESTIONS) : [];
  const currentTheme = (quizMode === 'designer' || quizMode === 'blocks') ? (quizMode === 'designer' ? THEME_STYLES.designer : THEME_STYLES.blocks) : null;

  const saveResult = (finalScore: number, category: 'designer' | 'blocks') => {
    const newResult: QuizResult = {
      id: Date.now().toString(),
      studentName: studentName || 'Hamba Allah',
      score: finalScore,
      total: 10,
      category,
      date: new Date().toLocaleString('ms-MY')
    };

    const existingResults = JSON.parse(localStorage.getItem('app_inventor_results') || '[]');
    localStorage.setItem('app_inventor_results', JSON.stringify([...existingResults, newResult]));
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    const isCorrect = option === (questions[currentStep]?.answer);
    
    let newScore = score;
    if (isCorrect) {
      newScore = score + 1;
      setScore(newScore);
    }
    
    setTimeout(() => {
      if (currentStep < questions.length - 1) {
        setCurrentStep(s => s + 1);
        setSelectedOption(null);
      } else {
        saveResult(newScore, quizMode as 'designer' | 'blocks');
        setIsFinished(true);
      }
    }, 800);
  };

  const restartQuiz = () => {
    setCurrentStep(0);
    setSelectedOption(null);
    setScore(0);
    setIsFinished(false);
    setQuizMode('name_input');
    setStudentName('');
  };

  // Step 1: Input Nama
  if (quizMode === 'name_input') {
    return (
      <div className="max-w-md mx-auto py-20 animate-fadeIn">
        <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-slate-100 text-center space-y-8">
          <div className="w-20 h-20 bg-orange-100 text-orange-600 rounded-3xl flex items-center justify-center mx-auto shadow-inner">
            <UserCircle2 size={40} />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-black text-slate-800 tracking-tight">Siapa Nama Anda?</h2>
            <p className="text-slate-400 text-sm font-medium">Sila masukkan nama penuh anda untuk mulakan kuiz.</p>
          </div>
          <div className="space-y-4">
            <input 
              type="text" 
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Contoh: Ahmad Daniel"
              className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-orange-500 focus:bg-white outline-none transition-all text-center font-bold text-slate-700"
            />
            <button 
              disabled={!studentName.trim()}
              onClick={() => setQuizMode('selection')}
              className="w-full py-4 bg-orange-600 text-white rounded-2xl font-black shadow-lg shadow-orange-100 hover:bg-orange-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
              Seterusnya <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Step 2: Pilih Kategori
  if (quizMode === 'selection') {
    return (
      <div className="max-w-4xl mx-auto space-y-12 py-10 animate-fadeIn">
        <div className="text-center space-y-4">
          <div className="inline-block px-4 py-1.5 bg-orange-100 text-orange-700 rounded-full text-xs font-black uppercase tracking-widest">Hi, {studentName}!</div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Pilih Kategori Kuiz</h2>
          <p className="text-slate-500 max-w-lg mx-auto font-medium">Anda sudah bersedia untuk mencabar diri?</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div 
            onClick={() => setQuizMode('designer')}
            className="group bg-white p-10 rounded-[2.5rem] border-2 border-slate-100 hover:border-purple-500 shadow-xl shadow-slate-100 hover:shadow-purple-100 transition-all cursor-pointer relative overflow-hidden text-center"
          >
            <div className="w-20 h-20 bg-purple-100 text-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Layout size={40} />
            </div>
            <h3 className="text-2xl font-black text-slate-800 mb-2">Kuiz Designer</h3>
            <p className="text-slate-500 text-sm mb-8 leading-relaxed">Palette, Viewer, & Properties.</p>
            <div className="inline-flex items-center gap-2 text-purple-600 font-bold">Mula Kuiz <ArrowRight size={18} /></div>
          </div>

          <div 
            onClick={() => setQuizMode('blocks')}
            className="group bg-white p-10 rounded-[2.5rem] border-2 border-slate-100 hover:border-amber-500 shadow-xl shadow-slate-100 hover:shadow-amber-100 transition-all cursor-pointer relative overflow-hidden text-center"
          >
            <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Box size={40} />
            </div>
            <h3 className="text-2xl font-black text-slate-800 mb-2">Kuiz Blok</h3>
            <p className="text-slate-500 text-sm mb-8 leading-relaxed">Logik Program & Data.</p>
            <div className="inline-flex items-center gap-2 text-amber-600 font-bold">Mula Kuiz <ArrowRight size={18} /></div>
          </div>
        </div>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="bg-white rounded-[3rem] p-12 shadow-2xl text-center animate-fadeIn max-w-2xl mx-auto border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 to-amber-500" />
        <div className="w-24 h-24 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
          <Trophy size={48} />
        </div>
        <h2 className="text-4xl font-black text-slate-800 mb-4">Tahniah, {studentName}!</h2>
        <div className="space-y-1 mb-8">
           <p className="text-slate-600 text-lg font-bold">Markah anda telah disimpan: <span className="text-4xl font-black text-orange-600">{score}</span> / 10</p>
           <div className="flex justify-center gap-1 mt-2">
             {[...Array(5)].map((_, i) => (
               <Star key={i} size={24} className={i < Math.round(score/2) ? "text-yellow-400 fill-yellow-400" : "text-slate-200"} />
             ))}
           </div>
        </div>
        
        <div className="p-6 bg-slate-50 rounded-2xl mb-8">
          <p className="text-slate-700 text-sm font-bold italic">
            Keputusan anda telah dipublish ke Papan Markah untuk semakan Cikgu.
          </p>
        </div>

        <button 
          onClick={restartQuiz}
          className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black hover:bg-slate-800 transition-all flex items-center gap-3 mx-auto shadow-lg shadow-slate-200 active:scale-95"
        >
          <RefreshCcw size={20} /> KEMBALI KE MENU
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentStep];

  return (
    <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl animate-fadeIn max-w-3xl mx-auto border border-slate-100 relative overflow-hidden">
      <div className={`absolute top-0 left-0 h-2 transition-all duration-500 ${currentTheme?.progress}`} style={{ width: `${((currentStep + 1) / 10) * 100}%` }} />
      
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${currentTheme?.bg} ${currentTheme?.text}`}>
             {quizMode === 'designer' ? <Layout size={20} /> : <Box size={20} />}
          </div>
          <div className="flex flex-col">
            <span className={`text-[10px] font-black ${currentTheme?.text} uppercase tracking-widest`}>Kuiz {quizMode}</span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{studentName}</span>
          </div>
        </div>
        <span className="text-xs font-black text-slate-500 uppercase tracking-widest bg-slate-100 px-4 py-2 rounded-full">
          Soalan {currentStep + 1} / 10
        </span>
      </div>
      
      <h3 className="text-2xl font-black text-slate-900 mb-10 leading-tight">
        {currentQuestion?.question}
      </h3>

      <div className="grid grid-cols-1 gap-4">
        {currentQuestion?.options.map((option) => (
          <button
            key={option}
            disabled={selectedOption !== null}
            onClick={() => handleOptionSelect(option)}
            className={`p-6 rounded-2xl border-2 text-left transition-all font-bold text-sm flex justify-between items-center group ${
              selectedOption === option
                ? option === currentQuestion.answer
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-red-500 bg-red-50 text-red-700'
                : selectedOption !== null && option === currentQuestion.answer
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : `border-slate-200 bg-white text-slate-700 ${currentTheme?.hoverBorder} hover:bg-slate-50`
            }`}
          >
            <span className="text-base">{option}</span>
            <div className="shrink-0 ml-4">
              {selectedOption === option && (
                option === currentQuestion.answer ? <CheckCircle2 className="text-green-600" size={24} /> : <XCircle className="text-red-600" size={24} />
              )}
              {selectedOption !== null && option === currentQuestion.answer && selectedOption !== option && (
                <CheckCircle2 className="text-green-600 animate-pulse" size={24} />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Quiz;
