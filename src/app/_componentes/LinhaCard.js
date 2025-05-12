"use client";

import Link from "next/link";

export default function LinhaCard({ linha }) {
  // Função para definir as classes do Tailwind baseadas na cor da linha
  const getColorClasses = (color) => {
    const colors = {
      blue: {
        border: "border-primary",
        bg: "bg-primary-lightest",
        text: "text-primary-dark",
        badge: "bg-primary text-white"
      },
      green: {
        border: "border-green-700",
        bg: "bg-green-100",
        text: "text-green-800",
        badge: "bg-green-600 text-white"
      },
      red: {
        border: "border-red-700",
        bg: "bg-red-100",
        text: "text-red-800",
        badge: "bg-red-600 text-white"
      },
      purple: {
        border: "border-purple-700",
        bg: "bg-purple-100",
        text: "text-purple-800",
        badge: "bg-purple-600 text-white"
      },
      orange: {
        border: "border-orange-700",
        bg: "bg-orange-100",
        text: "text-orange-800",
        badge: "bg-orange-600 text-white"
      },
      teal: {
        border: "border-teal-700",
        bg: "bg-teal-100",
        text: "text-teal-800",
        badge: "bg-teal-600 text-white"
      },
      default: {
        border: "border-primary",
        bg: "bg-primary-lightest",
        text: "text-primary-dark",
        badge: "bg-primary text-white"
      }
    };

    return colors[color] || colors.default;
  };

  const colorClasses = getColorClasses(linha.cor);

  return (
    <div className={`card hover:shadow-lg transition duration-300 border-l-4 ${colorClasses.border}`}>
      <div className="p-5">
        <div className="flex justify-between items-center mb-3">
          <span className={`font-bold text-sm px-3 py-1 rounded-full ${colorClasses.badge}`}>
            {linha.numero}
          </span>
          <span className="text-sm font-medium text-[#333333]">
            {linha.passagem}
          </span>
        </div>

        <h3 className={`text-xl font-bold mb-2 ${colorClasses.text}`}>{linha.nome}</h3>

        <div className="space-y-2 text-sm">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1.5 text-[#666666]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-[#666666]">Sentido: {linha.sentido}</span>
          </div>

          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1.5 text-[#666666]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-[#666666]">Horário: {linha.horario}</span>
          </div>

          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1.5 text-[#666666]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            <span className="text-[#666666]">Intervalo: {linha.intervalo}</span>
          </div>

          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1.5 text-[#666666]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <span className="text-[#666666]">{linha.pontos} pontos</span>
          </div>
        </div>
      </div>

      <div className="px-5 py-3 border-t border-gray-100 flex justify-between items-center bg-black/[0.02]">
        <span className="text-xs text-[#666666]">Última atualização: hoje</span>
        <Link href={`/linhas/${linha.id}`} className={`text-sm font-medium transition-colors hover:underline ${colorClasses.text}`}>
          Ver detalhes →
        </Link>
      </div>
    </div>
  );
}
