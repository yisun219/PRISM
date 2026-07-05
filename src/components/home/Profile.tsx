'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import {
    AcademicCapIcon,
    EnvelopeIcon,
    MapPinIcon,
} from '@heroicons/react/24/outline';
import { Github, Linkedin } from 'lucide-react';
import { SiteConfig } from '@/lib/config';

const OrcidIcon = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.025-5.325 5.025h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 4.022-2.484 4.022-3.722 0-2.016-1.284-3.722-4.097-3.722h-2.222z" />
    </svg>
);

interface ProfileProps {
    author: SiteConfig['author'];
    social: SiteConfig['social'];
    researchInterests?: string[];
}

export default function Profile({ author, social, researchInterests }: ProfileProps) {
    const socialLinks = [
        ...(social.email ? [{
            name: 'Email',
            href: `mailto:${social.email}`,
            icon: EnvelopeIcon,
            external: false,
        }] : []),
        ...(social.location ? [{
            name: social.location,
            href: social.location_url || '#',
            icon: MapPinIcon,
            external: true,
        }] : []),
        ...(social.google_scholar ? [{
            name: 'Google Scholar',
            href: social.google_scholar,
            icon: AcademicCapIcon,
            external: true,
        }] : []),
        ...(social.orcid ? [{
            name: 'ORCID',
            href: social.orcid,
            icon: OrcidIcon,
            external: true,
        }] : []),
        ...(social.github ? [{
            name: 'GitHub',
            href: social.github,
            icon: Github,
            external: true,
        }] : []),
        ...(social.linkedin ? [{
            name: 'LinkedIn',
            href: social.linkedin,
            icon: Linkedin,
            external: true,
        }] : []),
    ];

    return (
        <motion.aside
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:sticky lg:top-28"
        >
            <div className="relative w-56 h-56 sm:w-60 sm:h-60 mx-auto mb-7">
                <div className="absolute -inset-2 rounded-[1.4rem] border border-accent/25" />
                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-lg ring-1 ring-neutral-200 dark:ring-neutral-700">
                    <Image
                        src={author.avatar}
                        alt={`Portrait of ${author.name}`}
                        width={240}
                        height={240}
                        className="w-full h-full object-cover object-[32%_center]"
                        priority
                    />
                </div>
            </div>

            <div className="text-center">
                <h1 className="text-3xl font-serif font-bold tracking-tight text-primary mb-2">
                    {author.name}
                </h1>
                <p className="text-base text-accent-dark dark:text-accent font-semibold mb-1">
                    {author.title}
                </p>
                <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-500 max-w-xs mx-auto">
                    {author.institution}
                </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2 mt-5 mb-7">
                {socialLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                        <a
                            key={link.name}
                            href={link.href}
                            target={link.external ? '_blank' : undefined}
                            rel={link.external ? 'noopener noreferrer' : undefined}
                            aria-label={link.name}
                            title={link.name}
                            className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-neutral-200 bg-white/80 text-neutral-600 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent-dark hover:shadow-md dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:text-accent"
                        >
                            <Icon className="h-[18px] w-[18px]" />
                        </a>
                    );
                })}
            </div>

            {researchInterests && researchInterests.length > 0 && (
                <div className="rounded-xl border border-neutral-200 bg-white/70 p-5 shadow-sm dark:border-neutral-700 dark:bg-neutral-800/70">
                    <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-500 mb-4">
                        Research interests
                    </h2>
                    <ul className="space-y-2.5">
                        {researchInterests.map((interest) => (
                            <li key={interest} className="flex items-start gap-2.5 text-sm leading-snug text-neutral-700 dark:text-neutral-500">
                                <span className="mt-[0.45rem] h-1.5 w-1.5 flex-none rounded-full bg-accent" />
                                <span>{interest}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </motion.aside>
    );
}
