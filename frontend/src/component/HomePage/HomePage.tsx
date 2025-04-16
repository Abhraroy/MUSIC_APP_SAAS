import { AuroraBackground } from "@/components/ui/aurora-background";
import { BackgroundLines } from "@/components/ui/background-lines";
import ColourfulText from "@/components/ui/colourful-text";
import SwiperCaraousel from "../Utility_Component/SwiperCaraousel";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import CountDown from "../Utility_Component/CountDown";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/moving-border";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { BiAlarm } from "react-icons/bi";

function HomePage() {
  const words = "Upcoming Song Countdown";
  const navItems = [
    {
      name: "Home",
      link: "/",
      icon:(
        <BiAlarm />
      )
    },
    {
      name: "About",
      link: "/about",
      icon:(
        <BiAlarm />
      )
    },
    {
      name: "Contact",
      link: "/contact",
      icon:(
        <BiAlarm />
      )
    },
  ];
  return (
    <>
      <AuroraBackground className="bg-black h-fit">
        <div className="bg-transparent w-[100dvw] flex flex-col gap-[1.5rem] p-[1rem] items-center border-box ">
            
          <div className="bg-red-200 w-full h-[70px]">
          {/* <FloatingNav navItems={navItems} /> */}
          </div>
          <span className="w-full flex items-center justify-center text-2xl">
            <ColourfulText text=" — More Than Just Music." />
          </span>
          <SwiperCaraousel />
          <span className="text-white text-3xl block">Hello</span>
          <div className="w-full p-[1rem] bg-white/10 backdrop-blur-3xl rounded-2xl flex items-center justify-center">
            <CountDown />
          </div>
          <div className="w-full h-[400px] bg-amber-200 rounded-br-[100px] rounded-tl-[100px]"></div>

          <div className="bg-yellow-400 w-[100%] flex items-center justify-start">
            <Avatar>
              <AvatarImage
                src="https://github.com/shadcn.png"
                className="w-[70px] h-[70px] rounded-3xl object-contain bg-amber-100"
              ></AvatarImage>
            </Avatar>
            <div></div>
          </div>
          <div className="bg-yellow-400 w-[100%] flex items-center justify-start">
            <Avatar>
              <AvatarImage
                src="https://github.com/shadcn.png"
                className="w-[70px] h-[70px] rounded-3xl object-contain bg-amber-100"
              ></AvatarImage>
            </Avatar>
            <div></div>
          </div>
          <div className="w-full h-[100px] flex items-center justify-center">
            
            <Button>
                Listen Now
                </Button></div>          
        </div>
        <div className="w-full h-[100px] bg-gradient-to-t from-white via via-blue-950 to-black">ghdhd</div>
      </AuroraBackground>
    </>
  );
}

export default HomePage;
