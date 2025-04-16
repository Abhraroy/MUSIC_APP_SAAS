import { useEffect, useRef,useState} from "react";
import WaveSurfer from "wavesurfer.js";

import { IoPauseCircle } from "react-icons/io5";
import { IoPlayCircle } from "react-icons/io5";
import { IoArrowBackCircle } from "react-icons/io5";
import useStore from "../Utils/ZustandStore.js";
import { formatTime } from "../utils/TimeFormat.js";

function SingleMusicCard() {
  const { Play, setPlay,Duration,setDuration,CurrentTime,setCurrentTime} = useStore();

  const waveFormRef = useRef<WaveSurfer | null>(null);
  const waveContainer = useRef(null);

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
        barGap: 2,
        barWidth: 5,
        barRadius:10,
        barHeight:1,
        dragToSeek:true
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
      <div className="flex md:hidden w-[100dvw] h-[100dvh] bg-[#4b4a54] m-0 p-0 box-border justify-center items-center">
        <div className="w-[90%] h-[90%] bg-[#a3cfcd]/10 backdrop-blur-md shadow-xl rounded-[30px] flex flex-col justify-between box-border">
          <div className="w-[100%] p-[1.5rem] text-5xl">
            <IoArrowBackCircle />
          </div>
          <div className=" w-[100%] flex flex-col gap-4 p-3 box-border"> 
            <div className="bg-amber-50 p-4 box-border rounded-3xl">
          <span className="text-2xl">Song name</span>
            <div
              ref={waveContainer}
              className="w-[100%] rounded-[20px]"
            >
            </div>
            <div className=" flex flex-row justify-between items-center">
                <span className="text-2xl">{CurrentTime}</span>
                <span className="text-2xl">{Duration}</span>
            </div>
            </div>
            <div className="flex w-[100%] h-[100px] bg-white rounded-[20px] items-center justify-center text-7xl">
              {Play ? (
                <IoPlayCircle className="text-15xl text-yellow-400" onClick={() => handlePlayer()} />
              ) : (
                <IoPauseCircle onClick={() => handlePlayer()} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleMusicCard;
