"use client";

import { useRef, useState } from "react";
import { toPng } from "html-to-image"; // Importem la llibreria

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLDivElement>(null); // Referència per a la captura

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(URL.createObjectURL(file));
  }

  // Funció per capturar i descarregar el resultat combinat
   // Funció millorada per evitar l'error de generació
  async function handleDownload() {
    if (!previewRef.current) return;

    try {
      // Truquem una primera vegada per forçar la càrrega de recursos en memòria (solució per a Safari/Chrome)
      await toPng(previewRef.current, { cacheBust: true, skipFonts: true });
      
      // La segona trucada ja extreu el PNG real modificat amb la PFP renderitzada
      const dataUrl = await toPng(previewRef.current, { 
        cacheBust: true,
        pixelRatio: 2, // Millora la definició i qualitat de la imatge descarregada
      });
      
      const link = document.createElement("a");
      link.download = "custom-pfp-sunglasses.png";
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Error generant la imatge:", error);
      
      // Mètode de contingència si el DOM està bloquejat per CORS local
      alert("S'ha produït un error de renderitzat. Torna a intentar-ho en un segon.");
    }
  }

  return (
    <main className="min-h-screen bg-[#f4f1ea] text-black">
      {/* NAV */}
      <nav className="flex items-center justify-between px-6 py-5 md:px-10">
        <div className="text-xl font-black tracking-[-0.05em]">
          BoredOnChain Store
        </div>

        <button
          onClick={() => inputRef.current?.click()}
          className="rounded-full bg-black px-5 py-3 text-sm font-bold text-white transition hover:scale-105"
        >
          Customize
        </button>
      </nav>

      {/* HERO */}
      <section className="mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-10 px-6 py-10 md:grid-cols-2 md:px-10">
        {/* LEFT */}
        <div className="max-w-xl">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-black/50">
            Custom PFP sunglasses
          </p>

          <h1 className="text-[clamp(4rem,9vw,8rem)] font-black leading-[0.8] tracking-[-0.075em]">
            WEAR
            <br />
            YOUR
            <br />
            PFP.
          </h1>

          <p className="mt-8 max-w-md text-lg leading-relaxed text-black/60">
            Upload your PFP. Preview your sunnies. 
            Share them. Buy them. Love them and rock your PFP anywhere.
          </p>
          
          <button
            onClick={() => inputRef.current?.click()}
            className="mt-8 rounded-full bg-black px-8 py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:scale-105"
          >
            Make my pair →
          </button>

          {/* BOTONS SOL·LICITATS */}
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              onClick={handleDownload}
              className="rounded-full border border-black/20 px-6 py-3 text-xs font-bold uppercase tracking-wider transition hover:bg-black hover:text-white"
            >
              Download
            </button>

            <a
              href="#"
              className="inline-block rounded-full bg-black/5 px-6 py-3 text-xs font-bold uppercase tracking-wider text-black/40 transition hover:bg-black/10"
            >
              Buy Soon
            </a>
          </div>

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
          />
        </div>

        {/* RIGHT / PRODUCT */}
        {/* Afegim la ref aquí per capturar tot aquest bloc quadrat */}
        <div 
          ref={previewRef} 
          className="relative flex aspect-square items-center justify-center overflow-hidden rounded-[2rem] bg-[#d8d4ca]"
        >
          {/* background */}
          <div className="absolute h-[75%] w-[75%] rounded-full bg-[#c4c0b6]" />

          {/* GLASSES */}
          <div className="relative w-[95%] max-w-[900px]">
            
            <img
              src="/glasses/glasses-base.png"
              alt="Custom PFP sunglasses"
              className="relative z-20 w-full"
            />

            {/* PFP ON TEMPLE */}
            {image && (
              <div
                className="absolute z-30 overflow-hidden rounded-full"
                style={{
                  width: "4%",
                  aspectRatio: "1",
                  left: "63.5%",
                  top: "40%",
                  transform: "perspective(500px) rotateY(-50deg) rotateZ(-2deg) translateX(60px) translateY(33px)",
                }}
              >
                <img
                  src={image}
                  alt="Your PFP"
                  className="h-full w-full object-cover"
                />
              </div>
            )}

          </div>

          <div className="absolute bottom-6 left-6 text-xs font-bold uppercase tracking-[0.2em] text-black/40">
            Preview
          </div>
        </div>
      </section>

      {/* CUSTOMIZER */}
      {image && (
        <section className="border-t border-black/10 bg-black px-6 py-20 text-white md:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-white/40">
                  Your pair
                </p>

                <h2 className="text-5xl font-black tracking-[-0.05em] md:text-7xl">
                  LOOKS GOOD.
                </h2>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => inputRef.current?.click()}
                  className="rounded-full border border-white/20 px-6 py-3 text-sm font-bold transition hover:bg-white hover:text-black"
                >
                  Change PFP
                </button>

                <button
                  onClick={() =>
                    navigator.share?.({
                      title: "My custom PFP sunglasses",
                      text: "Should I cop these?",
                      url: window.location.href,
                    })
                  }
                  className="rounded-full bg-white px-6 py-3 text-sm font-bold text-black transition hover:scale-105"
                >
                  Share →
                </button>
              </div>
            </div>

            <div className="mt-16 grid gap-4 md:grid-cols-3">
              <Option title="FRAME" value="Black" />
              <Option title="LENS" value="Smoke" />
              <Option title="CUSTOM" value="UV DTF" />
            </div>

            <div className="mt-12 flex flex-col justify-between gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center">
              <div>
                <p className="text-sm text-white/40">Custom pair</p>
                <p className="text-4xl font-black">$89</p>
              </div>

              <button className="rounded-full bg-white px-10 py-5 text-sm font-black uppercase tracking-wide text-black transition hover:scale-105">
                I want these →
              </button>
            </div>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="flex flex-col justify-between gap-4 px-6 py-8 text-xs font-bold uppercase tracking-wider text-black/40 md:flex-row md:px-10">
        <span>Custom PFP eyewear</span>
        <span>Made for the internet</span>
      </footer>
    </main>
  );
}

function Option({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 p-6">
      <p className="text-xs font-bold tracking-[0.2em] text-white/30">
        {title}
      </p>
      <p className="mt-3 text-xl font-bold">{value}</p>
    </div>
  );
}
