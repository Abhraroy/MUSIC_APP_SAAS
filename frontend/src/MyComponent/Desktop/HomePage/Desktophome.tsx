
import {formatTime} from "../../utils/TimeFormat"
import { useEffect, useRef} from "react";
import WaveSurfer from "wavesurfer.js";
import useStore from "../../utils/ZustandStore";
import { IoPauseCircle } from "react-icons/io5";
import { IoPlayCircle } from "react-icons/io5";
// import { WobbleCard } from "@/components/ui/wobble-card.js";
// import {
//   Navigation,
//   Pagination,
//   Scrollbar,
//   A11y,
//   EffectCards,
//   EffectCreative,
//   Autoplay,
//   Mousewheel
// } from "swiper/modules";

// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/scrollbar";
// import "swiper/css/effect-cards";
// import "swiper/css/bundle";
// import { TfiArrowCircleLeft } from "react-icons/tfi";
// import { TfiArrowCircleRight } from "react-icons/tfi";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input.js";
import { GoHome } from "react-icons/go";
import { SlEvent } from "react-icons/sl";
// import Home from "../DesktopComponent/Home.js";
// import Collection from "../DesktopComponent/Collection.js";
import { useNavigate } from "react-router-dom";
import { RiFolderMusicLine } from "react-icons/ri";
import { PinContainer } from "@/components/ui/3d-pin.js";
import { FloatingDock } from "@/components/ui/floating-dock.js";
import { BsSpotify } from "react-icons/bs";
import { FaInstagramSquare } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import axios from "axios";
// import axios from "axios";






function Desktophome(props: { MainElement?: React.ReactNode }) {
  const { MainElement } = props;
  const { Play, setPlay,Duration,setDuration,CurrentTime,setCurrentTime,track,pageNo,setpageNo} = useStore();

  const waveFormRef = useRef<WaveSurfer | null>(null);
  const waveContainer = useRef(null);
  const  NavArrbutton = [ GoHome,RiFolderMusicLine,SlEvent]
  const navigate = useNavigate()

  const links = [
    {
      title: "Instagram",
      icon: (
        <FaInstagramSquare />
      ),
      href: "#",
    },
 
    {
      title: "Spotify",
      icon: (
        <BsSpotify />
      ),
      href: "#",
    },
    {
      title: "Youtube",
      icon: (
        <FaYoutube />
      ),
      href: "#",
    },
    {
      title: "Tiktok",
      icon: (
        <FaTiktok />
      ),
      href: "#",
    },
  ]

  useEffect(()=>{
    const fetchMusic = async()=>{
      const result = await axios.get('/music')
      if(result){
        console.log(result)
      }else{
        console.log("Error while fetching music")
      }
    }
    fetchMusic()
  })
  

  useEffect(() => {
    if (waveContainer.current) {
      waveFormRef.current = WaveSurfer.create({
        container: waveContainer.current,
        waveColor: "black",
        progressColor: "white",
        backend: "MediaElement", // Important!
        url: track,
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
        const totalSecond = waveFormRef.current?.getDuration();
        if (totalSecond !== undefined) {
          setDuration(formatTime(totalSecond));
        }
    })

    waveFormRef.current?.on('audioprocess',()=>{
        setCurrentTime(formatTime(waveFormRef.current?.getCurrentTime() ?? 0))
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


  const handleNavigation = (i: number)=>{
    if(i < 0){
      i=2
    }else if(i>1){
      i=0
    }
    setpageNo(i)
    if(i===0){
      navigate('/home')
      console.log("Mavigated to home",i);
      
    }else if(i===1){
      navigate('/collection')
      console.log("Mavigated to collection",i);
    }
  }









  return (
    <>
    <div className="w-[100vw] h-[100vh] flex items-center   justify-center  bg-[url('https://codetheweb.blog/assets/img/posts/css-advanced-background-images/cover.jpg')] ">
      <div className=" flex justify-center items-start w-[80vw]  gap-[1rem]  relative ">







        <div className=" w-[80px] h-[300px] rounded-[50px] bg-white/10 backdrop-blur-xl gap-[1rem]  p-[1rem] border-box flex flex-col items-center justify-start shrink-0 " >
        {
      NavArrbutton.map((Icon, index) => (
      <Icon key={index} className="text-white text-5xl bg-black/50 hover:bg-white/50 hover:backdrop-blur-xl  rounded-xl p-[0.7rem] border-box " onClick={() => handleNavigation(Number(index))} />
    ))
      }

        </div>










        <div className="w-[62vw] relative items-center justify-end flex flex-col shrink-0 " >

          <div className=" w-[100%] h-[75vh] bg-white/10 backdrop-blur-3xl  flex rounded-2xl flex-col p-[1.2rem] gap-[1rem] overflow-y-scroll  ">
            <div className="w-full h-[8%] shrink-0 flex gap-[2rem] items-center justify-start border-box pl-[2rem] pr-[2rem] " >
            <div className="flex gap-[1rem]  " >
              <IoIosArrowBack className="text-white text-4xl bg-black/10 backdrop-blur-3xl rounded-[100px] p-[7px] hover:bg-black/30 " fill="white" onClick={()=>handleNavigation(pageNo-1)} />
              <IoIosArrowForward className="text-white text-4xl bg-black/10 backdrop-blur-3xl rounded-[100px] p-[7px] hover:bg-black/30 " fill="white" onClick={()=>handleNavigation(pageNo+1)} />
            </div>
            <div className=" w-[600px] h-full p-[1rem] border-box  flex items-center justify-center " >
              <PlaceholdersAndVanishInput 
                placeholders={[' What would you like to listen to']} 
                onChange={(e) => console.log('Input changed:', e.target.value)} 
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log('Form submitted');
                }}
              />
            </div>
            </div>
            
              {MainElement && MainElement}
          </div>
            



          <div className="w-[90%] h-[16%]  bg-white/50 backdrop-blur-3xl  shrink-0 absolute  right-auto bottom-[-2.5rem] rounded-[30px] p-[0.8rem] flex flex-row gap-[1rem] " >
            <div className=" w-[250px] h-full bg-yellow-700 rounded-[15px] flex gap-[5px] items-center  " >
              <div className="bg-white h-full w-[40%] rounded-[15px] " ></div>
              <span className="w-[50%] overflow-hidden text-ellipsis whitespace-nowrap">
              </span>

            </div>
            <div className=" w-[500px] h-full items-end justify-center flex flex-col p-[1rem] gap-[5px] ">
              <div className="flex w-[100%]  rounded-[20px] items-center justify-center text-5xl">
                            {Play ? (
                              <IoPlayCircle className="text-15xl text-white-400" onClick={() => handlePlayer()} />
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







        <div className="w-[20%] h-[50vh] bg-white/10 backdrop-blur-3xl flex items-center justify-between relative flex-col gap-[2rem] border-box p-[1rem] rounded-2xl shrink-0 " >
        
        <PinContainer
        title="STORM-MUSIC"
        href="http://localhost:5173/"
        >
          <div className="h-[25vh] w-[250px]  bg-yellow-300 relative " >
            <img src="https://github.com/shadcn.png" ></img>
          </div>
        </PinContainer>
        <div className=" w-[100%] h-fit border-box p-[1rem] " >
          <FloatingDock desktopClassName = " translate-y-[20px] gap-[5px] flex items-center justify-center bg-transparent" items={links} />
        </div>
      </div>
    </div>
    </div>
    </>
  )
}

export default Desktophome