import type { Metadata } from "next";
import "./globals.css";
import {IBM_Plex_Serif} from 'next/font/google'


const ibmPlexSerif = IBM_Plex_Serif({
  subsets:['latin'],
  weight:['400','700'],
  variable:'--font-ibm-plex-serfi'
})
export const metadata: Metadata = {
  title: "BGS Banking system",
  description: "Private banking for public purpose",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ibmPlexSerif.variable} ${ibmPlexSerif.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
