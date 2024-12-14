import { globalEnums } from "@/enum";
import Link from "next/link";
import React from "react";
import logo from "../../../assets/logo-1.png";
import Image from "next/image";
import { aboutusClicked, disclaimerClicked, emailClicked, facebookClicked, faqsClicked, featuresClicked, homeFtClicked, instagramClicked, linkedinClicked, pricingClicked, privacyClicked, tncClicked, xClicked, youtubeClicked } from "@/events/common/footer-events";
import { logEvent } from "@/events/analytics";
interface FooterProps {
  intenalFooter?: boolean;
}
const Footer: React.FC<FooterProps> = ({ intenalFooter = false }) => {
  const year = new Date().getFullYear();
  const email = emailClicked();
  const x = xClicked();
  const facebook = facebookClicked();
  const linkedin = linkedinClicked();
  const youtube = youtubeClicked();
  const instagram = instagramClicked();
  const about = aboutusClicked();
  const tnc = tncClicked();
  const privacy = privacyClicked();
  const disclaimer = disclaimerClicked();
  const faqs = faqsClicked();
  const pricing = pricingClicked();
  const home = homeFtClicked();
  const features = featuresClicked();

  return (
    <footer className={`${intenalFooter ? "bg-white px-2 md:px-10" : "bg-[#FDF8F1]"} py-10 border-t`}>
      <div className="container mx-auto px-6 md:px-12 lg:px-2">
        <div className="flex flex-col md:flex-row justify-between space-y-8 md:space-y-0">
          <div className="md:w-1/3">
            <Image
              src={logo}
              alt="Informe"
              height={30}
              className="mb-4"
            />
            <p className="text-gray-600 hidden md:flex">
              🌐 Stay ahead with real-time stock updates! 100-word summaries 🗣️,
              add/remove stocks, stay informed! 📲
            </p>
            <p className="mt-4 text-primary font-semibold hidden md:flex">
              <a href="mailto:info@informe.in" className="hover:underline"
                onClick={() => logEvent(email)}>
                info@informe.in
              </a>
            </p>

            <div className="mt-4 space-x-4 flex">
              <Link href="https://x.com/informe_in" aria-label="X" onClick={() => logEvent(x)}>
                <img
                  src="https://img.icons8.com/color/48/000000/twitterx.png"
                  alt="X"
                  className="w-6 h-6"
                />
              </Link>
              <Link href="https://www.facebook.com/people/Informe/61569358967720/" aria-label="Facebook" onClick={() => logEvent(facebook)}>
                <img
                  src="https://img.icons8.com/color/48/000000/facebook-new.png"
                  alt="Facebook"
                  className="w-6 h-6"
                />
              </Link>
              <Link href="https://www.linkedin.com/company/informe-in/" aria-label="LinkedIn" onClick={() => logEvent(linkedin)}>
                <img
                  src="https://img.icons8.com/color/48/000000/linkedin.png"
                  alt="LinkedIn"
                  className="w-6 h-6"
                />
              </Link>
              <Link href="https://www.instagram.com/informe_in/" aria-label="Instagram" onClick={() => logEvent(instagram)}>
                <img
                  src="https://img.icons8.com/color/48/000000/instagram-new.png"
                  alt="YouTube"
                  className="w-6 h-6"
                />
              </Link>
              <Link href="https://www.youtube.com/@informe-in" aria-label="YouTube" onClick={() => logEvent(youtube)}>
                <img
                  src="https://img.icons8.com/color/48/000000/youtube-play.png"
                  alt="YouTube"
                  className="w-6 h-6"
                />
              </Link>
            </div>
          </div>

          <div className="md:w-1/2 flex justify-start md:justify-end space-x-16">
            <div>
              <h3 className="font-bold text-gray-800 mb-3">About</h3>
              <ul className="space-y-2">
                {!intenalFooter &&
                  <li>
                    <a href="/#hero"
                      className="text-gray-600 hover:text-primary"
                      onClick={() => logEvent(home)}>
                      Home
                    </a>
                  </li>
                }
                {!intenalFooter &&
                  <li>
                    <a
                      href="/#features"
                      className="text-gray-600 hover:text-primary"
                      onClick={() => logEvent(features)}
                    >
                      Features
                    </a>
                  </li>
                }
                <li>
                  <a
                    href={intenalFooter ? "/subscriptions" : "/#pricing"}
                    className="text-gray-600 hover:text-primary"
                    onClick={() => logEvent(pricing)}
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a href={intenalFooter ? "/faqs" : "/#faqs"}
                    className="text-gray-600 hover:text-primary"
                    onClick={() => logEvent(faqs)}>
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-800 mb-3">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="about"
                    className="text-gray-600 hover:text-primary cursor-pointer"
                    onClick={() => logEvent(about)}
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="terms-and-conditions"
                    className="text-gray-600 hover:text-primary cursor-pointer"
                    onClick={() => logEvent(tnc)}
                  >
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    href="privacy-policy"
                    className="text-gray-600 hover:text-primary cursor-pointer"
                    onClick={() => logEvent(privacy)}
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="disclaimer"
                    onClick={() => logEvent(disclaimer)}
                    className="text-gray-600 hover:text-primary cursor-pointer"
                  >
                    Disclaimer
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between text-center md:text-left">
          <div className="mt-4 lg:mt-8 text-center text-gray-500">
            &copy; {year} {globalEnums.brandName} All rights reserved
          </div>
          <div className="space-x-2 mt-4 lg:mt-8 text-gray-500 text-center">
            <span role="img" aria-label="flag">
              🇮🇳
            </span>
            <span>Made with love & passion in India</span>
          </div>
        </div>
      </div>
    </footer >
  );
};

export default Footer;
