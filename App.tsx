
import React, { useState } from 'react';
import { 
  Home, 
  Layout as LayoutIcon, 
  Box, 
  HelpCircle, 
  Sparkles,
  ArrowRight,
  ChevronRight,
  GraduationCap,
  BookOpen,
  Trophy
} from 'lucide-react';
import { AppSection } from './types';
import InterfaceGuide from './components/InterfaceGuide';
import BlocksGuide from './components/BlocksGuide';
import Quiz from './components/Quiz';
import AITutor from './components/AITutor';
import Tutorial from './components/Tutorial';
import Leaderboard from './components/Leaderboard';

const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<AppSection>('home');
  const [tutorQuery, setTutorQuery] = useState<string>('');

  const renderContent = () => {
    switch (currentSection) {
      case 'home':
        return (
          <div className="space-y-12 animate-fadeIn">
            {/* Hero Section */}
            <div className="text-center space-y-6 pt-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-bold tracking-wide animate-bounce">
                <Sparkles size={16} /> BARU: Tutor AI Kini Tersedia!
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight">
                Kuasai <span className="text-orange-600">MIT App Inventor</span>
              </h1>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Belajar membina aplikasi Android dengan cara yang menyeronokkan. Kenali antaramuka dan logik blok dengan bimbingan pintar.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <button 
                  onClick={() => setCurrentSection('interface')}
                  className="px-8 py-4 bg-orange-600 text-white rounded-2xl font-bold shadow-lg shadow-orange-200 hover:bg-orange-700 hover:scale-105 transition-all flex items-center gap-2"
                >
                  Mula Belajar (Langkah 1) <ArrowRight size={20} />
                </button>
                <button 
                  onClick={() => setCurrentSection('leaderboard')}
                  className="px-8 py-4 bg-white text-slate-800 border-2 border-slate-100 rounded-2xl font-bold hover:bg-slate-50 hover:border-slate-200 transition-all flex items-center gap-2"
                >
                  Papan Markah <Trophy size={20} className="text-yellow-500" />
                </button>
              </div>
            </div>

            {/* Features Grid - Sorted by logical learning path */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { 
                  step: 'Langkah 1',
                  title: 'Interface (Designer)', 
                  desc: 'Kenali rupa luaran. Belajar menyusun butang, imej dan susun atur aplikasi.', 
                  icon: <LayoutIcon />, 
                  section: 'interface',
                  color: 'bg-blue-600'
                },
                { 
                  step: 'Langkah 2',
                  title: 'Blocks (Logik)', 
                  desc: 'Kenali logik pengekodan menggunakan blok warna yang mudah difahami.', 
                  icon: <Box />, 
                  section: 'blocks',
                  color: 'bg-amber-500'
                },
                { 
                  step: 'Langkah 3',
                  title: 'Tutorial Projek', 
                  desc: 'Bina 5 aplikasi utama: Login, Paint, Piano, Booking, dan Times Table (Loop).', 
                  icon: <BookOpen />, 
                  section: 'tutorial',
                  color: 'bg-emerald-600'
                },
                { 
                  step: 'Ujian',
                  title: 'Kuiz Interaktif', 
                  desc: 'Uji kefahaman anda dengan soalan interaktif yang mencabar minda.', 
                  icon: <GraduationCap />, 
                  section: 'quiz',
                  color: 'bg-indigo-600'
                }
              ].map((f, i) => (
                <div 
                  key={i}
                  onClick={() => setCurrentSection(f.section as AppSection)}
                  className="group bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-50 transition-all cursor-pointer relative overflow-hidden"
                >
                  <div className={`absolute top-0 right-0 px-4 py-1.5 rounded-bl-2xl text-[10px] font-black text-white uppercase tracking-widest ${f.color}`}>
                    {f.step}
                  </div>
                  <div className="w-14 h-14 bg-slate-50 text-slate-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-600 group-hover:text-white transition-all">
                    {React.cloneElement(f.icon as any, { size: 28 })}
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">{f.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6">{f.desc}</p>
                  <div className="flex items-center text-orange-600 text-sm font-bold group-hover:gap-2 transition-all">
                    Mula {f.step} <ChevronRight size={16} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'interface':
        return <InterfaceGuide />;
      case 'blocks':
        return <BlocksGuide onAskTutor={(q: string) => { setTutorQuery(q); setCurrentSection('tutor'); }} />;
      case 'quiz':
        return <Quiz />;
      case 'tutor':
        return <AITutor initialQuery={tutorQuery} onClearQuery={() => setTutorQuery('')} />;
      case 'tutorial':
        return <Tutorial />;
      case 'leaderboard':
        return <Leaderboard />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setCurrentSection('home')}
          >
            <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center text-white font-black group-hover:rotate-12 transition-all">
              MIT
            </div>
            <span className="text-xl font-black text-slate-900 tracking-tight">Pintar <span className="text-orange-600">App Inventor</span></span>
          </div>

          <div className="hidden lg:flex items-center gap-1 bg-slate-100/50 p-1.5 rounded-2xl">
            {[
              { id: 'home', label: 'Home', icon: <Home size={18} /> },
              { id: 'interface', label: '1. Designer', icon: <LayoutIcon size={18} /> },
              { id: 'blocks', label: '2. Blok', icon: <Box size={18} /> },
              { id: 'tutorial', label: '3. Tutorial Projek', icon: <BookOpen size={18} /> },
              { id: 'quiz', label: 'Kuiz', icon: <GraduationCap size={18} /> },
              { id: 'leaderboard', label: 'Papan Markah', icon: <Trophy size={18} /> },
              { id: 'tutor', label: 'Bantuan AI', icon: <Sparkles size={18} /> }
            ].map((nav) => (
              <button
                key={nav.id}
                onClick={() => setCurrentSection(nav.id as AppSection)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                  currentSection === nav.id 
                    ? 'bg-white text-orange-600 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-800 hover:bg-white/50'
                }`}
              >
                {nav.icon} {nav.label}
              </button>
            ))}
          </div>
          
          <button className="lg:hidden p-2 text-slate-600" onClick={() => setCurrentSection('home')}>
             <LayoutIcon />
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-10 w-full">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center text-white font-bold text-sm">MIT</div>
              <span className="text-lg font-bold text-slate-800">Pintar App Inventor</span>
            </div>
            <p className="text-slate-500 text-sm max-w-md leading-relaxed">
              Dicipta khas untuk membantu pelajar Malaysia memahami dunia pembangunan aplikasi dengan lebih mudah dan interaktif mengikut langkah demi langkah.
            </p>
          </div>
          <div className="flex md:justify-end gap-10">
            <div>
              <h5 className="font-bold text-slate-800 mb-4 text-sm uppercase tracking-wider">Langkah Belajar</h5>
              <ul className="space-y-2 text-sm text-slate-500">
                <li className="hover:text-orange-600 cursor-pointer" onClick={() => setCurrentSection('interface')}>1. Designer Guide</li>
                <li className="hover:text-orange-600 cursor-pointer" onClick={() => setCurrentSection('blocks')}>2. Blocks Logic</li>
                <li className="hover:text-orange-600 cursor-pointer" onClick={() => setCurrentSection('tutorial')}>3. Tutorial Projek</li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-slate-800 mb-4 text-sm uppercase tracking-wider">Sumber</h5>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><a href="http://appinventor.mit.edu/" target="_blank" rel="noreferrer" className="hover:text-orange-600">Laman Web Rasmi</a></li>
                <li><a href="https://ai2.appinventor.mit.edu/reference/blocks/control.html" target="_blank" rel="noreferrer" className="hover:text-orange-600">Rujukan Blok Control</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-12 text-center text-slate-400 text-xs">
          © 2024 Pintar App Inventor. Dibina untuk tujuan pendidikan.
        </div>
      </footer>
    </div>
  );
};

export default App;
