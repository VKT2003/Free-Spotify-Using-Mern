import React from 'react';

const About = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.header}>About MusicApp</h1>
            <p style={styles.paragraph}>
                Welcome to MusicApp, your ultimate destination for streaming and discovering music.
                Our app provides a seamless experience for music lovers to explore a vast library
                of songs, albums, and playlists from various genres and artists.
            </p>
            <p style={styles.paragraph}>
                <strong>Features:</strong>
            </p>
            <ul style={styles.list}>
                <li>Stream millions of songs from our extensive music library</li>
                <li>Create and manage your own playlists</li>
                <li>Discover new music through curated playlists and recommendations</li>
                <li>Follow your favorite artists and stay updated with their latest releases</li>
                <li>Share your favorite tracks and playlists with friends</li>
            </ul>
            <p style={styles.paragraph}>
                At MusicApp, we are dedicated to bringing you the best music experience possible. 
                Whether you're looking for the latest hits or timeless classics, we have something 
                for everyone. Join our community and start your musical journey today!
            </p>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        fontFamily: 'Arial, sans-serif'
    },
    header: {
        fontSize: '2em',
        color: 'white'
    },
    paragraph: {
        fontSize: '1.2em',
        lineHeight: '1.6',
        color: 'white'
    },
    list: {
        fontSize: '1.2em',
        lineHeight: '1.6',
        color: 'white',
        listStyleType: 'disc',
        paddingLeft: '20px'
    }
};

export default About;
