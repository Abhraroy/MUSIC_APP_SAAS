import {create} from "zustand"


const useStore = create<{
    musicName:string,
    user:string,
    Play:Boolean,
    Duration:string,
    CurrentTime:string,
    track:string,
    pageNo:number,
    musicList:any[],
    setMusic:(music:string)=>void,
    setPlay:()=>void,
    setDuration:(time:string | undefined)=>void,
    setCurrentTime:(time:string | undefined)=>void,
    setTrack:(track:string | undefined) =>void,
    setpageNo:(index:number)=>void
    setMusicList:(music:any)=>void
}>((set) => ({
    musicName: "",
    user: '',
    Play:true,
    Duration:'',
    CurrentTime:'00:00',
    track:"",
    pageNo:0,
    musicList:[],
    setMusic: (music:string) => set({ musicName: music }),
    setUser:(user:string)=>set({user:user}),
    setPlay: () => set((state) => ({ Play: !state.Play })),
    setDuration:(time)=>set({Duration:time}),
    setCurrentTime:(time)=>set({CurrentTime:time || "00:00"}),
    setTrack:(track)=>set({track:track}),
    setpageNo:(index:number)=>set({pageNo:index}),
    setMusicList:(music:any)=>set({musicList:music})
}))

export default useStore