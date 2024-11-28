import { globalEnums } from "@/enum";
import Link from "next/link";
import React from "react";
import logo from "../../../assets/logo-1.png";
import Image from "next/image";
interface FooterProps {
  intenalFooter?: boolean;
}
const Footer: React.FC<FooterProps> = ({ intenalFooter = false }) => {
  const year = new Date().getFullYear();

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
              🌐 Stay ahead with real-time BSE updates! 100-word summaries 🗣️,
              add/remove stocks, stay informed! 📲
            </p>
            <p className="mt-4 text-primary font-semibold hidden md:flex">
              info@informe.in
            </p>

            <div className="mt-4 space-x-4 flex">
              <a href="#" aria-label="X">
                <img
                  src="https://img.icons8.com/color/48/000000/twitterx.png"
                  alt="Twitter"
                  className="w-6 h-6"
                />
              </a>
              <a href="#" aria-label="Facebook">
                <img
                  src="https://img.icons8.com/color/48/000000/facebook-new.png"
                  alt="Facebook"
                  className="w-6 h-6"
                />
              </a>
              <a href="#" aria-label="LinkedIn">
                <img
                  src="https://img.icons8.com/color/48/000000/linkedin.png"
                  alt="LinkedIn"
                  className="w-6 h-6"
                />
              </a>
              <a href="#" aria-label="YouTube">
                <img
                  src="https://img.icons8.com/color/48/000000/youtube-play.png"
                  alt="YouTube"
                  className="w-6 h-6"
                />
              </a>
            </div>
          </div>

          <div className="md:w-1/2 flex justify-start md:justify-end space-x-16">
            <div>
              <h3 className="font-bold text-gray-800 mb-3">About</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/#hero" className="text-gray-600 hover:text-primary">
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/#features"
                    className="text-gray-600 hover:text-primary"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="/#pricing"
                    className="text-gray-600 hover:text-primary"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="/#faqs" className="text-gray-600 hover:text-primary">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-800 mb-3">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-primary">
                    Contact Us
                  </a>
                </li>
                <li>
                  <Link
                    href="terms-and-conditions"
                    className="text-gray-600 hover:text-primary cursor-pointer"
                  >
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    href="privacy-policy"
                    className="text-gray-600 hover:text-primary cursor-pointer"
                  >
                    Privacy
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
    </footer>
  );
};

export default Footer;
