import Image from "next/image";

export default function Apresent() {
  return (
    <section className="max-w-screen-lg mx-auto px-8 py-20 bg-gray-50">
      <div className="flex flex-col items-center text-center lg:flex-row lg:text-left lg:justify-between gap-16">
        {/* Texto principal */}
        <div className="max-w-xl lg:w-1/2">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
            grátis. divertido. eficaz.
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            Aprender com o Duolingo é{" "}
            <span className="text-green-600 font-semibold">divertido</span>, e{" "}
            <a
              className="text-green-600 hover:text-green-700 transition-colors duration-200 underline"
              href="/efficacy"
            >
              pesquisas comprovam que funciona mesmo
            </a>
            ! Com lições rápidas e curtinhas, você ganha pontos e desbloqueia
            novos níveis enquanto aprende como se comunicar na vida real.
          </p>

          {/* Estatísticas simples */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">500M+</div>
              <div className="text-sm text-gray-600">Usuários ativos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">40+</div>
              <div className="text-sm text-gray-600">Idiomas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">95%</div>
              <div className="text-sm text-gray-600">Taxa de sucesso</div>
            </div>
          </div>
        </div>

        {/* Imagem */}
        <div className="relative w-72 h-72 lg:w-[400px] lg:h-[400px]">
          <Image
            alt="Duolingo Mascote"
            src="https://d35aaqx5ub95lt.cloudfront.net/images/splash/lottie/23ab11cb1e1a9aff54facdf57833373d.svg"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}
