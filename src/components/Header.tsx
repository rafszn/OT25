import { Link, useLocation } from "react-router-dom";
import Container from "./Container";
import OTButton from "./OTButton";
import type { JSX } from "react";

const Home = () => {
  return (
    <main className="p-8 sm:p-0 relative h-full sm:mt-30 mt-10 flex flex-col items-center justify-center">
      <img src="/otbanner.svg" alt="" />
      <div className="mt-10 sm:flex flex flex-col sm:flex-row items-center gap-4">
        <OTButton title="Get Tickets" lg />
        <OTButton title="Sponsor The Event" bg="orange" lg />
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

        {/* <div className="flex items-center justify-center gap-4">
              <p className="text-[30px] text-white/80 font-bold">
                SAVE THE DATE: 28TH NOVEMBER, 2025{" "}
              </p>
              <div className="w-[3px] h-[30px] bg-[#FF7F00]" />
            </div> */}
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

const Header = () => {
  const { pathname } = useLocation();
  console.log(pathname);
  const view: Record<string, JSX.Element> = {
    "/": <Home />,
    "/tickets": <Ticket />,
    "/sponsors": <Sponsor />,
  };
  return (
    <section
      className="bg-[#6A0DAD]"
      style={{
        backgroundImage: "url('/bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container>
        <header className="border-b border-white/15 h-[90px] flex items-center justify-between px-8">
          {/* logo */}
          <div>
            <img src="/ot.svg" alt="" className="h-[40px]" />
          </div>

          {/* nav */}
          <div className="flex text-white/80 sm:text-[20px] items-center justify-center gap-4">
            <Link to={"/"}>Home</Link>
            <Link to={"/tickets"}>Tickets</Link>
            <Link to={"/sponsors"}>Sponsors</Link>
          </div>

          {/* access */}
          <div className="hidden sm:block">
            <OTButton title="Get Access" />
          </div>
        </header>

        {/* changable banner */}
        {view[pathname]}
      </Container>
    </section>
  );
};
export default Header;
