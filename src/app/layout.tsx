import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { getConfig } from "@/lib/config";

export async function generateMetadata(): Promise<Metadata> {
  const config = getConfig();
  return {
    metadataBase: config.site.url ? new URL(config.site.url) : undefined,
    title: {
      default: config.site.title,
      template: `%s | ${config.site.title}`
    },
    description: config.site.description,
    keywords: [
      config.author.name,
      "computer architecture",
      "AI accelerators",
      "hardware-software co-design",
      config.author.institution,
    ],
    authors: [{ name: config.author.name }],
    creator: config.author.name,
    publisher: config.author.name,
    icons: {
      icon: config.site.favicon,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      title: config.site.title,
      description: config.site.description,
      siteName: `${config.author.name}'s Academic Website`,
      url: config.site.url,
    },
    alternates: config.site.url ? { canonical: config.site.url } : undefined,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config = getConfig();

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" href={config.site.favicon} type="image/svg+xml" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const storage = typeof window !== 'undefined' ? window.localStorage : null;
                const theme = storage && typeof storage.getItem === 'function'
                  ? storage.getItem('theme-storage')
                  : null;
                const parsed = theme ? JSON.parse(theme) : null;
                const setting = parsed?.state?.theme || 'system';
                const prefersDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                const effective = setting === 'dark' ? 'dark' : (setting === 'light' ? 'light' : (prefersDark ? 'dark' : 'light'));
                var root = document.documentElement;
                root.classList.add(effective);
                root.setAttribute('data-theme', effective);
              } catch (e) {
                var root = document.documentElement;
                root.classList.add('light');
                root.setAttribute('data-theme', 'light');
              }
            `,
          }}
        />
      </head>
      <body className={`font-sans antialiased`}>
        <ThemeProvider>
          <Navigation
            items={config.navigation}
            siteTitle={config.site.title}
            enableOnePageMode={config.features.enable_one_page_mode}
          />
          <main className="min-h-screen pt-16 lg:pt-20">
            {children}
          </main>
          <Footer lastUpdated={config.site.last_updated} />
        </ThemeProvider>
      </body>
    </html>
  );
}
