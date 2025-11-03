import { Link, useLocation } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import Container from "./Container";
import OTButton from "./OTButton";
import { useState, type JSX } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useDeviceType from "../lib/hooks/useGetDeviceType";

const Home = () => {
  return (
    <main className="p-8 sm:p-0 relative h-full sm:mt-30 mt-10 flex flex-col items-center justify-center">
      <img src="/otbanner.webp" alt="" />
      <div className="mt-10 sm:flex flex flex-col sm:flex-row items-center gap-4">
        <OTButton
          title="Get Tickets"
          lg
          handleClick={() => {
            window.location.href = "/ticket";
          }}
        />
        <OTButton
          title="Sponsor The Event"
          bg="orange"
          lg
          handleClick={() => {
            window.location.href = "/sponsor";
          }}
        />
      </div>

      <div className="mt-20 flex items-center justify-center w-full h-[90px] border-t border-white/15">
        <div className="gap-3 items-center overflow-hidden whitespace-nowrap sm:px-20 ">
          <div className="flex gap-8 animate-marquee">
            <div className="flex items-center justify-center gap-4">
              <p className="sm:text-[30px] text-[24px] text-white/80 font-bold">
                SAVE THE DATE: 28TH NOVEMBER, 2025{" "}
              </p>
              <div className="w-[3px] h-[30px] bg-[#FF7F00]" />
            </div>

            <div className="flex items-center justify-center gap-4">
              <p className="sm:text-[30px] text-[24px] text-white/80 font-bold">
                SAVE THE DATE: 28TH NOVEMBER, 2025{" "}
              </p>
              <div className="w-[3px] h-[30px] bg-[#FF7F00]" />
            </div>

            <div className="flex items-center justify-center gap-4">
              <p className="sm:text-[30px] text-[24px] text-white/80 font-bold">
                SAVE THE DATE: 28TH NOVEMBER, 2025{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

const Ticket = () => {
  return (
    <div>
      <div className="text-center sm:mt-20 mt-10 p-4 sm:p-0">
        <h1
          className={`sm:text-[70px] text-[40px] font-[ClashDisplay] font-bold text-white text-glow-orange leading-[70px] mb-6`}
        >
          Grab your ticket
        </h1>

        <h1
          className={`sm:text-[30px] text-[20px] font-[ClashDisplay] font-bold text-white text-glow-orange sm:leading-[35px] mt-[-1.5rem] mb-4`}
        >
          Unlock access, connect with others, and step into tomorrow.
        </h1>

        <p className="sm:text-[24px] text-[16px] sm:leading-[36px] mb-6 text-white/80">
          From humble meetups to one of the region’s largest tech events, Owerri
          Techies unites talent, creativity, and ambition to shape the future of
          technology. Grab a seat and don’t miss out.
        </p>

        <p className="sm:text-[24px] text-[16px] italic sm:leading-[36px] mb-20 text-white/80">
          (Take a break from your laptop and join us so your brain can rest
          small. ✌)
        </p>
      </div>
    </div>
  );
};

const Sponsor = () => {
  return (
    <div>
      <div className="text-center sm:mt-20 mt-10 p-4 sm:p-0">
        <h1
          className={`sm:text-[70px] text-[40px] font-[ClashDisplay] font-bold text-white text-glow-orange sm:leading-[70px] mb-4`}
        >
          Become a Sponsor
        </h1>

        <h1
          className={`sm:text-[30px] text-[20px] font-[ClashDisplay] font-bold text-white text-glow-orange sm:leading-[70px] mt-[-1.5rem] mb-4`}
        >
          Partner with the community shaping the next wave of technology in
          Owerri.
        </h1>

        <p className="sm:text-[24px] text-[16px] sm:leading-[36px] mb-20 text-white/80">
          Sponsoring Owerri Techies means more than visibility — it connects
          your brand with the developers, designers, and innovators driving
          Owerri’s tech future.
        </p>
      </div>
    </div>
  );
};

const Exhibitor = () => {
  return (
    <div>
      <div className="text-center sm:mt-20 mt-10 p-4 sm:p-0">
        <h1
          className={`sm:text-[70px] text-[40px] font-[ClashDisplay] font-bold text-white text-glow-orange sm:leading-[70px] mb-4`}
        >
          Become an Exhibitor
        </h1>

        <h1
          className={`sm:text-[30px] text-[20px] font-[ClashDisplay] font-bold text-white text-glow-orange sm:leading-[70px] mt-[-1.5rem] mb-4`}
        >
          Have a service/product you want share with the community? Book a
          stand!
        </h1>

        <p className="sm:text-[24px] text-[16px] sm:leading-[36px] mb-20 text-white/80">
          Exhibit at Owerri Techies and showcase your products to a vibrant
          community of developers, designers, and innovators. Connect with
          rising talent, growing businesses, and tech lovers shaping Owerri’s
          future.
        </p>
      </div>
    </div>
  );
};

const Shop = () => {
  return (
    <div>
      <div className="text-center sm:mt-20 mt-10 p-4 sm:mb-20 sm:p-0">
        <h1
          className={`sm:text-[70px] text-[40px] font-[ClashDisplay] font-bold text-white text-glow-orange leading-[70px] mb-6`}
        >
          Shop
        </h1>

        <h1
          className={`sm:text-[30px] text-[20px] font-[ClashDisplay] font-bold text-white text-glow-orange sm:leading-[35px] mt-[-1.5rem] mb-4`}
        >
          Shop Owerri Techies Hangout Merch
        </h1>
      </div>
    </div>
  );
};

const Header = () => {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { isDesktop } = useDeviceType();
  const view: Record<string, JSX.Element> = {
    "/": <Home />,
    "/ticket": <Ticket />,
    "/sponsor": <Sponsor />,
    "/exhibitor": <Exhibitor />,
    // "/shop": <Shop />,
  };

  const content = pathname.startsWith("/shop") ? (
    <Shop />
  ) : (
    view[pathname] ?? <Home />
  );
  
  return (
    <section
      className="bg-[#6A0DAD]"
      style={{
        backgroundImage: "url('/bg.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container>
        <header className="border-b border-white/15 h-[90px] flex items-center justify-between px-8">
          {/* logo */}
          <div
            className="cursor-pointer"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            <img src="/ot.webp" alt="" className="h-[40px]" />
          </div>

          {/* nav */}
          <div className="hidden sm:flex text-white/80 sm:text-[20px] items-center justify-center gap-4">
            <Link to={"/"}>Home</Link>
            <Link to={"/ticket"}>Tickets</Link>
            <Link to={"/sponsor"}>Sponsor</Link>
            {/* <Link to={"/shop"}>Shop</Link> */}
          </div>

          <div
            className="sm:hidden h-10 flex items-center justify-center w-12 bg-white rounded-lg shadow-[4px_4px_1px_#FF7F00] cursor-pointer"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <RxHamburgerMenu size={20} color="#6A0DAD" />
          </div>

          <AnimatePresence>
            {!isDesktop && isOpen && (
              <motion.div
                initial={{ y: "-100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute top-[5.5rem] left-0 right-0 bg-white shadow-md p-4 flex flex-col space-y-3 z-40 font-[ClashDisplay]"
              >
                <a
                  href="/"
                  className="text-[#6A0DAD] font-medium hover:underline"
                >
                  Home
                </a>
                <a
                  href="/ticket"
                  className="text-[#6A0DAD] font-medium hover:underline"
                >
                  Tickets
                </a>
                <a
                  href="/sponsor"
                  className="text-[#6A0DAD] font-medium hover:underline"
                >
                  Sponsor
                </a>
                <a
                  href="/exhibitor"
                  className="text-[#6A0DAD] font-medium hover:underline"
                >
                  Exhibitor
                </a>
              </motion.div>
            )}
          </AnimatePresence>

          {/* access */}
          <div className="hidden sm:block">
            <OTButton
              title="Get Access"
              handleClick={() => {
                window.location.href = "/ticket";
              }}
            />
          </div>
        </header>

        {/* changable banner */}
        {content}
      </Container>
    </section>
  );
};
export default Header;
