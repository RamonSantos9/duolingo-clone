import Image from "next/image";

export default function Apresent() {
  return (
    <section className="max-w-screen-lg mx-auto px-4 py-8">
      <div className="flex flex-col items-center text-center lg:flex-row lg:text-left lg:justify-between">
        {/* Texto principal */}
        <div className="max-w-xl lg:w-1/2">
          <h2 className="text-[48px] font-black text-[#58CC02] leading-tight">
            grátis. divertido. eficaz.
          </h2>
          <p className="mt-4 text-lg font-bold text-black/60 leading-tight">
            Aprender com o Duolingo é divertido, e{" "}
            <a className="text-[#1cb0f6] leading-tight" href="/efficacy">
              pesquisas comprovam que funciona mesmo
            </a>
            ! Com lições rápidas e curtinhas, você ganha pontos e desbloqueia
            novos níveis enquanto aprende como se comunicar na vida real.
          </p>
        </div>

        {/* Imagem */}
        <div className="mt-6 relative w-72 h-72 lg:w-[500px] lg:h-[500px] lg:-mr-12">
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
