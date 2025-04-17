import { BsLinkedin, BsTwitter } from "react-icons/bs";
import { CiMail } from "react-icons/ci";
import { FaGithub } from "react-icons/fa6";


const Footer = () => {
  return (
    <footer className="bg-gray-50 py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-serif font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-950 via-purple-600 to-fuchsia-500 mb-4">ShopArt</h3>
            <p className="text-base text-gray-400 font-roboto font-semibold max-w-md">
              Your one-stop shop for curated essentials.
              Shop smarter. Live brighter. Only at ShopArt.
              From everyday must-haves to unique treasures,
              We bring inspiration to your doorstep.
            </p>

            <div className="flex items-center space-x-4 mt-6">
              <a href="#" className="hover:text-primary transition-colors">
                <FaGithub size={20} />
              </a>
              <a href="#" className=" hover:text-primary transition-colors">
                <BsTwitter size={20} />
              </a>
              <a href="#" className=" hover:text-primary transition-colors">
                <BsLinkedin size={20} />
              </a>
              <a href="#" className=" hover:text-primary transition-colors">
                <CiMail size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4 font-lato">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 text-lg hover:text-gray-800 ">Home</a></li>
              <li><a href="#" className="text-gray-400 text-lg hover:text-gray-800 ">About Us</a></li>
              <li><a href="#" className="text-gray-400 text-lg hover:text-gray-800 ">Topics</a></li>
              <li><a href="#" className="text-gray-400 text-lg hover:text-gray-800 ">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 font-lato">Categories</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 text-lg hover:text-gray-800 ">Technology</a></li>
              <li><a href="#" className="text-gray-400 text-lg hover:text-gray-800 ">Science</a></li>
              <li><a href="#" className="text-gray-400 text-lg hover:text-gray-800 ">Health</a></li>
              <li><a href="#" className="text-gray-400 text-lg hover:text-gray-800 ">Business</a></li>
              <li><a href="#" className="text-gray-400 text-lg hover:text-gray-800 ">Lifestyle</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} AI Scribe. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;