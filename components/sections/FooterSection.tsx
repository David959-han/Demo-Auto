import { useTranslations } from 'next-intl';
import { Zap } from 'lucide-react';

const LINK_HREFS: Record<string, string> = {
  features:  '#features',
  pricing:   '#pricing',
  demo:      '#contact',
  about:     '#contact',
  blog:      '#contact',
  careers:   '#contact',
  docs:      '#faq',
  contact:   '#contact',
  status:    '#contact',
  privacy:   '#contact',
  terms:     '#contact',
};

export function FooterSection() {
  const t = useTranslations('footer');

  const links = [
    {
      title: t('product'),
      keys: ['features', 'pricing', 'demo'],
    },
    {
      title: t('company'),
      keys: ['about', 'blog', 'careers'],
    },
    {
      title: t('support'),
      keys: ['docs', 'contact', 'status'],
    },
    {
      title: t('legal'),
      keys: ['privacy', 'terms'],
    },
  ];

  return (
    <footer className="border-t border-zinc-800 bg-zinc-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/20">
                <Zap className="w-4 h-4 text-amber-400" fill="currentColor" />
              </div>
              <span
                className="text-sm font-bold tracking-widest text-white uppercase"
                style={{ fontFamily: 'var(--font-orbitron)' }}
              >
                Yantar <span className="text-amber-400">Auto</span>
              </span>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed max-w-xs">
              {t('description')}
            </p>
          </div>

          {/* Links */}
          {links.map((group) => (
            <div key={group.title}>
              <h4 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-4">
                {group.title}
              </h4>
              <ul className="space-y-2.5">
                {group.keys.map((key) => (
                  <li key={key}>
                    <a
                      href={LINK_HREFS[key]}
                      className="text-sm text-zinc-500 hover:text-amber-400 transition-colors"
                    >
                      {t(key as Parameters<typeof t>[0])}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-zinc-800">
          <p className="text-xs text-zinc-600">{t('copyright')}</p>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-zinc-500">{t('status')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
