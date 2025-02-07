import React from 'react';
import { CircularProgress } from '@mui/material';

export default function LoaderData() {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-4 p-8 rounded-xl bg-white/10">
        <CircularProgress size={48} className="text-white" />
        <span className="text-white/90 text-sm font-medium">Завантаження...</span>
      </div>
    </div>
  );
} 