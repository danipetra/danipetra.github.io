
import TitleHeader from "../components/TitleHeader";

const SpotifySection = () => {
  return (
    <section id="spotify" className="spotify-section">
      <div className="w-full">
        <TitleHeader
          title="Spotify"
          sub="🎼 What I play and listen to"
        />

        <div className="spotify-grid mt-16">
          {/* Colonna 1: profilo */}
          <div className="spotify-card">
            <h3 className="spotify-card-title">My Profile</h3>
            <p className="text-white-50 mb-4 text-sm md:text-base">
              Discover my playlists, liked songs and what I listen to when I code or design.
            </p>

            <a
              href="https://open.spotify.com/user/ssmgujjptxdcsvoid540oppzv?si=3de49b8f0e434f8b"
              target="_blank"
              rel="noreferrer"
              className="contact-btn group inline-flex items-center mt-2"
            >
              <div className="inner">
                <span>Open Spotify profile</span>
              </div>
            </a>

            {/* TODO - integrate now playing */}
          </div>

          {/* Colonna 2: playlist in evidenza */}
          <div className="spotify-card">
            <h3 className="spotify-card-title">Featured playlist</h3>
            <iframe
              src="https://open.spotify.com/embed/playlist/02IxN6Xujd3t6qfeQknqIM?si=7c54cbbce0e6451d"
              width="100%"
              height="360"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </div>

          {/* Colonna 3: focus / coding playlist */}
          <div className="spotify-card">
            <h3 className="spotify-card-title">Focus / Coding playlist</h3>
            <iframe
              src="https://open.spotify.com/embed/playlist/3Sz0W4FVgjLPUcw2ap5KcG?si=d5960d848fa247e0"
              width="100%"
              height="360"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpotifySection;