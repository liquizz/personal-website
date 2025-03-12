import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code2, Database, Terminal, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const skillCategories = [
  {
    key: 'backend',
    icon: <Code2 size={24} />,
    skills: ['.NET', 'C#', 'ASP.NET', 'EF', 'Dapper'],
  },
  {
    key: 'frontend',
    icon: <Code2 size={24} />,
    skills: ['React', 'Angular', 'HTML', 'CSS', 'JavaScript', 'TypeScript'],
  },
  {
    key: 'databases',
    icon: <Database size={24} />,
    skills: ['MSSQL', 'MySQL', 'PostgreSQL'],
  },
  {
    key: 'devops',
    icon: <Terminal size={24} />,
    skills: ['RabbitMQ', 'Linux', 'Git', 'Docker', 'Jenkins', 'Azure DevOps'],
  },
  {
    key: 'soft',
    icon: <Users size={24} />,
    skills: ['skills.soft.flexibility', 'skills.soft.taskPrioritization', 'skills.soft.communication', 'skills.soft.teamwork'].map(key => ({ key })),
  },
];

export const Skills: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { t } = useTranslation();

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800/50">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">
            {t('skills.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-blue-500">{category.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {t(`skills.categories.${category.key}`)}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300"
                    >
                      {typeof skill === 'string' ? skill : t(skill.key)}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};