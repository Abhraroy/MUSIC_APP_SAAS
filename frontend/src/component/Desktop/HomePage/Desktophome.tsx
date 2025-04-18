import { formatTime } from "@/Component/utils/TimeFormat";
import { useEffect, useRef,useState} from "react";
import WaveSurfer from "wavesurfer.js";
import useStore from "../../utils/ZustandStore.js";
import { IoPauseCircle } from "react-icons/io5";
import { IoPlayCircle } from "react-icons/io5";
import { WobbleCard } from "@/components/ui/wobble-card.js";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectCards,
  EffectCreative,
  Autoplay,
  Mousewheel
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-cards";
import "swiper/css/bundle";
import { TfiArrowCircleLeft } from "react-icons/tfi";
import { TfiArrowCircleRight } from "react-icons/tfi";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input.js";
import { GoHome } from "react-icons/go";
import { SlEvent } from "react-icons/sl";
import Home from "../DesktopComponent/Home.js";
import Collection from "../DesktopComponent/Collection.js";





function Desktophome() {
  const { Play, setPlay,Duration,setDuration,CurrentTime,setCurrentTime} = useStore();

  const waveFormRef = useRef<WaveSurfer | null>(null);
  const waveContainer = useRef(null);
  const NavArrbutton = [ GoHome,SlEvent]










  useEffect(() => {
    if (waveContainer.current) {
      waveFormRef.current = WaveSurfer.create({
        container: waveContainer.current,
        waveColor: "gray",
        progressColor: "yellowgreen",
        backend: "MediaElement", // Important!
        url: "http://res.cloudinary.com/dplie14tc/video/upload/v1744486888/media/audio/lcltjvdfbk5enwqz7jd0.mp3",
        interact: true,
        cursorWidth: 0,
        barGap:0,
        barWidth:1,
        barRadius:4,
        barHeight:3,
        dragToSeek:true,
        height:25,
        // normalize:true
      });
    waveFormRef.current?.on('ready',()=>{
        const totalSecond = waveFormRef.current?.getDuration()
        setDuration(formatTime(totalSecond))
    })

    waveFormRef.current?.on('audioprocess',()=>{
        setCurrentTime(formatTime(waveFormRef.current?.getCurrentTime()))
    })
    
    waveFormRef.current?.on('finish', () => {
      setPlay();
    });
    }
   
    return () => {
      waveFormRef.current && waveFormRef.current.destroy();
    };
  }, []);

  const handlePlayer = () => {
    setPlay();
    Play ? waveFormRef.current?.play() : waveFormRef.current?.pause();

  };












  return (
    <>
    <div className="w-[100vw] h-[100vh] flex items-center   justify-center   bg-black ">
      <div className=" flex justify-center items-start w-[80vw]  gap-[1rem]  relative ">







        <div className=" w-[80px] h-[300px] rounded-[50px] bg-white/10 backdrop-blur-xl gap-[1rem]  p-[1rem] border-box flex flex-col items-center justify-start" >
        {
      NavArrbutton.map((Icon, index) => (
      <Icon className="text-white text-5xl bg-transparent hover:bg-white/10 hover:backdrop-blur-xl  rounded-xl p-[0.5rem] border-box " />
    ))
      }

        </div>










        <div className="w-[72vw] relative items-center justify-end flex flex-col " >



          <div className=" w-[100%] h-[75vh] bg-white/40 backdrop-blur-3xl  flex rounded-4xl flex-col p-[1.2rem] gap-[1rem] overflow-y-scroll  ">
            <div className="w-full h-[8%]  bg-green-200 shrink-0 flex items-center justify-between " >
            <div className=" w-[600px] h-full p-[1rem] border-box bg-yellow-900 flex items-center justify-center " >
              <PlaceholdersAndVanishInput 
                placeholders={['🔍 What would you like to listen to']} 
                onChange={(e) => console.log('Input changed:', e.target.value)} 
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log('Form submitted');
                }}
              />
            </div>


            </div>
            {/* <div className="w-full h-[38%]  bg-green-200 shrink-0 " ></div>
            <div className="w-full h-[48%]  shrink-0 border-box flex flex-row gap-[0.5rem]  overflow-y-hidden" >
            <Swiper
          modules={[
            Navigation,
            Pagination,
            Scrollbar,
            A11y,
            EffectCreative,
            Autoplay,
            Mousewheel
          ]}
          speed={400}
          slidesPerView={4}
          // effect="creative"
          // initialSlide={2}
          // slidesOffsetBefore={0}
          // slidesOffsetAfter={0}
          // creativeEffect={{
          //   perspective: true,
          //   prev: {
          //     translate: [-115, 0,-500],
          //   },
          //   next: {
          //     translate: [115, 0,-500],
          //   },
          //   limitProgress: 2,
          // }}
          navigation={true}
          loop={true}
          loopAdditionalSlides={2}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
          className="text-black flex items-center justify-center h-full w-full"
        >
            <SwiperSlide className="p-[3px] " ><WobbleCard containerClassName=" shrink-0 w-[300px] h-full  bg-white/40 backdrop-blur-3xl"></WobbleCard> </SwiperSlide>

        </Swiper>





















             
              
              </div>
              <div className="w-full h-[38%]  bg-green-200 shrink-0 " ></div>      */}
              {/* <Home /> */}
              <Collection />
          </div>




          <div className="w-[90%] h-[16%]  bg-green-700 shrink-0 absolute  right-auto bottom-[-2.5rem] rounded-[30px] p-[0.8rem] flex flex-row gap-[1rem] " >
            <div className=" w-[250px] h-full bg-yellow-700 rounded-[15px] " ></div>
            <div className=" w-[500px] h-full items-end justify-center flex flex-col bg-white p-[1rem] gap-[5px] ">
              <div className="flex w-[100%]  bg-white rounded-[20px] items-center justify-center text-5xl">
                            {Play ? (
                              <IoPlayCircle className="text-15xl text-yellow-400" onClick={() => handlePlayer()} />
                            ) : (
                              <IoPauseCircle onClick={() => handlePlayer()} />
                            )}
              </div>

              <div className="flex gap-[10px] w-full  " >
                <span className="text-[1.2rem]" >{CurrentTime}</span>
                <div
                  ref={waveContainer}
                  className="w-[400px]  rounded-[20px]  "
                >
                </div>
                <span className="text-[1.2rem]" >{Duration}</span>
              </div>
            </div>
          </div>
        </div>







        <div className="w-[20%] h-[35vh] bg-white/10 backdrop-blur-3xl" ></div>
      </div>
    </div>
    </>
  )
}

export default Desktophome