import Fights from "../Data/Movies.json"
import { AiFillPlayCircle, AiOutlineClose } from 'react-icons/ai'
import '../styles/Videos.css'
import { Container } from "./NavBar"
import { useContext, useEffect, useRef, useState } from "react"

function AllFights() {
  const { side, inputValue } = useContext(Container)
  const input = inputValue;
  const [trailer, setTrailer] = useState(true);
  const [link, setLink] = useState('');
  const videoRef = useRef();

  const FightTitle = (fight) => {
    setTrailer(!trailer);
    setLink(fight.link)
    console.log(link)
  }

  useEffect(() => {
    const handler = (e) => {
      if(!videoRef.current.contains(e.target)){
        setTrailer(true);
      }
    };

    document.addEventListener("mousedown", handler);
  })
  return (
    <body className={side ? "mainBgColor" : "secondaryBgColor"}>
      <div>
        <div>
          <div className="movies-container">
            {Fights.filter(fight => fight.title.toLowerCase().includes(input)).map((fight) => {
              return (
                <div>
                  <div id={trailer ? 'container' : 'NoContainer'}>
                    <AiFillPlayCircle FillPlayCircle color='white' fontSize={40} id={trailer ? "playIcon" : "hide"} onClick={() => FightTitle(fight)} />
                    <img src={process.env.PUBLIC_URL + fight.img} alt={fight.title} onClick={() => FightTitle(fight)} />
                    <h3 id={fight.title.length > 28 ? 'smaller-Text' : ''}>{fight.title}</h3>
                  </div>
                </div>
              )
            })}
            <div className={!trailer ? "video-container" : "hide"}>
              <iframe ref={videoRef} width={'1000px'} height={'500px'}
                src={"https://www.youtube.com/embed/" + link} title="youtube" allowFullScreen></iframe>
              <AiOutlineClose id={!trailer ? 'Exit1' : 'Nothing'} className={side ? 'DarkTheme' : 'LightThemeClose'} fontSize={55} cursor="pointer" onClick={() => setTrailer(true)} />
            </div>
          </div>
        </div>
      </div>
    </body>
  )
}

export default AllFights