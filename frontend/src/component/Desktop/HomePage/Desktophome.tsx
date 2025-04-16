

function Desktophome() {
  return (
    <>
    <div className="w-[100vw] h-[100vh] flex items-center   justify-center   bg-black ">
      <div className=" flex justify-center items-start w-[80vw]  gap-[1rem]  relative ">
        <div className=" w-[80px] h-[300px] rounded-[50px] bg-white/10 backdrop-blur-xl   p-[1rem] border-box flex flex-col" ></div>
        <div className="w-[72vw] relative items-center justify-end flex flex-col " >
          <div className=" w-[100%] h-[70vh] bg-white/40 backdrop-blur-3xl  flex rounded-4xl flex-col p-[1rem] gap-[1rem] overflow-y-auto  ">
            <div className="w-full h-[8%]  bg-green-200 shrink-0 " ></div>
            <div className="w-full h-[38%]  bg-green-200 shrink-0 " ></div>
            <div className="w-full h-[48%]  bg-green-200 shrink-0 " ></div>
          </div>
          <div className="w-[90%] h-[14%]  bg-green-700 shrink-0 absolute  right-auto bottom-[-2.5rem] rounded-[30px] " ></div>
        </div>
        <div className="w-[20%] h-[35vh] bg-white/10 backdrop-blur-3xl" ></div>
      </div>
    </div>
    </>
  )
}

export default Desktophome