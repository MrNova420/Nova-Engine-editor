import React, { useState } from 'react';
import { UnifiedPlatformCore } from '../core/UnifiedPlatformCore';
import './styles/MultiplayerModuleV2.css';

interface MultiplayerModuleV2Props {
  platform: UnifiedPlatformCore;
}

interface Lobby {
  id: string;
  name: string;
  host: string;
  players: number;
  maxPlayers: number;
  gameMode: string;
  map: string;
  ping: number;
  region: string;
}

interface Friend {
  id: string;
  username: string;
  status: 'online' | 'offline' | 'in-game';
  game?: string;
  avatar: string;
}

interface Match {
  id: string;
  gameMode: string;
  result: 'win' | 'loss' | 'draw';
  score: string;
  date: string;
  kills?: number;
  deaths?: number;
}

export const MultiplayerModuleV2: React.FC<MultiplayerModuleV2Props> = () => {
  const [selectedTab, setSelectedTab] = useState<
    'matchmaking' | 'lobbies' | 'friends' | 'stats'
  >('matchmaking');
  const [selectedRegion, setSelectedRegion] = useState('auto');
  const [selectedGameMode, setSelectedGameMode] = useState('deathmatch');
  const [isSearching, setIsSearching] = useState(false);
  const [partyMembers] = useState<string[]>([]);

  // Mock data - TODO: Connect to backend API and WebSocket
  const lobbies: Lobby[] = [
    {
      id: '1',
      name: 'Nova Warriors Arena',
      host: 'NovaKing',
      players: 6,
      maxPlayers: 8,
      gameMode: 'Team Deathmatch',
      map: 'Space Station Omega',
      ping: 45,
      region: 'NA-East',
    },
    {
      id: '2',
      name: 'Cosmic Chaos',
      host: 'StarLord',
      players: 4,
      maxPlayers: 6,
      gameMode: 'Capture the Flag',
      map: 'Asteroid Belt',
      ping: 62,
      region: 'NA-West',
    },
    {
      id: '3',
      name: 'Epic Battle Royale',
      host: 'GalaxyHero',
      players: 12,
      maxPlayers: 16,
      gameMode: 'Battle Royale',
      map: 'Nebula Plains',
      ping: 38,
      region: 'NA-East',
    },
  ];

  const friends: Friend[] = [
    {
      id: '1',
      username: 'NovaFriend1',
      status: 'online',
      avatar:
        'https://github.com/user-attachments/assets/3c8547af-d2a1-4e29-ad37-0aeaed749ed1',
    },
    {
      id: '2',
      username: 'CosmicBuddy',
      status: 'in-game',
      game: 'Space Adventure',
      avatar:
        'https://github.com/user-attachments/assets/3c8547af-d2a1-4e29-ad37-0aeaed749ed1',
    },
    {
      id: '3',
      username: 'StarPlayer99',
      status: 'offline',
      avatar:
        'https://github.com/user-attachments/assets/3c8547af-d2a1-4e29-ad37-0aeaed749ed1',
    },
  ];

  const recentMatches: Match[] = [
    {
      id: '1',
      gameMode: 'Team Deathmatch',
      result: 'win',
      score: '50-42',
      date: '2 hours ago',
      kills: 23,
      deaths: 8,
    },
    {
      id: '2',
      gameMode: 'Capture the Flag',
      result: 'loss',
      score: '3-5',
      date: '5 hours ago',
      kills: 15,
      deaths: 12,
    },
    {
      id: '3',
      gameMode: 'Battle Royale',
      result: 'win',
      score: '#1/50',
      date: '1 day ago',
      kills: 12,
      deaths: 1,
    },
  ];

  const handleStartMatchmaking = () => {
    setIsSearching(true);
    // TODO: Connect to matchmaking service via WebSocket
    console.log(
      'TODO: Start matchmaking with region:',
      selectedRegion,
      'mode:',
      selectedGameMode
    );

    // Simulate finding match
    setTimeout(() => {
      setIsSearching(false);
      alert('Match found! (TODO: Connect to actual matchmaking)');
    }, 3000);
  };

  const handleCancelMatchmaking = () => {
    setIsSearching(false);
    // TODO: Cancel matchmaking
    console.log('TODO: Cancel matchmaking');
  };

  const handleJoinLobby = (lobby: Lobby) => {
    // TODO: Join lobby via WebSocket
    console.log('TODO: Join lobby:', lobby.name);
    alert(`Joining ${lobby.name}... (TODO: Implement)`);
  };

  const handleInviteFriend = (friend: Friend) => {
    // TODO: Send party invite
    console.log('TODO: Invite friend:', friend.username);
    alert(`Invited ${friend.username} to party (TODO: Implement)`);
  };

  const handleCreateLobby = () => {
    // TODO: Create new lobby
    console.log('TODO: Create lobby');
    alert('Create Lobby (TODO: Implement)');
  };

  return (
    <div className="mp-v2-container">
      {/* Animated Background */}
      <div className="mp-v2-bg">
        <div className="mp-v2-orb"></div>
        <div className="mp-v2-stars"></div>
      </div>

      {/* Header */}
      <div className="mp-v2-header">
        <div className="mp-v2-logo">
          <span className="mp-v2-logo-text">LONEWISHER</span>
          <span className="mp-v2-logo-sub">Multiplayer</span>
        </div>
        <div className="mp-v2-tabs">
          <button
            className={`mp-v2-tab ${selectedTab === 'matchmaking' ? 'active' : ''}`}
            onClick={() => setSelectedTab('matchmaking')}
          >
            🎮 Matchmaking
          </button>
          <button
            className={`mp-v2-tab ${selectedTab === 'lobbies' ? 'active' : ''}`}
            onClick={() => setSelectedTab('lobbies')}
          >
            🚪 Lobbies
          </button>
          <button
            className={`mp-v2-tab ${selectedTab === 'friends' ? 'active' : ''}`}
            onClick={() => setSelectedTab('friends')}
          >
            👥 Friends
          </button>
          <button
            className={`mp-v2-tab ${selectedTab === 'stats' ? 'active' : ''}`}
            onClick={() => setSelectedTab('stats')}
          >
            📊 Stats
          </button>
        </div>
      </div>

      <div className="mp-v2-main">
        {/* Matchmaking Tab */}
        {selectedTab === 'matchmaking' && (
          <div className="mp-v2-matchmaking">
            <div className="mp-v2-mm-content">
              <div className="mp-v2-orbital-planet-large"></div>

              {!isSearching ? (
                <>
                  <h1 className="mp-v2-mm-title">Quick Match</h1>
                  <p className="mp-v2-mm-subtitle">
                    Find players and jump into the action
                  </p>

                  <div className="mp-v2-mm-settings">
                    <div className="mp-v2-mm-setting">
                      <label>Game Mode</label>
                      <select
                        value={selectedGameMode}
                        onChange={(e) => setSelectedGameMode(e.target.value)}
                        className="mp-v2-select"
                      >
                        <option value="deathmatch">Deathmatch</option>
                        <option value="team-deathmatch">Team Deathmatch</option>
                        <option value="capture-flag">Capture the Flag</option>
                        <option value="battle-royale">Battle Royale</option>
                        <option value="king-hill">King of the Hill</option>
                      </select>
                    </div>

                    <div className="mp-v2-mm-setting">
                      <label>Region</label>
                      <select
                        value={selectedRegion}
                        onChange={(e) => setSelectedRegion(e.target.value)}
                        className="mp-v2-select"
                      >
                        <option value="auto">Auto (Best Ping)</option>
                        <option value="na-east">NA East</option>
                        <option value="na-west">NA West</option>
                        <option value="eu-west">EU West</option>
                        <option value="eu-east">EU East</option>
                        <option value="asia">Asia</option>
                        <option value="oceania">Oceania</option>
                      </select>
                    </div>
                  </div>

                  {partyMembers.length > 0 && (
                    <div className="mp-v2-party">
                      <h3>Party Members ({partyMembers.length})</h3>
                      <div className="mp-v2-party-list">
                        {partyMembers.map((member, idx) => (
                          <div key={idx} className="mp-v2-party-member">
                            {member}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    className="mp-v2-mm-start-btn"
                    onClick={handleStartMatchmaking}
                  >
                    🔍 Find Match
                  </button>
                </>
              ) : (
                <>
                  <div className="mp-v2-searching">
                    <div className="mp-v2-searching-spinner"></div>
                    <h2>Searching for players...</h2>
                    <p>Estimated wait time: ~30 seconds</p>
                    <div className="mp-v2-search-info">
                      <div className="mp-v2-search-detail">
                        <span className="mp-v2-search-label">Mode:</span>
                        <span className="mp-v2-search-value">
                          {selectedGameMode}
                        </span>
                      </div>
                      <div className="mp-v2-search-detail">
                        <span className="mp-v2-search-label">Region:</span>
                        <span className="mp-v2-search-value">
                          {selectedRegion}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    className="mp-v2-mm-cancel-btn"
                    onClick={handleCancelMatchmaking}
                  >
                    ❌ Cancel Search
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Lobbies Tab */}
        {selectedTab === 'lobbies' && (
          <div className="mp-v2-lobbies">
            <div className="mp-v2-lobbies-header">
              <h2>Available Lobbies</h2>
              <button
                className="mp-v2-create-lobby-btn"
                onClick={handleCreateLobby}
              >
                ➕ Create Lobby
              </button>
            </div>

            <div className="mp-v2-lobbies-filters">
              <input
                type="text"
                placeholder="Search lobbies..."
                className="mp-v2-search-input"
              />
              <select className="mp-v2-filter-select">
                <option value="all">All Game Modes</option>
                <option value="deathmatch">Deathmatch</option>
                <option value="team-deathmatch">Team Deathmatch</option>
                <option value="capture-flag">Capture the Flag</option>
                <option value="battle-royale">Battle Royale</option>
              </select>
              <select className="mp-v2-filter-select">
                <option value="all">All Regions</option>
                <option value="na-east">NA East</option>
                <option value="na-west">NA West</option>
                <option value="eu">Europe</option>
                <option value="asia">Asia</option>
              </select>
            </div>

            <div className="mp-v2-lobbies-list">
              {lobbies.map((lobby) => (
                <div key={lobby.id} className="mp-v2-lobby-card">
                  <div className="mp-v2-lobby-header">
                    <h3>{lobby.name}</h3>
                    <span
                      className={`mp-v2-lobby-ping ${lobby.ping < 50 ? 'good' : lobby.ping < 100 ? 'okay' : 'bad'}`}
                    >
                      {lobby.ping}ms
                    </span>
                  </div>
                  <div className="mp-v2-lobby-info">
                    <div className="mp-v2-lobby-detail">
                      <span className="mp-v2-lobby-label">Host:</span>
                      <span className="mp-v2-lobby-value">{lobby.host}</span>
                    </div>
                    <div className="mp-v2-lobby-detail">
                      <span className="mp-v2-lobby-label">Players:</span>
                      <span className="mp-v2-lobby-value">
                        {lobby.players}/{lobby.maxPlayers}
                      </span>
                    </div>
                    <div className="mp-v2-lobby-detail">
                      <span className="mp-v2-lobby-label">Mode:</span>
                      <span className="mp-v2-lobby-value">
                        {lobby.gameMode}
                      </span>
                    </div>
                    <div className="mp-v2-lobby-detail">
                      <span className="mp-v2-lobby-label">Map:</span>
                      <span className="mp-v2-lobby-value">{lobby.map}</span>
                    </div>
                    <div className="mp-v2-lobby-detail">
                      <span className="mp-v2-lobby-label">Region:</span>
                      <span className="mp-v2-lobby-value">{lobby.region}</span>
                    </div>
                  </div>
                  <button
                    className="mp-v2-join-lobby-btn"
                    onClick={() => handleJoinLobby(lobby)}
                  >
                    Join Lobby
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Friends Tab */}
        {selectedTab === 'friends' && (
          <div className="mp-v2-friends">
            <div className="mp-v2-friends-header">
              <h2>Friends List</h2>
              <button className="mp-v2-add-friend-btn">➕ Add Friend</button>
            </div>

            <div className="mp-v2-friends-list">
              {friends.map((friend) => (
                <div key={friend.id} className="mp-v2-friend-card">
                  <img
                    src={friend.avatar}
                    alt={friend.username}
                    className="mp-v2-friend-avatar"
                  />
                  <div className="mp-v2-friend-info">
                    <div className="mp-v2-friend-name-row">
                      <h3>{friend.username}</h3>
                      <span className={`mp-v2-friend-status ${friend.status}`}>
                        {friend.status === 'online' && '🟢 Online'}
                        {friend.status === 'offline' && '⚫ Offline'}
                        {friend.status === 'in-game' && '🎮 In Game'}
                      </span>
                    </div>
                    {friend.game && (
                      <p className="mp-v2-friend-game">
                        Playing: {friend.game}
                      </p>
                    )}
                  </div>
                  <div className="mp-v2-friend-actions">
                    {friend.status !== 'offline' && (
                      <button
                        className="mp-v2-friend-action-btn"
                        onClick={() => handleInviteFriend(friend)}
                      >
                        📧 Invite
                      </button>
                    )}
                    <button className="mp-v2-friend-action-btn">💬 Chat</button>
                    <button className="mp-v2-friend-action-btn">
                      👁️ Profile
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mp-v2-global-chat">
              <h3>Global Chat</h3>
              <div className="mp-v2-chat-messages">
                <div className="mp-v2-chat-message">
                  <span className="mp-v2-chat-user">NovaPlayer:</span>
                  <span className="mp-v2-chat-text">
                    Anyone want to team up?
                  </span>
                </div>
                <div className="mp-v2-chat-message">
                  <span className="mp-v2-chat-user">StarWarrior:</span>
                  <span className="mp-v2-chat-text">GG everyone!</span>
                </div>
              </div>
              <div className="mp-v2-chat-input-container">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="mp-v2-chat-input"
                />
                <button className="mp-v2-chat-send-btn">Send</button>
              </div>
            </div>
          </div>
        )}

        {/* Stats Tab */}
        {selectedTab === 'stats' && (
          <div className="mp-v2-stats">
            <div className="mp-v2-stats-overview">
              <div className="mp-v2-stat-card">
                <div className="mp-v2-stat-icon">🏆</div>
                <div className="mp-v2-stat-content">
                  <h3>Total Wins</h3>
                  <p className="mp-v2-stat-value">247</p>
                </div>
              </div>
              <div className="mp-v2-stat-card">
                <div className="mp-v2-stat-icon">⚔️</div>
                <div className="mp-v2-stat-content">
                  <h3>Total Kills</h3>
                  <p className="mp-v2-stat-value">5,832</p>
                </div>
              </div>
              <div className="mp-v2-stat-card">
                <div className="mp-v2-stat-icon">💀</div>
                <div className="mp-v2-stat-content">
                  <h3>K/D Ratio</h3>
                  <p className="mp-v2-stat-value">2.45</p>
                </div>
              </div>
              <div className="mp-v2-stat-card">
                <div className="mp-v2-stat-icon">📈</div>
                <div className="mp-v2-stat-content">
                  <h3>Rank</h3>
                  <p className="mp-v2-stat-value">Diamond II</p>
                </div>
              </div>
            </div>

            <div className="mp-v2-leaderboard">
              <h2>Global Leaderboard</h2>
              <div className="mp-v2-leaderboard-list">
                <div className="mp-v2-leaderboard-item">
                  <span className="mp-v2-rank gold">1</span>
                  <span className="mp-v2-player">NovaChampion</span>
                  <span className="mp-v2-score">9,847 pts</span>
                </div>
                <div className="mp-v2-leaderboard-item">
                  <span className="mp-v2-rank silver">2</span>
                  <span className="mp-v2-player">CosmicKing</span>
                  <span className="mp-v2-score">9,234 pts</span>
                </div>
                <div className="mp-v2-leaderboard-item">
                  <span className="mp-v2-rank bronze">3</span>
                  <span className="mp-v2-player">StarLegend</span>
                  <span className="mp-v2-score">8,956 pts</span>
                </div>
              </div>
            </div>

            <div className="mp-v2-recent-matches">
              <h2>Recent Matches</h2>
              <div className="mp-v2-matches-list">
                {recentMatches.map((match) => (
                  <div
                    key={match.id}
                    className={`mp-v2-match-card ${match.result}`}
                  >
                    <div className="mp-v2-match-result">
                      {match.result === 'win' && '🏆 VICTORY'}
                      {match.result === 'loss' && '💀 DEFEAT'}
                      {match.result === 'draw' && '🤝 DRAW'}
                    </div>
                    <div className="mp-v2-match-info">
                      <div className="mp-v2-match-detail">
                        <span className="mp-v2-match-label">Mode:</span>
                        <span className="mp-v2-match-value">
                          {match.gameMode}
                        </span>
                      </div>
                      <div className="mp-v2-match-detail">
                        <span className="mp-v2-match-label">Score:</span>
                        <span className="mp-v2-match-value">{match.score}</span>
                      </div>
                      {match.kills !== undefined && (
                        <div className="mp-v2-match-detail">
                          <span className="mp-v2-match-label">K/D:</span>
                          <span className="mp-v2-match-value">
                            {match.kills}/{match.deaths}
                          </span>
                        </div>
                      )}
                      <div className="mp-v2-match-detail">
                        <span className="mp-v2-match-label">Time:</span>
                        <span className="mp-v2-match-value">{match.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiplayerModuleV2;
