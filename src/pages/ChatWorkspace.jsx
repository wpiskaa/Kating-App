import React, { useState } from 'react';
import QRCodeModal from '../components/QRCodeModal';
import { MessageSquare, QrCode, UserCheck, Send, ArrowLeft, Search, Circle } from 'lucide-react';

export default function ChatWorkspace({ currentUser }) {
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Mutual Friends List
  const [friends, setFriends] = useState([
    {
      id: 'f-1',
      name: 'Ilham',
      role: 'Backend Architect',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
      online: true,
      lastMsg: 'Siap bro, firestore rules udah di-push!',
      lastTime: '10m lalu',
      mutualCode: 'KAT-ILHAM26'
    },
    {
      id: 'f-2',
      name: 'Rian Prasetya',
      role: 'Database Analyst',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80',
      online: false,
      lastMsg: 'Tugas sub-tugas DB bakal kelar ntar malem',
      lastTime: '1j lalu',
      mutualCode: 'KAT-RIAN2026'
    },
    {
      id: 'f-3',
      name: 'Siti Rahma',
      role: 'Dosen / Mentor',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
      online: true,
      lastMsg: 'Jangan lupa kumpul riset PAB ya',
      lastTime: '3j lalu',
      mutualCode: 'KAT-SITI2026'
    }
  ]);

  // Selected Active Chat Room
  const [activeChatFriend, setActiveChatFriend] = useState(null);
  
  // Chat Messages per friend
  const [chatLogs, setChatLogs] = useState({
    'f-1': [
      { id: 1, sender: 'them', text: 'Halo Fiz! Kating App UI udah kelar?', time: '10:00' },
      { id: 2, sender: 'me', text: 'Udah bro, ini lagi tes live chat & QR code mutual', time: '10:02' },
      { id: 3, sender: 'them', text: 'Mantap! Firestore rules udah gw commit ke repo', time: '10:05' }
    ],
    'f-2': [
      { id: 1, sender: 'them', text: 'Hafiz, kabar tugas DB kelompok gimana?', time: '09:00' },
      { id: 2, sender: 'me', text: 'Udah gw siapin tempatnya di modul proyek', time: '09:15' }
    ]
  });

  const [inputMsgText, setInputMsgText] = useState('');

  const handleSendMsg = (e) => {
    e.preventDefault();
    if (!inputMsgText || !activeChatFriend) return;

    const newMsg = {
      id: Date.now(),
      sender: 'me',
      text: inputMsgText,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };

    const friendId = activeChatFriend.id;
    const currentLogs = chatLogs[friendId] || [];
    
    setChatLogs({
      ...chatLogs,
      [friendId]: [...currentLogs, newMsg]
    });

    setInputMsgText('');
  };

  const handleAddMutualFriend = (code) => {
    const nameFromCode = code.replace('KAT-', '');
    const newFriendObj = {
      id: `f-${Date.now()}`,
      name: nameFromCode,
      role: 'Teman Mutual',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${nameFromCode}`,
      online: true,
      lastMsg: 'Baru saja terhubung secara mutual!',
      lastTime: 'Baru saja',
      mutualCode: code
    };

    setFriends([newFriendObj, ...friends]);
  };

  const filteredFriends = friends.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <>
      {/* CHAT ROOM VIEW (Inside Conversation with a Friend) */}
      {activeChatFriend ? (
        <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 120px)' }}>
          {/* Chat Header Bar */}
          <div className="card" style={{ padding: '8px 12px', borderRadius: '12px', marginBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button onClick={() => setActiveChatFriend(null)} className="icon-btn">
                  <ArrowLeft size={16} />
                </button>
                <div style={{ position: 'relative' }}>
                  <img src={activeChatFriend.avatar} alt={activeChatFriend.name} style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }} />
                  {activeChatFriend.online && <div style={{ position: 'absolute', bottom: 0, right: 0, width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />}
                </div>
                <div>
                  <h4 className="h4">{activeChatFriend.name}</h4>
                  <span className="dim">{activeChatFriend.online ? 'Online' : 'Offline'}</span>
                </div>
              </div>

              <span className="badge badge-blue">Mutual ID</span>
            </div>
          </div>

          {/* Messages Logs Area */}
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', padding: '4px 2px' }}>
            {(chatLogs[activeChatFriend.id] || []).map((msg) => (
              <div
                key={msg.id}
                style={{
                  alignSelf: msg.sender === 'me' ? 'flex-end' : 'flex-start',
                  maxWidth: '78%',
                  backgroundColor: msg.sender === 'me' ? 'var(--indigo)' : 'var(--bg-card)',
                  color: msg.sender === 'me' ? 'white' : 'var(--text-1)',
                  padding: '8px 12px',
                  borderRadius: msg.sender === 'me' ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                  border: msg.sender === 'me' ? 'none' : '1px solid var(--border)'
                }}
              >
                <p className="h4" style={{ fontWeight: 500, fontSize: '11.5px', lineHeight: 1.35 }}>{msg.text}</p>
                <span className="dim" style={{ display: 'block', textAlign: 'right', fontSize: '8.5px', opacity: 0.8, marginTop: '2px' }}>{msg.time}</span>
              </div>
            ))}
          </div>

          {/* Bottom Message Input Form */}
          <form onSubmit={handleSendMsg} style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
            <input
              type="text"
              className="field-input"
              placeholder="Tulis pesan..."
              value={inputMsgText}
              onChange={(e) => setInputMsgText(e.target.value)}
              style={{ flex: 1 }}
            />
            <button type="submit" className="fab" style={{ width: '36px', height: '36px', borderRadius: '10px' }}>
              <Send size={15} />
            </button>
          </form>
        </div>
      ) : (
        /* FRIENDS LIST VIEW */
        <>
          {/* Header Banner */}
          <div className="card-hero" style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(34,211,238,0.1) 100%)', border: '1px solid rgba(99,102,241,0.25)', padding: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h2 className="h3">Teman Mutual & Chat</h2>
                <span className="dim">Scan QR Code untuk terhubung</span>
              </div>

              <button onClick={() => setIsQRModalOpen(true)} className="btn" style={{ padding: '6px 10px', fontSize: '10px', width: 'auto' }}>
                <QrCode size={13} /> QR Code Mutual
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="field" style={{ marginBottom: '4px' }}>
            <input
              type="text"
              className="field-input"
              placeholder="Cari teman mutual..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Mutual Friends Conversation List */}
          <div className="card">
            <div className="section-row">
              <span className="h3" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <MessageSquare size={14} color="#22d3ee" /> Pesan Terakhir
              </span>
              <span className="badge badge-cyan">{friends.length} Teman</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              {filteredFriends.map((friend) => (
                <div
                  key={friend.id}
                  className="list-item"
                  onClick={() => setActiveChatFriend(friend)}
                  style={{ cursor: 'pointer', padding: '8px 10px' }}
                >
                  <div style={{ position: 'relative' }}>
                    <img src={friend.avatar} alt={friend.name} style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                    {friend.online && <div style={{ position: 'absolute', bottom: 0, right: 0, width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="h4">{friend.name}</span>
                      <span className="dim" style={{ fontSize: '9px' }}>{friend.lastTime}</span>
                    </div>
                    <span className="dim" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block', maxWidth: '200px' }}>
                      {friend.lastMsg}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* QR Code Mutual Modal */}
      <QRCodeModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        user={currentUser}
        onAddFriend={handleAddMutualFriend}
      />
    </>
  );
}
