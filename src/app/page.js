"use client";

import Header from "./_componentes/Header";
import Footer from "./_componentes/Footer";
import LinhaCard from "./_componentes/LinhaCard";
import { useEffect, useState } from "react";

export default function Home() {
  const [linhas, setLinhas] = useState([]);

  useEffect(() => {
    fetch("/linha-exemplo.json")
      .then((res) => res.json())
      .then((data) => setLinhas(data));
  }, []);

  return (
    <>
      <Header />

      <main className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4 text-center">
          Encontre sua linha de ônibus
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Consulte horários, rotas e pontos em tempo real.
        </p>

        <input
          type="text"
          placeholder="Buscar por linha ou destino..."
          className="w-full p-3 rounded-md border border-gray-300 mb-6 focus:outline-none focus:ring focus:ring-blue-300"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {linhas.map((linha) => (
            <LinhaCard key={linha.id} linha={linha} />
          ))}
        </div>

        <section className="mt-16 text-center">
          <h2 className="text-2xl font-semibold mb-4">Como funciona?</h2>
          <p className="text-gray-700">
            Acesse as linhas disponíveis, veja os horários atualizados e
            descubra os pontos mais próximos. Tudo rápido e fácil.
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}
