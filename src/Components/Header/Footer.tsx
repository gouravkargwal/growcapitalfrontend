import React from "react";

// You can replace the logo path and social media icons with your own assets.
const Footer: React.FC = () => {
  return (
    <footer className="bg-white py-10 border-t">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex flex-col md:flex-row justify-between space-y-8 md:space-y-0">
          {/* Left Section (Logo and Description) */}
          <div className="md:w-1/3">
            <img
              src="/path-to-logo.png" // Replace with your logo path
              alt="GrowCapital logo"
              className="mb-4"
            />
            <p className="text-gray-600">
              The ultimate automation tool for traders, enabling seamless trade
              copying solutions to MetaTrader and crypto platforms.
            </p>
            <p className="mt-4 text-blue-600 font-semibold">
              info@GrowCapital.ai
            </p>

            {/* Social Media Icons */}
            <div className="mt-4 flex space-x-4">
              {/* Replace these with the proper paths to your icons */}
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

          {/* Links Section */}
          <div className="md:w-1/2 flex justify-between space-x-8">
            {/* About Section */}
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

            {/* Company Section */}
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

            {/* Other Section */}
            <div>
              <h3 className="font-bold text-gray-800 mb-3">Other</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-blue-600">
                    Sign Up
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-blue-600">
                    Log In
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-blue-600">
                    Blogs
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 text-center text-gray-500">
          &copy; 2024 GrowCapital
        </div>
      </div>
    </footer>
  );
};

export default Footer;
