import { globalEnums } from "@/enum";
import React from "react";

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-white py-10 border-t">
      <div className="container mx-auto px-6 md:px-12 lg:px-2">
        <div className="flex flex-col md:flex-row justify-between space-y-8 md:space-y-0">
          <div className="md:w-1/3">
            <img
              src="/path-to-logo.png"
              alt={globalEnums.brandName}
              className="mb-4"
            />
            <p className="text-gray-600 hidden md:flex">
              🌐 Stay ahead with real-time BSE updates! 100-word summaries 🗣️,
              add/remove stocks, stay informed! 📲
            </p>
            <p className="mt-4 text-blue-600 font-semibold hidden md:flex">
              info@informe.in
            </p>

            <div className="mt-4 space-x-4 flex">
              <a href="#" aria-label="Facebook" className="hover:text-blue-500">
                <img
                  src="https://img.icons8.com/color/48/000000/facebook-new.png"
                  alt="Facebook"
                  className="w-6 h-6"
                />
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-blue-500">
                <img
                  src="https://img.icons8.com/color/48/000000/twitter.png"
                  alt="Twitter"
                  className="w-6 h-6"
                />
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:text-blue-500">
                <img
                  src="https://img.icons8.com/color/48/000000/linkedin.png"
                  alt="LinkedIn"
                  className="w-6 h-6"
                />
              </a>
              <a href="#" aria-label="YouTube" className="hover:text-blue-500">
                <img
                  src="https://img.icons8.com/color/48/000000/youtube-play.png"
                  alt="YouTube"
                  className="w-6 h-6"
                />
              </a>
              <a href="#" aria-label="TikTok" className="hover:text-blue-500">
                <img
                  src="https://img.icons8.com/color/48/000000/tiktok.png"
                  alt="TikTok"
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
                  <a href="#" className="text-gray-600 hover:text-blue-600">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-blue-600">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-blue-600">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-blue-600">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-800 mb-3">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-blue-600">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-blue-600">
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-blue-600">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between text-center md:text-left">
          <div className="mt-4 lg:mt-8 text-center text-gray-500">
            &copy; {year} {globalEnums.brandName}
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
