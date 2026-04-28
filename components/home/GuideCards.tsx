"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock, BookOpen } from "lucide-react";
import { getLatestGuides } from "@/data/guides";

export function GuideCards() {
  const guides = getLatestGuides(3);
  return (
    <section className="py-20 md:py-28 bg-cbf-ivory">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div className="max-w-2xl">
            <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
              Notre journal
            </span>
            <h2 className="font-playfair text-display-md text-cbf-black font-bold mt-3 mb-3">
              Guides et analyses du marché
            </h2>
            <p className="text-cbf-gray">
              Conseils pratiques, analyses de tendances et décryptages du marché clermontois.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {guides.map((g, i) => (
            <motion.div
              key={g.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Link
                href={`/guide/${g.slug}`}
                className="group block h-full bg-white border border-cbf-gray-soft rounded-sm p-6 hover:border-cbf-gold hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.18)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-cbf-ivory text-[0.6rem] uppercase tracking-wider text-cbf-gold font-bold rounded-sm">
                    <BookOpen className="h-3 w-3" />
                    {g.categorie}
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-cbf-gray-light group-hover:text-cbf-gold group-hover:scale-110 transition-all" />
                </div>

                <h3 className="font-playfair text-xl text-cbf-black font-bold mb-3 leading-tight group-hover:text-cbf-gold transition-colors">
                  {g.titre}
                </h3>
                <p className="text-sm text-cbf-gray line-clamp-3 mb-5">
                  {g.description}
                </p>

                <div className="flex items-center gap-1.5 text-xs text-cbf-gray-light pt-4 border-t border-cbf-gray-soft">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{g.tempsLecture} de lecture</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
