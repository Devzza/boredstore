"use client";

import { useRef, useState } from "react";
import { domToPng } from "modern-screenshot"; // Importem la nova llibreria

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLDivElement>(null); // Referència del contenidor visual

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);


  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(URL.createObjectURL(file));
  }

  // Funció de descàrrega corregida per a TypeScript
  async function handleDownload() {
    if (!previewRef.current) return;
    if (!image) {
      alert("Please upload a PFP first!");
      return;
    }

    try {
      // Captura l'estat exacte del disseny respectant els estils 3D de CSS
      const dataUrl = await domToPng(previewRef.current, {
        quality: 1,
        scale: 2, // Augmenta la definició per a una descàrrega nítida
      });
      
      const link = document.createElement("a");
      link.download = "custom-pfp-sunglasses.png";
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Error generant el renderitzat:", error);
      alert("No s'ha pogut processar la descàrrega del disseny.");
    }
  }


  return (
    <main className="min-h-screen bg-[#f4f1ea] text-black">
      {/* NAV */}
      <nav className="flex items-center justify-between px-6 py-5 md:px-10">
        <div className="text-xl font-black tracking-[-0.05em]">
          BoredOnChain
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
        <div className="mx-auto flex max-w-xl flex-col items-center text-center md:mx-0 md:items-start md:text-left">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-black/50">
            Custom sunnies
          </p>

          <h1 className="w-full text-[clamp(2.8rem,13vw,8rem)] font-black leading-[0.8] tracking-[-0.075em]">
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
          
          {/* PARE CONTENIDOR PER CENTRAR EL BLOC DE BOTONS */}
          <div className="mt-8 flex flex-col items-center justify-center text-center md:items-start md:justify-start md:text-left w-full">
            
            {/* CONTENIDOR AMB AMPLADA FIXA PER ALINEAR DALT I BAIX */}
            <div className="w-full max-w-sm flex flex-col gap-3">
              
              {/* BOTÓ SUPERIOR */}
              <button
                onClick={() => inputRef.current?.click()}
                className="w-full rounded-full bg-black py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:scale-105"
              >
                Upload your image →
              </button>

              {/* BOTONS INFERIORS */}
              <div className="grid grid-cols-2 gap-3 w-full">
                <button
                  onClick={handleDownload}
                  className="w-full rounded-full border border-black/20 py-3 text-xs font-bold uppercase tracking-wider text-center transition hover:bg-black hover:text-white"
                >
                  Download
                </button>

                <a
                  href="#"
                  className="w-full rounded-full bg-black/5 py-3 text-xs font-bold uppercase tracking-wider text-center text-black/40 transition hover:bg-black/10 flex items-center justify-center"
                >
                  Buy Soon
                </a>
              </div>

            </div>
          </div>

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
          />
        </div>


        {/* RIGHT / PRODUCT (CANVAS CLICABLE) */}
        {/* Afegim el click aquí i la classe cursor-pointer per millorar l'experiència d'usuari */}
        <div 
          onClick={() => setIsPreviewOpen(true)}
          className="relative w-full max-w-[550px] mx-auto aspect-square cursor-pointer transition hover:opacity-95"
          title="Click to zoom preview"
        >
          {/* El contenidor que es captura amb la llibreria */}
          <div 
            ref={previewRef}
            className="w-full h-full relative flex items-center justify-center overflow-hidden rounded-[2rem] bg-[#d8d4ca]"
          >
            {/* background */}
            <div className="absolute h-[75%] w-[75%] rounded-full bg-[#c4c0b6]" />

            {/* GLASSES WITH RESPONSIVE CONTAINER */}
            <div className="relative w-[95%] max-w-[900px] [container-type:inline-size]">
              
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
                    top: "39.5%",
                    transform: "perspective(500px) rotateY(-50deg) rotateZ(-2deg) translateX(12cqw) translateY(6.5cqw)",
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

            {/* text centrat a sota */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs font-bold uppercase tracking-[0.2em] text-black/40 whitespace-nowrap">
              Make yours on <b>boredonchain.com</b>
            </div>
          </div>
        </div>

      </section>

      {/* FOOTER */}
      <footer className="flex flex-col justify-between gap-4 px-6 py-8 text-xs font-bold uppercase tracking-wider text-black/40 md:flex-row md:px-10">
        <span>BOREDONCHAIN</span>
        <span>Made for real degens</span>
      </footer>

      {/* FINESTRA MODAL DE PREVISUALITZACIÓ GEGANT */}
      {isPreviewOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm transition-opacity"
          onClick={() => setIsPreviewOpen(false)} // Es tanca clicant fora
        >
          {/* Botó de tancar */}
          <button 
            onClick={() => setIsPreviewOpen(false)}
            className="absolute top-6 right-6 text-white text-3xl font-black transition hover:scale-110 z-50"
          >
            ✕
          </button>

          {/* Contingut en gran adaptat a la pantalla */}
          <div 
            className="relative flex aspect-square w-full max-w-[85vh] items-center justify-center overflow-hidden rounded-[2rem] bg-[#d8d4ca] shadow-2xl"
            onClick={(e) => e.stopPropagation()} // Evita tancar la modal si es clica a dins
          >
            <div className="absolute h-[75%] w-[75%] rounded-full bg-[#c4c0b6]" />

            <div className="relative w-[95%] [container-type:inline-size]">
              <img
                src="/glasses/glasses-base.png"
                alt="Custom PFP sunglasses"
                className="relative z-20 w-full"
              />

              {image && (
                <div
                  className="absolute z-30 overflow-hidden rounded-full"
                  style={{
                    width: "3.8%",
                    aspectRatio: "1",
                    left: "63.5%",
                    top: "39.5%",
                    transform: "perspective(500px) rotateY(-50deg) rotateZ(-2deg) translateX(12cqw) translateY(6cqw)",
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

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs font-bold uppercase tracking-[0.2em] text-black/40 whitespace-nowrap">
              Make yours on <b>boredonchain.com</b>
            </div>
          </div>
        </div>
      )}
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
