import "./globals.css";

export const metadata = {
  title: "Familienessensplan",
  description: "4-Wochen Essensplan mit Reste-Logik für die Familie",
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
