import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import { jwtDecode } from 'jwt-decode';

const Home = () => {
    const [query, setQuery] = useState('');
    const [tracks, setTracks] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;

            if (decodedToken.exp < currentTime) {
                localStorage.removeItem('token');
                setLoggedIn(false); 
            } else {
                setLoggedIn(true);
            }
        }
    }, []);


    const fetchMusic = async () => {
        if (!loggedIn) {
            alert('Please login to search music');
            navigate('/login');
            return;
        }

        const clientId = '38313fc332fc4d669e2df73d6236beb8';
        const clientSecret = 'c1aacb08437141f0901c01f171359e67';
        const authUrl = 'https://accounts.spotify.com/api/token';
        const apiUrl = 'https://api.spotify.com/v1/search?type=track&q=';

        try {
            const authResponse = await axios.post(authUrl,
                'grant_type=client_credentials', {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
                }
            });
            const token = authResponse.data.access_token;

            const searchResponse = await axios.get(apiUrl + encodeURIComponent(query), {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });

            setTracks(searchResponse.data.tracks.items);
        } catch (error) {
            console.error("Error fetching music:", error);
        }
    };

    return (
        <div>
            <h1 className='gana'>Bajao Gana.... 🎧</h1>
            <div className="content">
                <input
                    type='text'
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="search-input"
                    placeholder="Search for a track..."
                />
                <input
                    type='button'
                    value='Search Music'
                    onClick={fetchMusic}
                    className="search-button"
                />
                <div className="image-gallery">
                    <div className="track-list">
                        {tracks.map(track => (
                            <div key={track.id} className="track-item">
                                <img src={track.album.images[0].url} alt={track.name} className="album-art" />
                                <div className="track-info">
                                    <h3>{track.name}</h3>
                                    <p>Artist: {track.artists.map(artist => artist.name).join(', ')}</p>
                                    <p>Album: {track.album.name}</p>
                                    <a href={track.external_urls.spotify} target="_blank" rel="noopener noreferrer">Listen on Spotify</a>
                                </div>
                                <audio controls>
                                    <source src={track.preview_url} type="audio/mpeg" />
                                    Your browser does not support the audio element.
                                </audio>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
