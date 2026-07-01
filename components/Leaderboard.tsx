
import React, { useState, useEffect } from 'react';
import { QuizResult } from '../types';
import { Trophy, Trash2, Calendar, Layout, Box, Download, Search, Filter } from 'lucide-react';

const Leaderboard: React.FC = () => {
  const [results, setResults] = useState<QuizResult[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('app_inventor_results') || '[]');
    // Susun mengikut tarikh terbaru
    setResults(data.sort((a: QuizResult, b: QuizResult) => parseInt(b.id) - parseInt(a.id)));
  }, []);

  const clearRecords = () => {
    if (window.confirm('Adakah anda pasti mahu memadam semua rekod markah pelajar? Tindakan ini tidak boleh dibatalkan.')) {
      localStorage.removeItem('app_inventor_results');
      setResults([]);
    }
  };

  const filteredResults = results.filter(r => 
    r.studentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const averageScore = results.length > 0 
    ? (results.reduce((acc, curr) => acc + curr.score, 0) / results.length).toFixed(1)
    : 0;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header & Stats */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-4">
            Papan Markah
            <div className="p-2 bg-yellow-100 text-yellow-600 rounded-xl">
              <Trophy size={28} />
            </div>
          </h2>
          <p className="text-slate-500 font-medium mt-1">Senarai pencapaian pelajar dlm kuiz MIT App Inventor.</p>
        </div>
        
        <div className="flex gap-3">
          <div className="bg-white px-6 py-3 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Jumlah Pelajar</span>
            <span className="text-2xl font-black text-orange-600">{results.length}</span>
          </div>
          <div className="bg-white px-6 py-3 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Purata Markah</span>
            <span className="text-2xl font-black text-indigo-600">{averageScore}</span>
          </div>
        </div>
      </div>

      {/* Control Bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Cari nama pelajar..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-6 py-3 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-orange-500 transition-all font-medium text-slate-700"
          />
        </div>
        <div className="flex gap-2">
          <button 
            onClick={clearRecords}
            className="px-6 py-3 bg-red-50 text-red-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-100 transition-all flex items-center gap-2"
          >
            <Trash2 size={16} /> Padam Rekod
          </button>
        </div>
      </div>

      {/* Table Area */}
      <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Pelajar</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Kategori</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Markah</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Tarikh</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredResults.length > 0 ? filteredResults.map((res) => (
                <tr key={res.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-black text-sm">
                        {res.studentName.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-black text-slate-800 text-lg tracking-tight">{res.studentName}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                      res.category === 'designer' ? 'bg-purple-100 text-purple-600' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {res.category === 'designer' ? <Layout size={12} /> : <Box size={12} />}
                      {res.category}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className="text-xl font-black text-slate-900">{res.score}</span>
                    <span className="text-slate-300 font-bold ml-1">/ {res.total}</span>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      res.score >= 5 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
                    }`}>
                      {res.score >= 5 ? 'Lulus' : 'Gagal'}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex flex-col items-end">
                      <span className="text-xs font-bold text-slate-600">{res.date.split(',')[0]}</span>
                      <span className="text-[10px] text-slate-400 font-medium">{res.date.split(',')[1]}</span>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="p-6 bg-slate-50 rounded-full text-slate-300">
                        <Filter size={48} />
                      </div>
                      <p className="text-slate-400 font-bold italic">Tiada rekod markah dijumpai...</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
