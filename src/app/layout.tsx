"use client";

import "./globals.css";

import { Provider } from "react-redux";
import store from "@/Store/store";
import Snackbar from "@/Components/UI/Snackbar";
import { DefaultSeo, OrganizationJsonLd } from 'next-seo';
import { OrganizationJsonLdAttributes, seoAttributes } from "@/constants/seo/globals";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <DefaultSeo
        title={seoAttributes.title}
        titleTemplate={seoAttributes.titleTemplate}
        description={seoAttributes.description}
        openGraph={seoAttributes.openGraph}
        defaultTitle={"Informe"}
        additionalMetaTags={seoAttributes.additionalMetaTags}
      />
      <OrganizationJsonLd
        type={OrganizationJsonLdAttributes.type}
        name={OrganizationJsonLdAttributes.name}
        logo={OrganizationJsonLdAttributes.logo}
        legalName={OrganizationJsonLdAttributes.legalName}
        url={OrganizationJsonLdAttributes.url}
        sameAs={OrganizationJsonLdAttributes.sameAs}
      />
      <Provider store={store}>
        <html lang="en">
          <body>
            <main>{children}</main>
            <Snackbar />
          </body>
        </html>
      </Provider>
    </>
  );
}
