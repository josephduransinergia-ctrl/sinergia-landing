import { DM_Serif_Display, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const dmSerif = DM_Serif_Display({ subsets: ["latin"], variable: "--font-display-raw", weight: "400", style: ["normal", "italic"] });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-body-raw", weight: ["400", "500", "600", "700"] });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono-raw", weight: ["400", "500"] });

export const metadata = {
  title: "Grupo Sinergia Colombia S.A.S. — Interventoría de obra pública",
  description: "Interventoría técnica, administrativa, financiera, ambiental y social para contratos de infraestructura pública en Colombia.",
  metadataBase: new URL("https://www.gruposinergiacolombia.com"),
  openGraph: {
    title: "Grupo Sinergia Colombia S.A.S.",
    description: "Interventoría de obra pública — verificación contractual con estándares de contratación estatal colombiana.",
    url: "https://www.gruposinergiacolombia.com",
    siteName: "Grupo Sinergia Colombia",
    locale: "es_CO",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${dmSerif.variable} ${dmSans.variable} ${jetbrains.variable}`}>
      <body>{children}</body>
    </html>
  );
}
