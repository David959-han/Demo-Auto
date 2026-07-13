'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { MessageCircle, Mail, Zap } from 'lucide-react';
import { ScrollReveal } from '@/components/effects/ScrollReveal';

export function ContactSection() {
  const t = useTranslations('contact');

  return (
    <section id="contact" className="py-24 relative">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/3 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        <ScrollReveal>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-400 text-xs font-medium mb-6">
            <Zap className="w-3 h-3" />
            {t('badge')}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">{t('title')}</h2>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <p className="text-zinc-400 text-base leading-relaxed mb-10 max-w-xl mx-auto">
            {t('subtitle')}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

            {/* WhatsApp */}
            <motion.a
              href="https://wa.me/971501234567?text=Hello%2C%20I%20want%20a%20demo%20of%20Yantar%20Auto%20OS"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-7 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm transition-colors shadow-lg shadow-green-500/20 w-full sm:w-auto justify-center"
            >
              <MessageCircle className="w-5 h-5" />
              {t('whatsapp')}
            </motion.a>

            <span className="text-zinc-600 text-sm">{t('or')}</span>

            {/* Email */}
            <motion.a
              href="mailto:admin@flowcraft.uz?subject=Yantar Auto OS Demo"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-7 py-3.5 rounded-xl border border-zinc-700 hover:border-amber-500/50 bg-zinc-800/60 hover:bg-zinc-800 text-zinc-200 font-bold text-sm transition-all w-full sm:w-auto justify-center"
            >
              <Mail className="w-5 h-5 text-amber-400" />
              {t('email')}
            </motion.a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
