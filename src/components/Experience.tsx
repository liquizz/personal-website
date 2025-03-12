import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const experiences = [
  {
    company: 'boostCX',
    period: '05/2023 - 03/2025',
    type: 'remote',
    key: 'boostCX'
  },
  {
    company: 'Infopulse',
    period: '02/2021 - 05/2023',
    type: 'remote',
    key: 'infopulse'
  },
  {
    company: 'Odessa Innovative Technology Lab',
    period: '01/2019 - 02/2021',
    type: 'onsite',
    key: 'oitl'
  },
  {
    company: 'KeepSolid Inc',
    period: '06/2018 - 01/2019',
    type: 'onsite',
    key: 'keepSolid'
  },
];

export const Experience: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { t } = useTranslation();

  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">
            {t('experience.title')}
          </h2>
          <div className="max-w-4xl mx-auto">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative pl-8 pb-12 last:pb-0"
              >
                <div className="absolute left-0 top-0 h-full w-px bg-blue-200 dark:bg-blue-800" />
                <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-blue-500" />
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {exp.company}
                    </h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {exp.period}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Briefcase size={16} className="text-blue-500" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {t(`experience.companies.${exp.key}.role`)}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      ({t(`experience.${exp.type}`)})
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    {t(`experience.companies.${exp.key}.description`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};