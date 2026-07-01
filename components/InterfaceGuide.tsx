
import React, { useState } from 'react';
import { INTERFACE_PARTS, getIcon, UI_COMPONENTS, getComponentIcon } from '../constants';
import { HelpCircle, Info, ChevronRight, ChevronDown, Plus, Minus, Square } from 'lucide-react';

// Property Row Component for cleaner code
// Moved outside and made children optional to fix TS errors regarding missing children prop in some build environments
const PropertyRow = ({ label, children }: { label: string; children?: React.ReactNode }) => (
  <div className="space-y-1 mb-3">
    <div className="flex items-center gap-1">
      <label className="text-[10px] font-medium text-slate-700">{label}</label>
      <div className="w-3 h-3 rounded-full border border-slate-300 flex items-center justify-center bg-white">
        <span className="text-[8px] text-slate-400 font-bold">?</span>
      </div>
    </div>
    {children}
  </div>
);

const InterfaceGuide: React.FC = () => {
  const [activePart, setActivePart] = useState(INTERFACE_PARTS[0]);
  const [selectedUIComp, setSelectedUIComp] = useState(UI_COMPONENTS[0]);

  // Helper function for active highlight classes
  const getHighlightClass = (id: string) => {
    return activePart.id === id 
      ? 'ring-4 ring-purple-500/50 border-purple-600 z-10 shadow-[0_0_20px_rgba(168,85,247,0.4)]' 
      : '';
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start animate-fadeIn">
      {/* Visual Simulation Area */}
      <div className="w-full lg:w-2/3 space-y-4">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
          <div className="bg-slate-800 p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Designer View Simulation</span>
          </div>
          
          <div className="p-1 bg-[#d3e3ba] grid grid-cols-12 gap-1 h-[600px]">
            {/* Palette Sidebar Simulation */}
            <div className={`col-span-3 bg-white border border-slate-300 overflow-y-auto custom-scrollbar transition-all duration-300 ${getHighlightClass('palette')}`}>
              <div className="bg-[#e4ecc4] p-1.5 text-[10px] font-bold text-slate-700 border-b border-slate-300 flex items-center justify-between">
                Palette
                <Info size={10} className={activePart.id === 'palette' ? 'text-purple-600 animate-pulse' : ''} />
              </div>
              <div className="bg-[#f0f0f0] p-1 text-[9px] font-bold border-b border-slate-300">
                User Interface
              </div>
              <div className="divide-y divide-slate-100">
                {UI_COMPONENTS.map((comp) => (
                  <div 
                    key={comp.name}
                    onClick={() => {
                      setSelectedUIComp(comp);
                      if (activePart.id !== 'palette') setActivePart(INTERFACE_PARTS[0]);
                    }}
                    className={`p-1.5 flex items-center gap-2 text-[10px] cursor-pointer transition-colors ${
                      selectedUIComp.name === comp.name ? 'bg-purple-50 font-bold text-purple-700' : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    {getComponentIcon(comp.name)}
                    {comp.name}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Phone Viewer */}
            <div className={`col-span-5 bg-white border border-slate-300 flex flex-col items-center p-4 transition-all duration-300 ${getHighlightClass('viewer')}`}>
              <div className="w-full h-full border-[8px] border-slate-800 rounded-[2rem] overflow-hidden bg-white shadow-lg flex flex-col relative">
                <div className="h-4 bg-slate-800 flex justify-center items-center">
                  <div className="w-8 h-1 bg-slate-700 rounded-full" />
                </div>
                <div className="bg-[#5d9b31] p-1.5 text-white text-[9px] font-bold">Screen1</div>
                <div className="flex-1 p-2 space-y-2 overflow-y-auto bg-slate-50">
                   <div className="p-3 bg-white border border-slate-200 rounded text-center shadow-sm">
                      <div className="flex flex-col items-center gap-2">
                        {getComponentIcon(selectedUIComp.name)}
                        <span className="text-[10px] font-medium">{selectedUIComp.name}</span>
                      </div>
                   </div>
                </div>
              </div>
            </div>

            {/* Components & Properties Stack */}
            <div className="col-span-4 flex flex-col gap-1 overflow-hidden">
              {/* Components Tree View */}
              <div className={`flex-[0.4] bg-white border border-slate-300 transition-all duration-300 flex flex-col ${getHighlightClass('components')}`}>
                <div className="bg-[#e4ecc4] p-1.5 text-[10px] font-bold border-b border-slate-300 flex justify-between">
                  Components
                </div>
                <div className="p-1 overflow-auto text-[10px]">
                  <div className="flex items-center gap-1 py-0.5">
                    <Minus size={10} className="text-slate-400" />
                    {getComponentIcon('Screen')}
                    <span className="bg-green-100 px-1 rounded">Screen1</span>
                  </div>
                  <div className="ml-4 flex flex-col">
                    <div className="flex items-center gap-1 py-0.5 font-bold text-purple-600 bg-purple-50 rounded">
                      <div className="w-2.5" />
                      {getComponentIcon(selectedUIComp.name)}
                      <span>{selectedUIComp.name}_1</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Properties Panel (Matching the Image) */}
              <div className={`flex-[1.5] bg-white border border-slate-300 transition-all duration-300 flex flex-col ${getHighlightClass('properties')}`}>
                {/* Header Section */}
                <div className="bg-[#d3e3ba] p-2 text-xs font-bold text-slate-800 border-b border-slate-300 shadow-sm">
                  Properties
                </div>
                <div className="bg-[#f0f5e5] p-2 text-[11px] text-slate-700 border-b border-slate-300 font-medium">
                   Screen1
                </div>
                
                {/* Scrollable Properties Area */}
                <div className="flex-1 overflow-y-auto bg-[#f9fbf2] custom-scrollbar">
                  {/* Appearance Category Header */}
                  <div className="bg-[#d3e3ba] p-1.5 px-2 text-[10px] font-bold text-slate-700 flex items-center gap-1 cursor-pointer">
                    <ChevronDown size={12} className="text-slate-500" />
                    Appearance
                  </div>
                  
                  {/* Property Fields */}
                  <div className="p-3">
                    <PropertyRow label="AboutScreen">
                      <textarea className="w-full h-12 border border-slate-300 rounded-sm bg-white text-[10px] p-1 resize-none" />
                    </PropertyRow>

                    <PropertyRow label="AlignHorizontal">
                      <div className="relative">
                        <select className="w-full border border-slate-300 rounded-sm bg-white text-[10px] p-1 appearance-none">
                          <option>Left : 1</option>
                          <option>Center : 3</option>
                          <option>Right : 2</option>
                        </select>
                        <ChevronDown size={10} className="absolute right-1.5 top-2 text-slate-400 pointer-events-none" />
                      </div>
                    </PropertyRow>

                    <PropertyRow label="AlignVertical">
                       <div className="relative">
                        <select className="w-full border border-slate-300 rounded-sm bg-white text-[10px] p-1 appearance-none">
                          <option>Top : 1</option>
                          <option>Center : 2</option>
                          <option>Bottom : 3</option>
                        </select>
                        <ChevronDown size={10} className="absolute right-1.5 top-2 text-slate-400 pointer-events-none" />
                      </div>
                    </PropertyRow>

                    <PropertyRow label="BackgroundColor">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-black border border-slate-400" />
                        <span className="text-[10px]">Black</span>
                      </div>
                    </PropertyRow>

                    <PropertyRow label="BackgroundImage">
                      <div className="w-full border border-slate-300 rounded-sm bg-white text-[10px] p-1 flex justify-between items-center cursor-pointer">
                        <span className="text-slate-400">None...</span>
                      </div>
                    </PropertyRow>

                    <PropertyRow label="BigDefaultText">
                      <input type="checkbox" className="w-3 h-3 rounded-sm border-slate-300" />
                    </PropertyRow>

                    <PropertyRow label="CloseScreenAnimation">
                       <div className="relative">
                        <select className="w-full border border-slate-300 rounded-sm bg-white text-[10px] p-1 appearance-none">
                          <option>Default</option>
                          <option>Fade</option>
                          <option>Zoom</option>
                        </select>
                        <ChevronDown size={10} className="absolute right-1.5 top-2 text-slate-400 pointer-events-none" />
                      </div>
                    </PropertyRow>

                    <PropertyRow label="Scrollable">
                      <input type="checkbox" className="w-3 h-3 rounded-sm border-slate-300" />
                    </PropertyRow>
                    
                    {/* Placeholder for others */}
                    <div className="pt-2 border-t border-slate-200 mt-2 opacity-50">
                       <p className="text-[8px] italic text-center text-slate-400">Tataletak Harta Lainnya...</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-lg animate-fadeIn">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-purple-600 text-white rounded-xl shadow-lg shadow-purple-200">
              {getComponentIcon(selectedUIComp.name, true)}
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">{selectedUIComp.name}</h3>
              <p className="text-[10px] text-purple-600 font-black uppercase tracking-widest bg-purple-50 px-2 py-0.5 rounded-full inline-block">Komponen Terpilih</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Apa dia buat?</p>
              <p className="text-slate-700 text-sm leading-relaxed">{selectedUIComp.description}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Bila nak pakai?</p>
              <p className="text-slate-700 text-sm leading-relaxed">{selectedUIComp.usage}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Selector Sidebar */}
      <div className="w-full lg:w-1/3 space-y-4">
        <div className="bg-purple-600 p-6 rounded-3xl text-white shadow-xl shadow-purple-100 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 blur-2xl -mr-8 -mt-8 rounded-full group-hover:scale-150 transition-transform duration-700" />
          <h3 className="text-2xl font-black tracking-tight mb-2">Eksplorasi Interface</h3>
          <p className="text-purple-100 text-sm leading-relaxed">
            Klik menu di bawah untuk lihat bahagian mana yang akan "menyala" (glow) dalam Designer.
          </p>
        </div>

        <div className="space-y-3">
          {INTERFACE_PARTS.map(part => (
            <button
              key={part.id}
              onClick={() => setActivePart(part)}
              className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center gap-4 ${
                activePart.id === part.id 
                ? 'bg-white border-purple-500 shadow-xl scale-[1.03]' 
                : 'bg-white border-slate-50 hover:border-slate-200 opacity-80 hover:opacity-100'
              }`}
            >
              <div className={`p-3 rounded-xl transition-all ${activePart.id === part.id ? 'bg-purple-600 text-white shadow-lg rotate-3' : 'bg-slate-100 text-slate-500'}`}>
                {getIcon(part.icon)}
              </div>
              <div className="flex-1">
                <h4 className={`font-black uppercase text-xs tracking-widest ${activePart.id === part.id ? 'text-purple-600' : 'text-slate-800'}`}>{part.name}</h4>
                <p className="text-xs text-slate-500 mt-1 leading-snug">{part.description}</p>
              </div>
              {activePart.id === part.id && (
                <div className="w-2 h-2 rounded-full bg-purple-500 animate-ping" />
              )}
            </button>
          ))}
        </div>

        <div className="p-4 bg-slate-900 rounded-2xl text-white/70 text-[10px] font-medium leading-relaxed italic">
          "Tips: Properties adalah tempat anda mengubah suai rupa komponen, seperti menukar warna latar belakang atau saiz teks."
        </div>
      </div>
    </div>
  );
};

export default InterfaceGuide;
