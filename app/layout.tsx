import "./globals.css";

export const metadata = {
  title: "GPTCoverLetter",
  description: "Generate cover letters for your job applications using GPT-3.5",

  type: "website",
  icons: {
    icon: "/logo_background.svg",
    shortcut: "/logo_background.svg",
    apple: "/favicon.ico",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "http://localhost:3000/favicon.ico",
    },
  },

  // index the page
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
