import React from 'react';
import { 
  LogOut, 
  User, 
  Calendar, 
  TrendingUp, 
  FileText, 
  Award, 
  BookOpen,
  Mail,
  MapPin,
  Phone
} from 'lucide-react';
import GradeChart from './GradeChart';
import { StudentData } from '../data/students';

interface DashboardProps {
  student: StudentData;
  onLogout: () => void;
}

export default function Dashboard({ student, onLogout }: DashboardProps) {
  // Aggregate semester averages for the chart
  const semesterAverages = [0, 1, 2, 3, 4].map(idx => {
    let sum = 0;
    student.subjects.forEach(sub => sum += sub.scores[idx]);
    return {
      name: `Sms ${idx + 1}`,
      nilai: Math.round(sum / student.subjects.length)
    };
  });

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Header / Navbar */}
      <nav className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1e3a8a] text-white font-bold">
                <BookOpen size={24} />
              </div>
              <div>
                <h1 className="text-lg font-bold text-[#1e3a8a]">SIAS SPEGA</h1>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Academic Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="hidden md:block text-right">
                <p className="text-sm font-semibold text-slate-900">{student.name}</p>
                <p className="text-xs text-slate-500">NISN: {student.nisn}</p>
              </div>
              <button 
                onClick={onLogout}
                className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600 transition-all hover:bg-red-50 hover:text-red-600 shadow-sm"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Keluar</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
        {/* Profile Section */}
        <div className="mb-8 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
          <div className="h-32 bg-[#1e3a8a] overflow-hidden relative">
            <div className="absolute inset-0 opacity-10">
              <svg width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>
          </div>
          <div className="relative px-6 pb-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-end gap-6 -mt-12 sm:-mt-16 mb-6">
              <div className="h-24 w-24 sm:h-32 sm:w-32 overflow-hidden rounded-2xl border-4 border-white bg-slate-200 shadow-md">
                <img 
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${student.name}`} 
                  alt="Profile" 
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1 pb-2 text-center sm:text-left">
                <h2 className="text-2xl font-bold text-slate-900">{student.name}</h2>
                <div className="mt-1 flex flex-wrap justify-center sm:justify-start items-center gap-4 text-sm text-slate-500 font-medium">
                  <span className="flex items-center gap-1.5">
                    <User size={14} /> Kelas {student.kelas}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Award size={14} /> NISN: {student.nisn}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} /> TP 2023/2024
                  </span>
                </div>
              </div>
              <div className="pb-2">
                <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700 ring-1 ring-inset ring-green-600/20 shadow-sm uppercase tracking-wider">
                  STATUS: LULUS
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column: Progress & Summary */}
          <div className="lg:col-span-1 space-y-8">
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-500">
                  <TrendingUp size={16} /> Grafik Perkembangan
                </h3>
              </div>
              <GradeChart data={semesterAverages} />
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 border-l-4 border-blue-600">
              <h3 className="mb-6 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-500">
                <Award size={16} /> Rekapitulasi Nilai
              </h3>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Rata-rata Akhir</p>
                    <p className="mt-1 text-2xl font-black text-[#1e3a8a]">{student.totalAverage.toFixed(2)}</p>
                  </div>
                  <div className="rounded-xl bg-green-50 p-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-green-600 opacity-60">Status Akhir</p>
                    <p className="mt-1 text-lg font-black text-green-700">LULUS</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Rata-rata Per Semester</p>
                  {semesterAverages.map((avg, idx) => (
                    <div key={idx} className="flex items-center justify-between border-b border-slate-100 pb-2 last:border-0 last:pb-0">
                      <span className="text-xs font-bold text-slate-600">Semester {idx + 1}</span>
                      <span className="text-xs font-black text-[#1e3a8a]">{avg.nilai.toFixed(1)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Table */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 overflow-hidden">
              <div className="border-b border-slate-200 bg-slate-50/50 p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-500">
                    <FileText size={16} /> Transkrip Nilai (5 Semester)
                  </h3>
                  <div className="flex gap-2">
                    <button className="inline-flex h-8 items-center justify-center rounded bg-white px-3 text-[10px] font-bold uppercase tracking-widest text-[#1e3a8a] border border-slate-200 hover:bg-slate-50 shadow-sm transition-all active:scale-95">
                      Cetak Raport
                    </button>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50/50 text-[11px] font-bold uppercase tracking-widest text-slate-500">
                      <th className="px-6 py-4">Mata Pelajaran</th>
                      <th className="px-4 py-4 text-center">S1</th>
                      <th className="px-4 py-4 text-center">S2</th>
                      <th className="px-4 py-4 text-center">S3</th>
                      <th className="px-4 py-4 text-center">S4</th>
                      <th className="px-4 py-4 text-center">S5</th>
                      <th className="px-6 py-4 text-center">Rata²</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {student.subjects.map((sub, idx) => (
                      <tr key={idx} className="group hover:bg-blue-50/30 transition-colors">
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-slate-900 group-hover:text-blue-900 transition-colors">{sub.name}</span>
                            <span className="text-[10px] font-medium text-slate-400">{sub.code}</span>
                          </div>
                        </td>
                        {sub.scores.map((score, sIdx) => (
                          <td key={sIdx} className="px-4 py-4 text-center">
                            <span className={`text-xs font-bold ${score >= 75 ? 'text-slate-900' : 'text-amber-600'}`}>
                              {score}
                            </span>
                          </td>
                        ))}
                        <td className="px-6 py-4 text-center">
                          <span className="rounded-lg bg-blue-50 px-2 py-1 text-xs font-black text-[#1e3a8a]">
                            {sub.average.toFixed(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="border-t border-slate-100 bg-slate-50/30 p-6">
                <div className="flex flex-wrap items-center justify-between gap-6">
                  <div className="flex items-center gap-6">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Total Rata-rata</span>
                      <span className="text-xl font-black text-slate-900">{student.totalAverage.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-medium text-slate-500 italic">
                    * Data nilai terverifikasi secara digital oleh UPT SMPN 2 Gandusari.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-slate-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 whitespace-nowrap">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded bg-[#1e3a8a] text-white">
                  <BookOpen size={16} />
                </div>
                <h4 className="font-bold text-[#1e3a8a]">UPT SMPN 2 GANDUSARI</h4>
              </div>
              <p className="text-xs leading-relaxed text-slate-500">
                Pendidikan berkualitas untuk masa depan gemilang.
              </p>
            </div>
            
            <div className="space-y-4">
              <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Kontak Sekolah</h5>
              <div className="space-y-2 text-xs text-slate-600">
                <p className="flex items-center gap-2"><Phone size={12} /> (0342) 123456</p>
                <p className="flex items-center gap-2"><Mail size={12} /> info@spega2gandusari.sch.id</p>
                <p className="flex items-center gap-2"><MapPin size={12} /> Kec. Gandusari, Kab. Blitar</p>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-slate-100 pt-8 text-center text-[10px] font-bold uppercase tracking-widest text-slate-400">
            © {new Date().getFullYear()} SIAS SPEGA
          </div>
        </div>
      </footer>
    </div>
  );
}
