"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "../../_componentes/Header";
import Footer from "../../_componentes/Footer";
import { useParams } from "next/navigation";

export default function LinhasDetalhePage() {
    const params = useParams();
    const [linha, setLinha] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch("/linha-exemplo.json")
            .then((res) => res.json())
            .then((data) => {
                const linhaEncontrada = data.find(l => l.id === parseInt(params.id));
                setLinha(linhaEncontrada);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Erro ao carregar detalhes da linha:", error);
                setIsLoading(false);
            });
    }, [params.id]);

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

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-grow container-custom py-8">
                <div className="mb-4">
                    <Link href="/" className="text-primary hover:underline flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Voltar para linhas
                    </Link>
                </div>

                {isLoading ? (
                    <div className="text-center py-16">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                        <p className="mt-4 text-[#666666]">Carregando detalhes da linha...</p>
                    </div>
                ) : linha ? (
                    <div>
                        <div className={`rounded-xl overflow-hidden border-l-4 ${getColorClasses(linha.cor).border} bg-white shadow-md mb-8`}>
                            <div className="p-6">
                                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
                                    <div>
                                        <span className={`mb-4 inline-block font-bold text-sm px-3 py-1 rounded-full ${getColorClasses(linha.cor).badge}`}>
                                            {linha.numero}
                                        </span>
                                        <h1 className={`text-3xl font-bold ${getColorClasses(linha.cor).text}`}>{linha.nome}</h1>
                                    </div>
                                    <div className="mt-4 md:mt-0">
                                        <span className="font-medium text-lg text-[#333333]">
                                            Passagem: {linha.passagem}
                                        </span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                                    <div className={`p-4 rounded-lg ${getColorClasses(linha.cor).bg}`}>
                                        <div className="flex items-center mb-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#666666]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <span className="font-semibold">Sentido</span>
                                        </div>
                                        <p className="ml-7 text-[#333333]">{linha.sentido}</p>
                                    </div>

                                    <div className={`p-4 rounded-lg ${getColorClasses(linha.cor).bg}`}>
                                        <div className="flex items-center mb-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#666666]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="font-semibold">Horário</span>
                                        </div>
                                        <p className="ml-7 text-[#333333]">{linha.horario}</p>
                                    </div>

                                    <div className={`p-4 rounded-lg ${getColorClasses(linha.cor).bg}`}>
                                        <div className="flex items-center mb-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#666666]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                            <span className="font-semibold">Intervalo</span>
                                        </div>
                                        <p className="ml-7 text-[#333333]">{linha.intervalo}</p>
                                    </div>

                                    <div className={`p-4 rounded-lg ${getColorClasses(linha.cor).bg}`}>
                                        <div className="flex items-center mb-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#666666]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                            </svg>
                                            <span className="font-semibold">Pontos</span>
                                        </div>
                                        <p className="ml-7 text-[#333333]">{linha.pontos} paradas</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Seção de mapa */}
                        <h2 className="text-2xl font-bold text-[#333333] mb-4">Mapa e Trajeto</h2>
                        <div className="bg-white rounded-xl overflow-hidden shadow-md p-6 mb-8">
                            <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center mb-6">
                                <p className="text-gray-500">Mapa do trajeto da linha {linha.numero} estará disponível em breve.</p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-3">Pontos Principais</h3>
                                <div className="space-y-3">
                                    <div className="flex items-start">
                                        <div className="bg-green-500 rounded-full w-3 h-3 mt-1.5 mr-3"></div>
                                        <div>
                                            <p className="font-medium">Ponto Inicial</p>
                                            <p className="text-[#666666] text-sm">Terminal {linha.sentido === "Centro" ? linha.nome.split('/')[0].trim() : linha.nome.split('/')[1].trim()}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="bg-red-500 rounded-full w-3 h-3 mt-1.5 mr-3"></div>
                                        <div>
                                            <p className="font-medium">Ponto Final</p>
                                            <p className="text-[#666666] text-sm">Terminal {linha.sentido === "Centro" ? linha.nome.split('/')[1].trim() : linha.nome.split('/')[0].trim()}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Seção de horários */}
                        <h2 className="text-2xl font-bold text-[#333333] mb-4">Horários</h2>
                        <div className="bg-white rounded-xl overflow-hidden shadow-md p-6 mb-8">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-lg font-semibold mb-3">Dias Úteis</h3>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full border-collapse">
                                            <thead>
                                                <tr className="border-b">
                                                    <th className="text-left py-3 px-4 font-semibold text-sm text-[#666666]">Horário</th>
                                                    <th className="text-left py-3 px-4 font-semibold text-sm text-[#666666]">Saída</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {[5, 6, 7, 8, 9, 10].map(hora => (
                                                    <tr key={hora} className="border-b hover:bg-gray-50">
                                                        <td className="py-2 px-4">{`${hora.toString().padStart(2, '0')}:00`}</td>
                                                        <td className="py-2 px-4">Terminal {linha.sentido === "Centro" ? linha.nome.split('/')[0].trim() : linha.nome.split('/')[1].trim()}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold mb-3">Sábados, Domingos e Feriados</h3>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full border-collapse">
                                            <thead>
                                                <tr className="border-b">
                                                    <th className="text-left py-3 px-4 font-semibold text-sm text-[#666666]">Horário</th>
                                                    <th className="text-left py-3 px-4 font-semibold text-sm text-[#666666]">Saída</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {[6, 7, 8, 9, 10, 11].map(hora => (
                                                    <tr key={hora} className="border-b hover:bg-gray-50">
                                                        <td className="py-2 px-4">{`${hora.toString().padStart(2, '0')}:00`}</td>
                                                        <td className="py-2 px-4">Terminal {linha.sentido === "Centro" ? linha.nome.split('/')[0].trim() : linha.nome.split('/')[1].trim()}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-10 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-gray-500 mb-2">
                            Linha não encontrada.
                        </p>
                        <Link
                            href="/"
                            className="border border-primary text-primary font-medium px-4 py-2 rounded-lg hover:bg-primary/5 transition-colors"
                        >
                            Voltar para página inicial
                        </Link>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
} 