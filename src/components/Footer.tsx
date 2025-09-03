import { Link } from "react-router-dom";
import Container from "./Container";
import OTButton from "./OTButton";
import OTText from "./OTText";

const Footer = () => {
  return (
    <footer
      className="sm:h-[700px] bg-[#6A0DAD]"
      style={{
        backgroundImage: "url('/bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container>
        <div className="sm:my-20 mt-10 mb-20 sm:h-[204px] sm:flex px-4 sm:px-0">
          <div className="flex-1/2 flex flex-col items-start justify-end">
            <img src="/ot.svg" className="w-[250px]" alt="" />
            <p className="text-[16px] text-white justify-end mt-8">
              Owerri Techies Community is out to make Imo state a hub for Tech
              and Creative innovation and adoption, where individuals and
              businesses can access resources, support, and opportunities to
              succeed.
            </p>
          </div>

          <div className="flex-1/2 flex flex-col sm:items-end items-start mt-12 sm:mt-0 sm:justify-end">
            <OTButton
              title="Get Access"
              handleClick={() => {
                window.location.href = "/tickets";
              }}
            />
            <div className="text-white/80 text-[20px] flex items-center justify-center gap-4 sm:mt-16 mt-4">
              <Link to={"/"}>Home</Link>
              <Link to={"/tickets"}>Tickets</Link>
              <Link to={"/sponsors"}>Sponsors</Link>
            </div>
          </div>
        </div>

        <div className="hidden sm:flex items-center justify-between sm:px-20 ">
          <OTText title="Connect" bg="white_orange" />
          <div className="w-6 h-6 bg-[#FF7F00] rounded-full" />
          <OTText title="Learn" bg="white_orange" />
          <div className="w-6 h-6 bg-[#FF7F00] rounded-full" />
          <OTText title="Unwind" bg="white_orange" />
        </div>

        <div className="sm:hidden gap-3 items-center overflow-hidden whitespace-nowrap sm:px-20 ">
          <div className="flex gap-8 animate-marquee">
            <span className="flex items-center gap-4">
              <OTText title="Connect" bg="white_orange" />
              <div className="w-6 h-6 bg-[#FF7F00] rounded-full" />
              <OTText title="Learn" bg="white_orange" />
              <div className="w-6 h-6 bg-[#FF7F00] rounded-full" />
              <OTText title="Unwind" bg="white_orange" />
            </span>
            <span className="flex items-center gap-4">
              <div className="w-6 h-6 bg-[#FF7F00] rounded-full" />
              <OTText title="Connect" bg="white_orange" />
              <div className="w-6 h-6 bg-[#FF7F00] rounded-full" />
              <OTText title="Learn" bg="white_orange" />
              <div className="w-6 h-6 bg-[#FF7F00] rounded-full" />
              <OTText title="Unwind" bg="white_orange" />
            </span>
          </div>
        </div>

        <div className="mt-10 hidden sm:block">
          <img src="/x.svg" alt="" />
        </div>

        <div className="mt-3 p-4 sm:p-0 sm:flex sm:flex-row flex flex-col sm:items-center sm:justify-between sm:gap-0 gap-4">
          <div className="flex items-center gap-2">
            <img src="/x.svg" alt="" className="sm:hidden" />
            <img src="/ig.svg" alt="" />
            <img src="/li.svg" alt="" />
          </div>

          <div className="text-[16px] text-white flex flex-col sm:items-center justify-center">
            <p>© 2025 — Copyright</p>
            <p>All Rights reserved</p>
          </div>

          <div className="text-[16px] text-white flex flex-col sm:items-end justify-end pb-8 sm:pb-0">
            <p>Privacy Policy</p>
            <p>Terms of Service</p>
          </div>
        </div>
      </Container>
    </footer>
  );
};
export default Footer;
