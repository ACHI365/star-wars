import { useEffect, useState, createContext } from 'react'
import { HiSearch } from 'react-icons/hi'
import { Routes, Route, NavLink } from 'react-router-dom';
import '../styles/NavBarStyle.css'
import AllFights from './AllFights';
import AnimFights from './AnimFights';
import MovieFights from './MovieFights';
import ShowFights from './ShowFights';

export const Container = createContext();

function NavBar() {
    const [side, setSide] = useState(false);
    const [searchEnable, setSearchEnable] = useState(true);
    const [width, setWidth] = useState(window.innerWidth);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        window.addEventListener("resize", () => setWidth(window.innerWidth));
        if (width > 700) {
            setSearchEnable(true);
        }
        
        if (width > 700 && inputValue !== ''){
            setInputValue('');
            
        }

    }, [width, inputValue]);


    return (
        <Container.Provider value={{ side, inputValue }}>
            <div className='App'>
                <nav id={side ? 'navBarDark' : 'navBarLight'}>
                    <div className='nav-options'>
                        <NavLink to="" >
                            <h1 id={side ? '' : 'heading'}>DuELz</h1>
                        </NavLink>
                        <NavLink to="Movies" style={({ isActive }) => { return { color: isActive ? (side ? '#fff' : '#EE9B00') : (side ? '#EE9B00' : '#fff') } }}>
                            <span id={side ? 'Movies' : 'MoviesLight'}>Movies</span>
                        </NavLink>
                        <NavLink to="TvShows" style={({ isActive }) => { return { color: isActive ? (side ? '#fff' : '#EE9B00') : (side ? '#EE9B00' : '#fff') } }}>
                            <span id={side ? 'Movies' : 'MoviesLight'}>Shows</span>
                        </NavLink>
                        <NavLink to="Animations" style={({ isActive }) => { return { color: isActive ? (side ? '#fff' : '#EE9B00') : (side ? '#EE9B00' : '#fff') } }}>
                            <span id={side ? 'Movies' : 'MoviesLight'}>Animations</span>
                        </NavLink>
                    </div>
                    <div className='input-group'>
                        <HiSearch onClick={() => setSearchEnable(!searchEnable)} fontSize={width > 550 ? 50 : 30} id={side ? "searchButtonWhite" : "searchButtonBlack"} />
                        <input type="text" placeholder="Search For Duels By Duelists" onChange={(e) => setInputValue(e.target.value)} />
                        <HiSearch fontSize={21} id="search" />
                        <div id="Side-switcher" onClick={() => setSide(!side)}>
                            <div id={side ? 'Side-switcher-mover' : 'Side-switcher-moved'}></div>
                        </div>
                    </div>
                </nav>
                <div className={searchEnable ? 'disable' : 'searchBar'} id={side ? "mainColor" : "secondaryColor"}>
                    <input type="text" placeholder="Search For Duels By Duelists" onChange={(e) => setInputValue(e.target.value)} />
                </div>
                <Routes>
                    <Route path='' element={<AllFights />} />
                    <Route path='Movies' element={<MovieFights />} />
                    <Route path='TvShows' element={<ShowFights />} />
                    <Route path='Animations' element={<AnimFights />} />
                </Routes>
              
            </div>
        </Container.Provider>
    )
}

export default NavBar