interface OpenGraph {
    url: string;
    title: string;
    description: string;
    type: string,
    locale: string,
    siteName: string,
    images: any,
}

interface SeoAttributes {
    title: string;
    titleTemplate: string;
    description: string;
    additionalMetaTags: { name: string; content: string }[];
    openGraph: OpenGraph;
}

interface OrganizationJsonLdAttributes {
    type: string;
    name: string;
    legalName: string;
    logo: string;
    url: string;
    sameAs: string[];
}

export const seoAttributes: SeoAttributes = {
    title: 'Informe | Real-Time Stock News on Telegram & WhatsApp',
    description: 'Get real-time stock market news from BSE & NSE on Telegram and WhatsApp instantly in short formats.',
    titleTemplate: "Informe",
    additionalMetaTags: [
        {
            name: "keywords",
            content:
                "stock news, real-time stock updates, BSE, NSE, stock market, stock news Telegram, stock news WhatsApp, market news alerts, stock market updates, finance news, live stock news",
        },
        {
            name: "viewport",
            content: "width=device-width, initial-scale=1.0"
        },
    ],
    openGraph: {
        type: 'website',
        locale: 'en_IN',
        url: 'https://www.informe.in',
        title: 'Informe | Real-Time Stock News on Telegram & WhatsApp',
        description: 'Get real-time stock market news from BSE & NSE on Telegram and WhatsApp instantly in short formats.',
        siteName: 'Informe',
        images: [
            { url: 'https://www.informe.in/static/website_share_image.png' },
        ]
    },
};
export const OrganizationJsonLdAttributes: OrganizationJsonLdAttributes = {
    type: "Organization",
    name: "Informe",
    legalName: "Informe",
    logo: "https://www.informe.in/static/informe_logo.webp",
    url: "https://informe.in/",
    sameAs: [
        "https://www.instagram.com/informe_in/",
        "https://www.linkedin.com/company/informe-in/",
        "https://twitter.com/informe_in",
        "https://www.facebook.com/informe.in/",
    ],
};
