import Head from "next/head";
import "./globals.css";
import { seoAttributes, OrganizationJsonLdAttributes } from "@/constants/seo/globals";
import ClientOnlyWrapper from "@/Components/ClientComponent";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        {/* Page Title and Description */}
        <title>{seoAttributes.title}</title>
        <meta name="description" content={seoAttributes.description} />

        {/* Additional Meta Tags */}
        {seoAttributes.additionalMetaTags.map((tag, index) => (
          <meta key={index} name={tag.name} content={tag.content} />
        ))}

        {/* Open Graph Meta Tags */}
        <meta property="og:type" content={seoAttributes.openGraph.type} />
        <meta property="og:locale" content={seoAttributes.openGraph.locale} />
        <meta property="og:url" content={seoAttributes.openGraph.url} />
        <meta property="og:title" content={seoAttributes.openGraph.title} />
        <meta property="og:description" content={seoAttributes.openGraph.description} />
        <meta property="og:site_name" content={seoAttributes.openGraph.siteName} />
        {seoAttributes.openGraph.images.map((image, index) => (
          <meta key={index} property="og:image" content={image.url} />
        ))}

        {/* Organization Meta Tags */}
        <meta property="organization:name" content={OrganizationJsonLdAttributes.name} />
        <meta property="organization:legal_name" content={OrganizationJsonLdAttributes.legalName} />
        <meta property="organization:url" content={OrganizationJsonLdAttributes.url} />
        <meta property="organization:logo" content={OrganizationJsonLdAttributes.logo} />
        {OrganizationJsonLdAttributes.sameAs.map((url, index) => (
          <meta key={index} property="organization:same_as" content={url} />
        ))}

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(OrganizationJsonLdAttributes)}
        </script>
      </Head>
      <body>
        <ClientOnlyWrapper>{children}</ClientOnlyWrapper>
      </body>
    </html>
  );
}
