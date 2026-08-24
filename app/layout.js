import { Sora, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sora = Sora({ subsets: ["latin"], variable: "--font-display-raw", weight: ["400","500","600","700","800"] });
const inter = Inter({ subsets: ["latin"], variable: "--font-body-raw", weight: ["400","500","600","700"] });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono-raw", weight: ["400","500"] });

export const metadata = {
  title: "Grupo Sinergia Colombia S.A.S. — Interventoría de obra pública",
  description: "Interventoría técnica, administrativa, financiera, ambiental y social para contratos de infraestructura pública en Colombia.",
  metadataBase: new URL("https://www.gruposinergiacolombia.com"),
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${sora.variable} ${inter.variable} ${jetbrains.variable}`}>
      <body>{children}</body>
    </html>
  );
}
