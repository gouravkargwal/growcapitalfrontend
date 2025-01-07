import React from "react";
import { getNewsById } from "@/Feature/News/news.service";
import { FaClock } from "react-icons/fa";
import Footer from "@/Components/Header/Footer";
import Link from "next/link";
import logo from "../../../../assets/logo-1.png";
import Image from "next/image";
import { logPageView } from "@/events/analytics";
import { NewsArticleJsonLd } from "next-seo";
import ShareNewsBtn from "@/Components/News/ShareNewsBtn";
import { notFound } from "next/navigation";
import RelatedArticleLink from "@/Components/News/RelatedArticleLink";
import FilingLink from "@/Components/News/FilingLink";

const Navbar = () => {
  return (
    <nav className="bg-[#FDF8F1] shadow-md sticky top-0 z-50">
      <div className="flex items-center justify-between px-5 py-5">
        <Link href="/" className="flex items-center">
          <Image src={logo} alt="Informe" height={30} />
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-sm text-gray-600 hover:text-primary">
            Home
          </Link>
          <Link
            href="/about"
            className="text-sm text-gray-600 hover:text-primary"
          >
            About
          </Link>
          <Link
            href="https://informe.freshdesk.com"
            className="text-sm text-gray-600 hover:text-primary"
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

interface NewsDetailProps {
  params: { id: string };
}

const NewsDetail = async ({ params }: NewsDetailProps) => {
  const { id } = params;

  let newsDetail;
  const getSSRUrl = async (): Promise<string> => {
    return `https://informe.in/news/${id}`;
  };
  try {
    await logPageView(true, getSSRUrl);
    newsDetail = await getNewsById(id);
    if (!newsDetail) {
      notFound();
    }
  } catch (err) {
    console.error("Error fetching news detail:", err);
    notFound();
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div>
      <Navbar />
      <NewsArticleJsonLd
        useAppDir={true}
        url={`https://informe.in/news/${newsDetail.stockNewsId}`}
        title={newsDetail.heading}
        images={[]}
        section="Financial Markets,Stock Market,Investment News,Market Analysis"
        keywords={`${newsDetail.keywords
          }, stock market, financial news, market analysis, trading, investing, ${newsDetail.stockNewsId
            .split("-")
            .join(
              ", "
            )}, stock prices, market trends, financial markets, investment strategy, stock trading, market updates, business news${newsDetail.heading
              .toLowerCase()
              .split(" ")
              .join(", ")}`}
        datePublished={newsDetail.exchange_receive_time}
        dateCreated={newsDetail.exchange_receive_time}
        dateModified={newsDetail.exchange_receive_time}
        authorName="Informe"
        publisherName="Informe"
        publisherLogo="https://d140p29c73x6ns.cloudfront.net/temp/InforMe.png"
        description={newsDetail.shortSummary}
        body={newsDetail.summary}
        isAccessibleForFree={true}
      />
      <div className="bg-white overflow-hidden pb-12">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-start justify-between mb-6 flex-row">
            <div className="flex items-center justify-center space-x-4">
              <span className="text-2xl font-semibold text-primary">News</span>
              <div className="text-sm text-gray-500 flex items-center space-x-2">
                <FaClock className="text-gray-400" />
                <span>{formatDate(newsDetail.exchange_receive_time)}</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 mt-0">
              <ShareNewsBtn
                stockNewsId={newsDetail.stockNewsId}
                shortSummary={newsDetail.shortSummary}
                heading={newsDetail.heading}
              />

              {/* <div className="flex space-x-3 text-gray-600">
                <a href="#" className="hover:text-blue-600">
                  <FaFacebookF />
                </a>
                <a href="#" className="hover:text-blue-400">
                  <FaTwitter />
                </a>
                <a href="#" className="hover:text-blue-700">
                  <FaLinkedin />
                </a>
              </div> */}
            </div>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
            {newsDetail.heading}
          </h1>
        </div>
        <div className="mx-auto text-gray-800 mb-8 px-6 mt-4">
          {newsDetail.image && (
            <div className="float-left w-full md:w-1/4 bg-gray-200 mr-4 mb-2">
              <Image
                src={newsDetail.image || ""}
                width={500}
                height={500}
                className="w-full h-full object-fill"
                alt={`${newsDetail.heading} - Featured Image`}
                priority={true}
              />
            </div>
          )}
          <p>{newsDetail.summary}</p>
          {newsDetail.pdfLink && (
            <div className="mt-6">
              <FilingLink
                pdfLink={newsDetail.pdfLink}
                stockNewsId={newsDetail.stockNewsId}
              />
            </div>
          )}
        </div>

        <div className="bg-gray-100 px-6 py-4 mt-auto">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span className="font-medium">Ai Powered Summary by Informe</span>
            <div className="flex items-center space-x-4">
              <span className="text-gray-400">Source: BSE</span>
              <span className="text-gray-400 hidden md:visible">
                Industry: {newsDetail.stock.industry}
              </span>
            </div>
          </div>
        </div>
        <div className="px-6 py-8 border-t border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Related Articles
          </h3>
          <div className="space-y-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {newsDetail.relatedNews?.map((related: any) => (
                <div
                  key={related.stockNewsId}
                  className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  <h4 className="text-xl font-semibold text-gray-800 mb-4">
                    {related.heading}
                  </h4>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {related.shortSummary}
                  </p>
                  <RelatedArticleLink stockNewsId={related.stockNewsId}>
                    Read More
                  </RelatedArticleLink>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer intenalFooter={false} />
    </div>
  );
};

export default NewsDetail;

export const dynamicParams = true;
