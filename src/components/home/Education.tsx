'use client';

import { motion } from 'framer-motion';

export interface EducationItem {
    school: string;
    degree?: string;
    gpa?: string;
    date?: string;
    logo?: string;
    location?: string;
}

interface EducationProps {
    items: EducationItem[];
    title?: string;
}

export default function Education({ items, title = 'Education' }: EducationProps) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-8 bg-accent" />
                <h2 className="text-2xl font-serif font-bold tracking-tight text-primary">{title}</h2>
            </div>
            <div className="grid gap-3">
                {items.map((item, index) => (
                    <div key={index} className="flex items-start gap-4 rounded-xl border border-neutral-200 bg-white/65 p-4 shadow-sm dark:border-neutral-700 dark:bg-neutral-800/65">
                        {item.logo && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={item.logo}
                                alt={`${item.school} logo`}
                                className="w-11 h-11 flex-shrink-0 object-contain"
                            />
                        )}
                        <div className="flex-grow min-w-0">
                            <p className="text-[0.95rem] font-semibold text-primary leading-snug">{item.school}</p>
                            {item.degree && (
                                <p className="mt-1 text-sm leading-snug text-neutral-700 dark:text-neutral-600">{item.degree}</p>
                            )}
                            {item.gpa && (
                                <p className="mt-1 text-xs font-semibold text-accent-dark dark:text-accent">
                                    GPA: {item.gpa}
                                </p>
                            )}
                            {item.location && (
                                <p className="mt-1 text-xs text-neutral-500">{item.location}</p>
                            )}
                        </div>
                        {item.date && (
                            <span className="hidden sm:block text-xs text-neutral-500 whitespace-nowrap flex-shrink-0 mt-0.5">
                                {item.date}
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </motion.section>
    );
}
