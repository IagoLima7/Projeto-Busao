"use client";

import { useEffect, useState } from "react";
import Header from "../_componentes/Header";
import Footer from "../_componentes/Footer";
import LinhaCard from "../_componentes/LinhaCard";
import Link from "next/link";

export default function LinhasPage() {
  const [linhas, setLinhas] = useState([]);
  const [busca, setBusca] = useState("");
  const [filtroSentido, setFiltroSentido] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/linha-exemplo.json")
      .then((res) => res.json())
      .then((data) => {
        setLinhas(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Erro ao carregar linhas:", error);
        setIsLoading(false);
      });
  }, []);

  const linhasFiltradas = linhas.filter(
    (linha) =>
      (linha.numero?.toLowerCase().includes(busca.toLowerCase()) ||
        linha.nome?.toLowerCase().includes(busca.toLowerCase()) ||
        linha.destino?.toLowerCase().includes(busca.toLowerCase())) &&
      (filtroSentido === "" || linha.sentido === filtroSentido)
  );

  const sentidos = [...new Set(linhas.map(linha => linha.sentido))];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container-custom py-8">
        {/* Header da página */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary-dark mb-2">
            Linhas de Ônibus em São Luís
          </h1>
          <p className="text-[#666666] max-w-3xl">
            Encontre informações detalhadas sobre todas as linhas de ônibus que operam em São Luís, incluindo horários,
            trajetos e pontos de parada. Utilize os filtros abaixo para encontrar a linha que você precisa.
          </p>
        </div>

        {/* Filtros */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="busca" className="block text-sm font-medium text-[#666666] mb-1">
                Buscar por número, nome ou destino
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="busca"
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  placeholder="Ex: 101, Centro, Cohab..."
                  className="w-full p-3 pl-10 rounded-lg border border-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            <div className="md:w-64">
              <label htmlFor="sentido" className="block text-sm font-medium text-[#666666] mb-1">
                Filtrar por sentido
              </label>
              <select
                id="sentido"
                value={filtroSentido}
                onChange={(e) => setFiltroSentido(e.target.value)}
                className="w-full p-3 rounded-lg border border-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Todos os sentidos</option>
                {sentidos.map(sentido => (
                  <option key={sentido} value={sentido}>{sentido}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Resultados */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-primary-dark">Linhas Disponíveis</h2>
            {(busca || filtroSentido) && (
              <span className="text-sm text-[#666666]">
                {linhasFiltradas.length} resultados encontrados
              </span>
            )}
          </div>

          {isLoading ? (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              <p className="mt-4 text-[#666666]">Carregando linhas...</p>
            </div>
          ) : linhasFiltradas.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {linhasFiltradas.map((linha) => (
                <LinhaCard key={linha.id} linha={linha} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-gray-500 mb-2">
                Nenhuma linha encontrada com esses termos.
              </p>
              <button
                onClick={() => {
                  setBusca("");
                  setFiltroSentido("");
                }}
                className="border border-primary text-primary font-medium px-4 py-2 rounded-lg hover:bg-primary/5 transition-colors"
              >
                Limpar filtros
              </button>
            </div>
          )}
        </div>

        {/* CTA Banner */}
        <div className="bg-primary/10 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold text-primary-dark mb-2">Não encontrou o que procurava?</h3>
            <p className="text-[#666666]">
              Entre em contato com o MOB Maranhão para mais informações sobre as linhas de ônibus.
            </p>
          </div>
          <Link
            href="https://mob.ma.gov.br/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary hover:bg-primary-dark text-white font-medium px-6 py-3 rounded-lg transition-colors"
          >
            Visitar MOB Maranhão
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
