"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "../../_componentes/Header";
import Footer from "../../_componentes/Footer";
import { useParams } from "next/navigation";

export default function PontoDetalhes() {
    const params = useParams();
    const [ponto, setPonto] = useState(null);
    const [linhasRelacionadas, setLinhasRelacionadas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Carregar dados do ponto
        fetch("/pontos-exemplo.json")
            .then((res) => res.json())
            .then((data) => {
                const pontoEncontrado = data.find(p => p.id === parseInt(params.id));
                setPonto(pontoEncontrado);

                // Após encontrar o ponto, carregar as linhas relacionadas
                if (pontoEncontrado) {
                    fetch("/linha-exemplo.json")
                        .then((res) => res.json())
                        .then((linhasData) => {
                            const linhas = linhasData.filter(l => pontoEncontrado.linhas.includes(parseInt(l.numero)));
                            setLinhasRelacionadas(linhas);
                            setIsLoading(false);
                        })
                        .catch(error => {
                            console.error("Erro ao carregar linhas relacionadas:", error);
                            setIsLoading(false);
                        });
                } else {
                    setIsLoading(false);
                }
            })
            .catch(error => {
                console.error("Erro ao carregar detalhes do ponto:", error);
                setIsLoading(false);
            });
    }, [params.id]);

    // Função para renderizar os detalhes da estrutura do ponto
    const renderEstruturaDetalhes = () => {
        if (!ponto) return null;

        const estruturaItens = [
            { label: "Cobertura", value: ponto.estrutura.cobertura },
            { label: "Assento", value: ponto.estrutura.assento },
            { label: "Acessibilidade", value: ponto.estrutura.acessibilidade },
            { label: "Iluminação", value: ponto.estrutura.iluminacao },
            { label: "Painel Informativo", value: ponto.estrutura.painel }
        ];

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {estruturaItens.map((item, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="flex items-center justify-between">
                            <span className="font-medium text-[#333333]">{item.label}</span>
                            {item.value ? (
                                <span className="text-green-600 bg-green-100 px-2 py-1 rounded-full text-xs font-medium">
                                    Disponível
                                </span>
                            ) : (
                                <span className="text-red-600 bg-red-100 px-2 py-1 rounded-full text-xs font-medium">
                                    Indisponível
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-grow container-custom py-8">
                <div className="mb-4">
                    <Link href="/pontos" className="text-primary hover:underline flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Voltar para pontos
                    </Link>
                </div>

                {isLoading ? (
                    <div className="text-center py-16">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                        <p className="mt-4 text-[#666666]">Carregando detalhes do ponto...</p>
                    </div>
                ) : ponto ? (
                    <div>
                        <div className="bg-white rounded-xl overflow-hidden shadow-md mb-8">
                            <div className="p-6">
                                <h1 className="text-3xl font-bold text-primary-dark mb-4">{ponto.nome}</h1>

                                <div className="flex flex-col md:flex-row mb-6">
                                    <div className="flex items-start mb-4 md:mb-0 md:mr-8">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#666666] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <div>
                                            <span className="font-medium">Endereço</span>
                                            <p className="text-[#666666]">{ponto.endereco}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#666666] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                        <div>
                                            <span className="font-medium">Coordenadas</span>
                                            <p className="text-[#666666]">
                                                {ponto.coordenadas.latitude}, {ponto.coordenadas.longitude}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Seção de estrutura */}
                        <h2 className="text-2xl font-bold text-[#333333] mb-4">Estrutura do Ponto</h2>
                        <div className="bg-gray-50 p-6 rounded-xl mb-8">
                            {renderEstruturaDetalhes()}
                        </div>

                        {/* Seção de mapa */}
                        <h2 className="text-2xl font-bold text-[#333333] mb-4">Localização</h2>
                        <div className="bg-white rounded-xl overflow-hidden shadow-md p-6 mb-8">
                            <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center mb-4">
                                <p className="text-gray-500">Mapa de localização estará disponível em breve.</p>
                            </div>
                            <p className="text-[#666666] text-sm">
                                As coordenadas exatas deste ponto de ônibus são: {ponto.coordenadas.latitude}, {ponto.coordenadas.longitude}.
                                Em breve disponibilizaremos um mapa interativo para facilitar sua localização.
                            </p>
                        </div>

                        {/* Seção de linhas que passam pelo ponto */}
                        <h2 className="text-2xl font-bold text-[#333333] mb-4">Linhas que passam por este ponto</h2>
                        {linhasRelacionadas.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                {linhasRelacionadas.map(linha => (
                                    <Link key={linha.id} href={`/linhas/${linha.id}`}>
                                        <div className={`rounded-lg overflow-hidden border-l-4 border-${linha.cor}-600 bg-white shadow-md p-4 hover:shadow-lg transition-shadow`}>
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <span className={`inline-block font-bold text-sm px-2 py-0.5 rounded-full bg-${linha.cor}-600 text-white mb-1`}>
                                                        {linha.numero}
                                                    </span>
                                                    <h3 className="font-semibold text-[#333333]">{linha.nome}</h3>
                                                </div>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-xl p-6 text-center mb-8">
                                <p className="text-[#666666]">
                                    Não foi possível encontrar as linhas que passam por este ponto.
                                </p>
                            </div>
                        )}

                        {/* CTA para feedback */}
                        <div className="bg-primary/10 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-primary-dark mb-2">Encontrou um problema neste ponto?</h3>
                            <p className="text-[#666666] mb-4">
                                Ajude a melhorar o transporte público informando sobre problemas neste ponto de ônibus.
                            </p>
                            <Link
                                href="#"
                                className="inline-block bg-primary hover:bg-primary-dark text-white font-medium px-6 py-3 rounded-lg transition-colors"
                            >
                                Reportar Problema
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-10 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-gray-500 mb-2">
                            Ponto não encontrado.
                        </p>
                        <Link
                            href="/pontos"
                            className="border border-primary text-primary font-medium px-4 py-2 rounded-lg hover:bg-primary/5 transition-colors"
                        >
                            Voltar para lista de pontos
                        </Link>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
} 