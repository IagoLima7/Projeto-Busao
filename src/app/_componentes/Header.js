export default function Header() {
  return (
    <header className="bg-blue-600 text-white py-4 shadow-md">
      <div className="max-w-5xl mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Vai de Busão</h1>
        <nav>
          <a href="#" className="ml-4 hover:underline">
            Início
          </a>
          <a href="#" className="ml-4 hover:underline">
            Linhas
          </a>
          <a href="#" className="ml-4 hover:underline">
            Sobre
          </a>
        </nav>
      </div>
    </header>
  );
}
