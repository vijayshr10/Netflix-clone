import React, { useEffect, useState } from 'react';
import "./Home.scss";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BiPlay } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";


const apiKey = '13a41f61b8fecebdca9ffed30ac96119';
const url = 'https://api.themoviedb.org/3';
const imgurl = 'https://image.tmdb.org/t/p/original';
const upcoming = 'upcoming';
const nowPlaying = 'now_playing';
const popular = 'popular';
const topRated = 'top_rated';

const Card = ({ img }) => (
    <img className='card' src={img} alt="cover" />
)


const Row = ({ title, arr = [{
    img: "https://cinesite.com/wp-content/uploads/2017/04/avengers-infinity-war-poster-1093756-528x787.jpeg"
}] }) => (
    <div className='row'>
        <h2>{title}</h2>

        <div>
            {
                arr.map((item, index) => (
                    <Card key={index} img={`${imgurl}/${item.poster_path}`} />
                ))
            }

        </div>

    </div>
)

const Home = () => {

    const [upComingMovies, setUpComingMovies] = useState([]);
    const [nowPlayingMovies, setUpNowPlayingMovies] = useState([]);
    const [popularMovies, setUpPopularMovies] = useState([]);
    const [topRatedMovies, setUpTopRatedMovies] = useState([]);
    const [genres, setGenres] = useState([]);




    useEffect(() => {
        const fetchUpcoming = async () => {
            const { data: { results } } = await axios.get(`${url}/movie/${upcoming}?api_key=${apiKey}`);
            setUpComingMovies(results)


        };
        const fetchNowPlaying = async () => {
            const { data: { results } } = await axios.get(`${url}/movie/${nowPlaying}?api_key=${apiKey}`);
            setUpNowPlayingMovies(results)

        };
        const fetchPopular = async () => {
            const { data: { results } } = await axios.get(`${url}/movie/${popular}?api_key=${apiKey}`);
            setUpPopularMovies(results)
            // console.log(results)

        };
        const fetchTopRated = async () => {
            const { data: { results } } = await axios.get(`${url}/movie/${topRated}?api_key=${apiKey}`);
            setUpTopRatedMovies(results)

        };

        const getAllGenre = async () => {
            const { data: { genres } } = await axios.get(`${url}/genre/movie/list?api_key=${apiKey}`);
            setGenres(genres)
            // console.log( genres)

        };


        fetchUpcoming()
        fetchNowPlaying()
        fetchPopular()
        fetchTopRated()
        getAllGenre()
    }, []);


    const randomIndex = Math.floor(Math.random() * popularMovies.length);
    const bannerMovie = popularMovies[randomIndex];


    return (
        <section className="home">
            <div className="banner" style={{
                background: bannerMovie ? `url(${`${imgurl}/${bannerMovie.backdrop_path}`})` : "rgb(16,16,16)"
            }}>
                {bannerMovie && <h1>{bannerMovie.title}</h1>}
                {bannerMovie && <p>{bannerMovie.overview}</p>}

                <div>
                    <button><BiPlay />Play </button>
                    <button>My List <AiOutlinePlus /></button>
                </div>
            </div>



            <Row title={"Upcoming"} arr={upComingMovies} />
            <Row title={"Now Playing"} arr={nowPlayingMovies} />
            <Row title={"Popular"} arr={popularMovies} />
            <Row title={"Top Rated"} arr={topRatedMovies} />


            <div className="genreBox">
                {genres.map((item) => (
                    <Link key={item.id} to={`/genre/${item.id}`}>
                        {item.name}
                    </Link>
                ))}
            </div>


            






        </section>
    )
}

export default Home