import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Lock, User, Info, AlertCircle } from 'lucide-react';
import { findStudent, StudentData } from '../data/students';

interface LoginProps {
  onLogin: (student: StudentData) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [name, setName] = useState('');
  const [nisn, setNisn] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const student = findStudent(name, nisn);
    if (student) {
      onLogin(student);
    } else {
      setError('Data tidak ditemukan. Pastikan Nama (2 kata awal) dan NISN sesuai dengan database.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl">
        <div className="bg-[#1e3a8a] p-8 text-center text-white">
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
              <GraduationCap size={32} />
            </div>
          </div>
          <h1 className="text-xl font-bold tracking-tight uppercase">Portal Nilai SPEGA</h1>
          <p className="mt-2 text-sm text-blue-100 opacity-90 font-medium">
            Selamat Datang di Portal Nilai SPEGA<br />
            UPT SMP Negeri 2 Gandusari
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 flex items-start gap-3 rounded-lg bg-red-50 p-4 text-xs text-red-700 border border-red-100"
            >
              <AlertCircle size={16} className="shrink-0" />
              <p>{error}</p>
            </motion.div>
          )}

          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                Nama (2 Kata Awal)
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: ADE TIARA"
                  className="block w-full rounded-lg border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="nisn" className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                NISN
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  id="nisn"
                  value={nisn}
                  onChange={(e) => setNisn(e.target.value)}
                  placeholder="Masukkan NISN Anda"
                  className="block w-full rounded-lg border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-lg bg-[#1e3a8a] py-4 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-[#1e40af] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-[0.98] shadow-lg shadow-blue-900/20"
            >
              Lihat Nilai
            </button>
          </div>

          <div className="mt-8 flex items-start gap-3 rounded-lg bg-blue-50 p-4 text-xs text-blue-700">
            <Info size={16} className="mt-0.5 shrink-0" />
            <p className="leading-relaxed">
              <strong>Bantuan:</strong> Gunakan Nama Lengkap (maksimum 2 kata pertama) dan Nomor Induk Siswa Nasional (NISN) Anda yang terdaftar.
            </p>
          </div>
        </form>

        <div className="bg-slate-50 p-4 text-center text-[10px] uppercase tracking-widest text-slate-400">
          © {new Date().getFullYear()} UPT SMPN 2 GANDUSARI
        </div>
      </div>
    </div>
  );
}
