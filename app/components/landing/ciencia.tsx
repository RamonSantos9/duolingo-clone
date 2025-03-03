import Image from "next/image";

export default function Ciencia() {
  return (
    <section className="max-w-screen-lg mx-auto px-4 py-8 flex flex-col lg:flex-row items-center">
      {/* Imagem à esquerda com dimensões fixas de 550x550 e deslocada para a esquerda */}
      <div className="relative w-[500px] h-[500px] lg:-ml-32">
        <Image
          alt="Duolingo Mascote"
          src="https://d35aaqx5ub95lt.cloudfront.net/images/splash/lottie/08ec8d0260c55c054e1b97bcbc96ea0f.svg"
          width={500}
          height={500}
          priority
          className="object-contain"
        />
      </div>

      {/* Texto à direita com largura limitada */}
      <div className="mt-6 lg:mt-0 lg:ml-16 flex flex-col items-center lg:items-start text-center lg:text-left flex-none max-w-md leading-tight">
        <h2 className="text-[48px] font-black text-[#58CC02]">
          baseado na ciência
        </h2>
        <p className="mt-2 text-lg font-bold text-black/60 leading-tight">
          Combinamos metodologias aprovadas pela ciência com um conteúdo
          encantador para criar cursos eficazes que ensinam leitura, escrita,
          escuta e fala!
        </p>
      </div>
    </section>
  );
}
