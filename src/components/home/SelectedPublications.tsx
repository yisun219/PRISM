'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRightIcon } from '@heroicons/react/24/outline';
import { Publication } from '@/types/publication';

interface SelectedPublicationsProps {
    publications: Publication[];
    title?: string;
    enableOnePageMode?: boolean;
}

export default function SelectedPublications({ publications, title = 'Selected Publications', enableOnePageMode = false }: SelectedPublicationsProps) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
        >
            <div className="flex items-center justify-between gap-4 mb-5">
                <div className="flex items-center gap-3">
                    <span className="h-px w-8 bg-accent" />
                    <h2 className="text-2xl font-serif font-bold tracking-tight text-primary">{title}</h2>
                </div>
                <Link
                    href={enableOnePageMode ? "/#publications" : "/publications"}
                    prefetch={true}
                    className="flex-none text-accent-dark dark:text-accent hover:text-accent text-sm font-semibold transition-colors"
                >
                    View All →
                </Link>
            </div>
            <div className="space-y-3">
                {publications.map((pub, index) => (
                    <motion.div
                        key={pub.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 * index }}
                        className="group bg-white/70 dark:bg-neutral-800/70 p-5 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 hover:border-accent/40 hover:shadow-md transition-all duration-200"
                    >
                        <div className="flex items-start gap-3">
                            <h3 className="flex-1 font-semibold text-primary mb-2 leading-snug">{pub.title}</h3>
                            {(pub.doi || pub.url) && (
                                <a
                                    href={pub.doi ? `https://doi.org/${pub.doi}` : pub.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`Open ${pub.title}`}
                                    className="mt-0.5 text-neutral-400 transition-colors group-hover:text-accent"
                                >
                                    <ArrowUpRightIcon className="h-4 w-4" />
                                </a>
                            )}
                        </div>
                        <p className="text-sm text-neutral-600 dark:text-neutral-500 mb-1">
                            {pub.authors.map((author, idx) => (
                                <span key={idx}>
                                    <span className={`${author.isHighlighted ? 'font-semibold text-accent' : ''} ${author.isCoAuthor ? `underline underline-offset-4 ${author.isHighlighted ? 'decoration-accent' : 'decoration-neutral-400'}` : ''}`}>
                                        {author.name}
                                    </span>
                                    {author.isCorresponding && (
                                        <sup className={`ml-0 ${author.isHighlighted ? 'text-accent' : 'text-neutral-600 dark:text-neutral-500'}`}>†</sup>
                                    )}
                                    {idx < pub.authors.length - 1 && ', '}
                                </span>
                            ))}
                        </p>
                        <p className="text-sm font-medium text-neutral-600 dark:text-neutral-500 mb-2">
                            {pub.journal || pub.conference} · {pub.year}
                        </p>
                        {pub.description && (
                            <p className="text-sm text-neutral-500 dark:text-neutral-500 line-clamp-2">
                                {pub.description}
                            </p>
                        )}
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}
