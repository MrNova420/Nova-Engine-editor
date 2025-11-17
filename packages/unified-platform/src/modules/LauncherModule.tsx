/**
 * Launcher Module - Game Playing & Library
 */

import React, { useState, useEffect } from 'react';
import { UnifiedPlatformCore } from '../core/UnifiedPlatformCore';

interface LauncherModuleProps {
  platform: UnifiedPlatformCore;
}

export const LauncherModule: React.FC<LauncherModuleProps> = ({ platform }) => {
  const [library, setLibrary] = useState<any[]>([]);
  const [recentGames, setRecentGames] = useState<any[]>([]);
  const [currentGame, setCurrentGame] = useState<any>(null);

  useEffect(() => {
    loadLibrary();
    loadRecentGames();

    platform.on('playGame', ({ gameId }) => {
      launchGame(gameId);
    });
  }, []);

  const loadLibrary = async () => {
    try {
      const response = await fetch('/api/library');
      const data = await response.json();
      setLibrary(data.games || []);
    } catch (error) {
      console.error('Failed to load library:', error);
    }
  };

  const loadRecentGames = async () => {
    try {
      const response = await fetch('/api/library/recent');
      const data = await response.json();
      setRecentGames(data.games || []);
    } catch (error) {
      console.error('Failed to load recent games:', error);
    }
  };

  const launchGame = async (gameId: string) => {
    try {
      const response = await fetch(`/api/games/${gameId}`);
      const game = await response.json();
      setCurrentGame(game);
      platform.showNotification({
        type: 'info',
        message: `Launching ${game.name}...`,
      });
    } catch (error) {
      console.error('Failed to launch game:', error);
      platform.showNotification({
        type: 'error',
        message: 'Failed to launch game',
      });
    }
  };

  if (currentGame) {
    return (
      <div className="game-player">
        <div className="player-header">
          <button onClick={() => setCurrentGame(null)}>← Back to Library</button>
          <h2>{currentGame.name}</h2>
          <button>⛶ Fullscreen</button>
        </div>
        <div className="game-container">
          <iframe 
            src={`/games/${currentGame.id}/index.html`}
            title={currentGame.name}
            allowFullScreen
          />
        </div>
        <style jsx>{`
          .game-player {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            background: #000;
          }
          .player-header {
            display: flex;
            justify-content: space-between;
            padding: 10px;
            background: #1a1a1a;
            color: white;
          }
          .game-container {
            flex: 1;
            position: relative;
          }
          .game-container iframe {
            width: 100%;
            height: 100%;
            border: none;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="launcher-module">
      <section>
        <h2>Recently Played</h2>
        <div className="game-list">
          {recentGames.map((game) => (
            <div key={game.id} className="game-card" onClick={() => launchGame(game.id)}>
              <img src={game.thumbnail} alt={game.name} />
              <h3>{game.name}</h3>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Your Library</h2>
        <div className="game-grid">
          {library.map((game) => (
            <div key={game.id} className="game-card" onClick={() => launchGame(game.id)}>
              <img src={game.thumbnail} alt={game.name} />
              <h3>{game.name}</h3>
            </div>
          ))}
        </div>
      </section>

      <style jsx>{`
        .launcher-module {
          padding: 20px;
          background: #1a1a1a;
          color: white;
          height: 100%;
          overflow-y: auto;
        }
        .game-list, .game-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }
        .game-card {
          background: #2a2a2a;
          border-radius: 8px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.3s;
        }
        .game-card:hover {
          transform: scale(1.05);
        }
        .game-card img {
          width: 100%;
          height: 150px;
          object-fit: cover;
        }
        .game-card h3 {
          padding: 10px;
          margin: 0;
        }
      `}</style>
    </div>
  );
};
