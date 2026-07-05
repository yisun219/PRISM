'use client';

import { motion } from 'framer-motion';

export interface NewsItem {
    date: string;
    content: string;
}

interface NewsProps {
    items: NewsItem[];
    title?: string;
}

export default function News({ items, title = 'News' }: NewsProps) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
        >
            <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-8 bg-accent" />
                <h2 className="text-2xl font-serif font-bold tracking-tight text-primary">{title}</h2>
            </div>
            <div className="relative space-y-0 before:absolute before:left-[4.45rem] before:top-2 before:bottom-2 before:w-px before:bg-neutral-200 dark:before:bg-neutral-700">
                {items.map((item, index) => (
                    <div key={index} className="relative flex items-start gap-5 py-2.5">
                        <time className="w-14 flex-shrink-0 pt-0.5 text-xs font-medium tabular-nums text-neutral-500">{item.date}</time>
                        <span className="relative z-10 mt-1.5 h-2 w-2 flex-none rounded-full bg-accent ring-4 ring-background" />
                        <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-600">{item.content}</p>
                    </div>
                ))}
            </div>
        </motion.section>
    );
}
