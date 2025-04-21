import {create} from "zustand"


const useStore = create<{
    musicName:String,
    user:String,
    Play:Boolean,
    Duration:String,
    CurrentTime:String,
    track:String,
    pageNo:Number,
    setMusic:(music:String)=>void,
    setPlay:()=>void,
    setDuration:(time:String | undefined)=>void,
    setCurrentTime:(time:String | undefined)=>void,
    setTrack:(track:String | undefined) =>void,
    setpageNo:(index:Number)=>void
}>((set) => ({
    musicName: "",
    user: '',
    Play:true,
    Duration:'',
    CurrentTime:'00:00',
    track:"",
    pageNo:0,
    setMusic: (music:String) => set({ musicName: music }),
    setUser:(user:String)=>set({user:user}),
    setPlay: () => set((state) => ({ Play: !state.Play })),
    setDuration:(time)=>set({Duration:time}),
    setCurrentTime:(time)=>set({CurrentTime:time || "00:00"}),
    setTrack:(track)=>set({track:track}),
    setpageNo:(index:Number)=>set({pageNo:index})
}))

export default useStore