import "./globals.css";
import { OrganizationJsonLdAttributes, seoAttributes } from "@/constants/seo/globals";
import ClientOnlyWrapper from "@/Components/ClientComponent";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientOnlyWrapper>{children}</ClientOnlyWrapper>
      </body>
    </html>
  );
}
export const metadata = {
  ...seoAttributes,
  ...OrganizationJsonLdAttributes,
}
