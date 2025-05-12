"use client";

import { useEffect, useState } from "react";
import Header from "../_componentes/Header";
import Footer from "../_componentes/Footer";
import PontoCard from "../_componentes/PontoCard";
import Link from "next/link";

export default function PontosPage() {
    const [pontos, setPontos] = useState([]);
    const [busca, setBusca] = useState("");
    const [filtroLinhas, setFiltroLinhas] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch("/pontos-exemplo.json")
            .then((res) => res.json())
            .then((data) => {
                setPontos(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Erro ao carregar pontos:", error);
                setIsLoading(false);
            });
    }, []);

    const pontosFiltrados = pontos.filter(
        (ponto) =>
            (ponto.nome?.toLowerCase().includes(busca.toLowerCase()) ||
                ponto.endereco?.toLowerCase().includes(busca.toLowerCase())) &&
            (filtroLinhas === "" || (filtroLinhas && ponto.linhas.includes(parseInt(filtroLinhas))))
    );

    // Extrair todas as linhas únicas para o filtro
    const todasLinhas = [...new Set(pontos.flatMap(ponto => ponto.linhas))].sort((a, b) => a - b);

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-grow container-custom py-8">
                {/* Header da página */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-primary-dark mb-2">
                        Pontos de Ônibus em São Luís
                    </h1>
                    <p className="text-[#666666] max-w-3xl">
                        Encontre informações sobre os pontos de ônibus em São Luís, incluindo estrutura disponível
                        e linhas que passam por cada ponto. Utilize os filtros abaixo para facilitar sua busca.
                    </p>
                </div>

                {/* Filtros */}
                <div className="bg-white p-6 rounded-xl shadow-md mb-8">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <label htmlFor="busca" className="block text-sm font-medium text-[#666666] mb-1">
                                Buscar por nome ou endereço
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="busca"
                                    value={busca}
                                    onChange={(e) => setBusca(e.target.value)}
                                    placeholder="Ex: Terminal, Centro, Cohama..."
                                    className="w-full p-3 pl-10 rounded-lg border border-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                />
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>

                        <div className="md:w-64">
                            <label htmlFor="linha" className="block text-sm font-medium text-[#666666] mb-1">
                                Filtrar por linha
                            </label>
                            <select
                                id="linha"
                                value={filtroLinhas}
                                onChange={(e) => setFiltroLinhas(e.target.value)}
                                className="w-full p-3 rounded-lg border border-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            >
                                <option value="">Todas as linhas</option>
                                {todasLinhas.map(linha => (
                                    <option key={linha} value={linha}>{linha}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Resultados */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-primary-dark">Pontos Disponíveis</h2>
                        {(busca || filtroLinhas) && (
                            <span className="text-sm text-[#666666]">
                                {pontosFiltrados.length} resultados encontrados
                            </span>
                        )}
                    </div>

                    {isLoading ? (
                        <div className="text-center py-16">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                            <p className="mt-4 text-[#666666]">Carregando pontos...</p>
                        </div>
                    ) : pontosFiltrados.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {pontosFiltrados.map((ponto) => (
                                <PontoCard key={ponto.id} ponto={ponto} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10 bg-gray-50 rounded-lg border border-gray-200">
                            <p className="text-gray-500 mb-2">
                                Nenhum ponto encontrado com esses termos.
                            </p>
                            <button
                                onClick={() => {
                                    setBusca("");
                                    setFiltroLinhas("");
                                }}
                                className="border border-primary text-primary font-medium px-4 py-2 rounded-lg hover:bg-primary/5 transition-colors"
                            >
                                Limpar filtros
                            </button>
                        </div>
                    )}
                </div>

                
            </main>

            <Footer />
        </div>
    );
} 