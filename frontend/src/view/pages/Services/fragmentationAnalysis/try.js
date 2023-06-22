export default function Try(){
    const IMGURL = `${process.env.REACT_APP_DEVICE_MANAGER}/streamer/video_feed`;
return (
<img src={IMGURL} style={{marginLeft: '2rem', marginTop: '1rem',marginBottom: '1rem',marginRight: '2rem', width:'-webkit-fill-available', borderRadius: '20px'}}></img>
)
}