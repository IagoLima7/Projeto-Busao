import Link from "next/link";

export default function LinhaCard({ linha }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
      <h3 className="text-xl font-semibold">{linha.nome}</h3>
      <p className="text-gray-600">Destino: {linha.destino}</p>
      <p className="text-gray-600">Próximo horário: {linha.horario}</p>
    </div>
  );
}
