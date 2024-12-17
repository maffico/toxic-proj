import { Metadata } from "next";
import "./globals.scss";
import { Urbanist } from "next/font/google";

const urbanist = Urbanist({
    subsets: ['latin'],
    weight: ['400', '700'],
    style: ['italic', 'normal']
})

export const metadata: Metadata = {
  title: 'To-Do List'
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={urbanist.className}>
      <body>
        <div className="gradient" />
        {children}
      </body>
    </html>
  );
}
