import { SparklesCore } from "@/components/ui/sparkles"
import { Button } from "@/components/ui/moving-border";
import "./Landing.css"

function Landing() {
  return (
    <>
    <div className="w-[100vw] h-[100vh] bg-gradient-to-r from-black via-slate-950 to-white flex items-center justify-center gap-[1rem] ">
        <div className="w-[100%]  md:w-[50%]  flex items-center justify-center flex-col border-box p-[1rem]">
            <span className="text-white text-[10vh] md:text-[10vw] shrink-0 ">Music</span>
        <div className="w-full h-[80px] md:h-[120px] overflow-hidden rounded-b-[200px] mb-[4rem]"><SparklesCore background="transparent" particleDensity={300} /></div>
        <Button borderRadius="5rem">
                Listen Now
                </Button>
        </div>
    </div>
    </>
  )
}

export default Landing