import "./globals.css";
import { OrganizationJsonLdAttributes, seoAttributes } from "@/constants/seo/globals";
import ClientOnlyWrapper from "@/Components/ClientComponent";
import { OrganizationJsonLd } from 'next-seo';
import { Viewport } from "next";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <OrganizationJsonLd
          useAppDir={true}
          type={OrganizationJsonLdAttributes.type}
          name={OrganizationJsonLdAttributes.name}
          logo={OrganizationJsonLdAttributes.logo}
          legalName={OrganizationJsonLdAttributes.legalName}
          url={OrganizationJsonLdAttributes.url}
          sameAs={OrganizationJsonLdAttributes.sameAs}
        />
        <ClientOnlyWrapper>{children}</ClientOnlyWrapper>
      </body>
    </html>
  );
}
export const metadata = {
  ...seoAttributes,
}

export const viewport: Viewport = {
  width: 'device-width',
}