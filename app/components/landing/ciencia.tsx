import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Ciencia() {
  return (
    <section className="max-w-screen-lg mx-auto px-8 py-20 bg-white">
      <div className="flex flex-col lg:flex-row items-center gap-16">
        {/* Imagem */}
        <div className="relative w-[400px] h-[400px]">
          <Image
            alt="Duolingo Mascote"
            src="https://d35aaqx5ub95lt.cloudfront.net/images/splash/lottie/08ec8d0260c55c054e1b97bcbc96ea0f.svg"
            width={400}
            height={400}
            priority
            className="object-contain"
          />
        </div>

        {/* Texto */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left flex-none max-w-md">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            baseado na ciência
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            Combinamos{" "}
            <span className="text-green-600 font-semibold">
              metodologias aprovadas pela ciência
            </span>{" "}
            com um conteúdo encantador para criar cursos eficazes que ensinam{" "}
            <span className="text-green-600 font-semibold">
              leitura, escrita, escuta e fala
            </span>
            .
          </p>

          {/* Benefícios */}
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              <span className="text-sm text-gray-700">Repetição espaçada</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              <span className="text-sm text-gray-700">
                Aprendizado adaptativo
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              <span className="text-sm text-gray-700">Gamificação eficaz</span>
            </div>
          </div>

          {/* CTA */}
          <Button variant="secondary" size="lg">
            Saiba mais sobre nossa metodologia
          </Button>
        </div>
      </div>
    </section>
  );
}
