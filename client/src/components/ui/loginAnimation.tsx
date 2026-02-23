export default function LoginAnimation() {
  return (
    <div className="w-full h-full flex justify-center items-center overflow-hidden bg-transparent font-sans">
      <style>
        {`
          :root {
            /* Claymorphic Color Palette */
            --monitor-frame: #865c49;
            --monitor-base: #744e3e;
            --monitor-screen: #fbf6f0;
            --msg-blue: #345070;
            --msg-green: #7a9a6b;
            --msg-purple: #49475b;
            --msg-orange: #df9c57;
            --msg-brown: #8f634b;
            --float-white: #fdfcfa;
            --float-thumb-bg: #f0decb;
            --float-thumb-icon: #cd8c74;
            --float-orange: #e59a58;
            --text-dark: #3a2a22;
          }

          .clay-container {
            width: 100%;
            max-width: 900px;
            height: auto;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .clay-svg {
            width: 100%;
            height: 100%;
            filter: drop-shadow(0px 20px 30px rgba(138, 97, 68, 0.2));
          }

          /* Continuous bobbing animation for floating icons */
          .float-wrapper.heart { animation: bob 4s ease-in-out infinite; }
          .float-wrapper.thumb { animation: bob 4.5s ease-in-out infinite reverse; }
          .float-wrapper.comment { animation: bob 5s ease-in-out infinite; animation-delay: 1s; }

          @keyframes bob {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-12px); }
          }

          /* Hover Micro-interactions */
          .float-hover {
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          }
          
          .heart .float-hover { transform-origin: 245px 130px; }
          .thumb .float-hover { transform-origin: 410px 105px; }
          .comment .float-hover { transform-origin: 557px 130px; }

          .float-wrapper:hover .float-hover {
            transform: scale(1.15) translateY(-5px) rotate(4deg);
            cursor: pointer;
            filter: drop-shadow(0px 15px 15px rgba(160, 110, 70, 0.4));
          }

          /* Continuous seamless scrolling for chat messages */
          .chat-scroll-group {
            animation: scroll-chat 12s linear infinite;
          }

          @keyframes scroll-chat {
            from { transform: translateY(0); }
            to { transform: translateY(-250px); } /* Exactly one loop cycle distance */
          }
          
          /* Interactive pause on screen hover */
          .monitor-body:hover .chat-scroll-group {
            animation-play-state: paused;
          }
        `}
      </style>

      <div className="clay-container">
        <svg
          className="clay-svg"
          viewBox="0 0 800 650"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Claymorphic Shadows */}
            <filter
              id="heavy-shadow"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
            >
              <feDropShadow
                dx="0"
                dy="18"
                stdDeviation="12"
                floodColor="#a07a58"
                floodOpacity="0.5"
              />
              <feDropShadow
                dx="0"
                dy="4"
                stdDeviation="4"
                floodColor="#7a5236"
                floodOpacity="0.3"
              />
            </filter>

            <filter
              id="med-shadow"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
            >
              <feDropShadow
                dx="0"
                dy="10"
                stdDeviation="8"
                floodColor="#b88b68"
                floodOpacity="0.45"
              />
            </filter>

            <filter id="sm-shadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow
                dx="0"
                dy="4"
                stdDeviation="4"
                floodColor="#b88b68"
                floodOpacity="0.35"
              />
            </filter>

            <filter
              id="msg-shadow"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
            >
              <feDropShadow
                dx="0"
                dy="4"
                stdDeviation="3"
                floodColor="#d6b89c"
                floodOpacity="0.6"
              />
            </filter>

            {/* Mini Avatar Badges */}
            <g id="mini-avatar-blue">
              <circle
                cx="0"
                cy="0"
                r="14"
                fill="#eee1d0"
                filter="url(#sm-shadow)"
              />
              <clipPath id="clip-blue">
                <circle cx="0" cy="0" r="11" />
              </clipPath>
              <g clipPath="url(#clip-blue)">
                <circle cx="0" cy="0" r="11" fill="#4a6074" />
                <circle cx="0" cy="-3" r="4.5" fill="#cd9d7b" />
                <circle cx="0" cy="9" r="7" fill="#815440" />
              </g>
            </g>

            <g id="mini-avatar-orange">
              <circle
                cx="0"
                cy="0"
                r="14"
                fill="#eee1d0"
                filter="url(#sm-shadow)"
              />
              <clipPath id="clip-orange">
                <circle cx="0" cy="0" r="11" />
              </clipPath>
              <g clipPath="url(#clip-orange)">
                <circle cx="0" cy="0" r="11" fill="#d17b5e" />
                <circle cx="0" cy="-3" r="4.5" fill="#e0b8a0" />
                <circle cx="0" cy="9" r="7" fill="#3a2a22" />
              </g>
            </g>

            <g id="mini-avatar-green">
              <circle
                cx="0"
                cy="0"
                r="14"
                fill="#eee1d0"
                filter="url(#sm-shadow)"
              />
              <clipPath id="clip-green">
                <circle cx="0" cy="0" r="11" />
              </clipPath>
              <g clipPath="url(#clip-green)">
                <circle cx="0" cy="0" r="11" fill="#5a7052" />
                <circle cx="0" cy="-3" r="4.5" fill="#a06e53" />
                <circle cx="0" cy="9" r="7" fill="#2c1e16" />
              </g>
            </g>

            {/* Chat Area Clip Path to keep messages inside the screen */}
            <clipPath id="chat-clip">
              <rect x="170" y="291" width="460" height="209" />
            </clipPath>
          </defs>

          {/* ================= MONITOR ================= */}
          {/* Stand */}
          <g className="monitor-stand" filter="url(#heavy-shadow)">
            <path
              d="M 370 520 Q 370 540 350 550 L 450 550 Q 430 540 430 520 Z"
              fill="var(--monitor-frame)"
            />
            <rect
              x="330"
              y="540"
              width="140"
              height="25"
              rx="12.5"
              fill="var(--monitor-base)"
            />
          </g>

          {/* Main Body */}
          <g className="monitor-body" filter="url(#heavy-shadow)">
            {/* Thick Outer Frame */}
            <rect
              x="150"
              y="220"
              width="500"
              height="300"
              rx="35"
              fill="var(--monitor-frame)"
            />
            {/* Inner Screen */}
            <rect
              x="170"
              y="240"
              width="460"
              height="260"
              rx="20"
              fill="var(--monitor-screen)"
            />
          </g>

          {/* ================= CHAT UI ================= */}
          <g className="chat-ui">
            {/* Header Divider */}
            <line
              x1="170"
              y1="290"
              x2="630"
              y2="290"
              stroke="#ebdcca"
              strokeWidth="2"
            />

            {/* Back Arrow */}
            <path
              d="M 200 265 L 190 275 L 200 285"
              fill="none"
              stroke="var(--monitor-frame)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Header Overlapping Avatars */}
            <g className="header-avatars">
              <circle
                cx="255"
                cy="265"
                r="12"
                fill="#5a7052"
                stroke="var(--monitor-screen)"
                strokeWidth="2"
              />
              <circle
                cx="243"
                cy="265"
                r="12"
                fill="#889fb3"
                stroke="var(--monitor-screen)"
                strokeWidth="2"
              />
              <circle
                cx="231"
                cy="265"
                r="12"
                fill="#cd9d7b"
                stroke="var(--monitor-screen)"
                strokeWidth="2"
              />
            </g>

            {/* Chat Title */}
            <text
              x="275"
              y="281"
              fontWeight="600"
              fontSize="20"
              fill="var(--text-dark)"
            >
              Whispry
            </text>

            {/* Chat Messages (Clipped & Animated) */}
            <g clipPath="url(#chat-clip)">
              <g className="chat-scroll-group">
                {/* Cycle 1 */}
                <rect
                  x="380"
                  y="300"
                  width="220"
                  height="35"
                  rx="17.5"
                  fill="var(--msg-blue)"
                  filter="url(#msg-shadow)"
                />
                <rect
                  x="400"
                  y="350"
                  width="200"
                  height="35"
                  rx="17.5"
                  fill="var(--msg-green)"
                  filter="url(#msg-shadow)"
                />
                <g className="msg-group-left">
                  <circle
                    cx="215"
                    cy="417.5"
                    r="15"
                    fill="#cd9d7b"
                    filter="url(#msg-shadow)"
                  />
                  <rect
                    x="240"
                    y="400"
                    width="120"
                    height="35"
                    rx="17.5"
                    fill="var(--msg-purple)"
                    filter="url(#msg-shadow)"
                  />
                </g>
                <rect
                  x="430"
                  y="450"
                  width="170"
                  height="35"
                  rx="17.5"
                  fill="var(--msg-orange)"
                  filter="url(#msg-shadow)"
                />
                <g className="msg-group-left">
                  <circle
                    cx="215"
                    cy="517.5"
                    r="15"
                    fill="#cd9d7b"
                    filter="url(#msg-shadow)"
                  />
                  <rect
                    x="240"
                    y="500"
                    width="160"
                    height="35"
                    rx="17.5"
                    fill="var(--msg-brown)"
                    filter="url(#msg-shadow)"
                  />
                </g>

                {/* Cycle 2 (Seamless continuation offset by exactly 250px) */}
                <rect
                  x="380"
                  y="550"
                  width="220"
                  height="35"
                  rx="17.5"
                  fill="var(--msg-blue)"
                  filter="url(#msg-shadow)"
                />
                <rect
                  x="400"
                  y="600"
                  width="200"
                  height="35"
                  rx="17.5"
                  fill="var(--msg-green)"
                  filter="url(#msg-shadow)"
                />
                <g className="msg-group-left">
                  <circle
                    cx="215"
                    cy="667.5"
                    r="15"
                    fill="#cd9d7b"
                    filter="url(#msg-shadow)"
                  />
                  <rect
                    x="240"
                    y="650"
                    width="120"
                    height="35"
                    rx="17.5"
                    fill="var(--msg-purple)"
                    filter="url(#msg-shadow)"
                  />
                </g>
                <rect
                  x="430"
                  y="700"
                  width="170"
                  height="35"
                  rx="17.5"
                  fill="var(--msg-orange)"
                  filter="url(#msg-shadow)"
                />
                <g className="msg-group-left">
                  <circle
                    cx="215"
                    cy="767.5"
                    r="15"
                    fill="#cd9d7b"
                    filter="url(#msg-shadow)"
                  />
                  <rect
                    x="240"
                    y="750"
                    width="160"
                    height="35"
                    rx="17.5"
                    fill="var(--msg-brown)"
                    filter="url(#msg-shadow)"
                  />
                </g>
              </g>
            </g>
          </g>

          {/* ================= FLOATING ICONS ================= */}
          {/* 1. Left Icon: Heart */}
          <g className="float-wrapper heart">
            <g className="float-hover">
              <g filter="url(#med-shadow)">
                {/* Bubble Body & Tail */}
                <rect
                  x="210"
                  y="100"
                  width="70"
                  height="60"
                  rx="20"
                  fill="var(--float-white)"
                />
                <path
                  d="M 225 145 L 210 175 L 245 155 Z"
                  fill="var(--float-white)"
                />

                {/* Chunky Heart Shape */}
                <g transform="translate(245, 130) rotate(45)">
                  <rect x="-8" y="-8" width="16" height="16" fill="#6f4e41" />
                  <circle cx="-8" cy="0" r="8" fill="#6f4e41" />
                  <circle cx="0" cy="-8" r="8" fill="#6f4e41" />
                </g>
              </g>
              {/* Attached Mini Avatar */}
              <use href="#mini-avatar-blue" x="275" y="95" />
            </g>
          </g>

          {/* 2. Center Icon: Thumb Up */}
          <g className="float-wrapper thumb">
            <g className="float-hover">
              <g filter="url(#med-shadow)">
                {/* Bubble Body & Tail */}
                <rect
                  x="370"
                  y="60"
                  width="80"
                  height="70"
                  rx="25"
                  fill="var(--float-thumb-bg)"
                />
                <path
                  d="M 395 120 L 410 155 L 425 125 Z"
                  fill="var(--float-thumb-bg)"
                />

                {/* Stylized Thumb Icon */}
                {/* Fist base */}
                <path
                  d="M 405 85 h 12 a 5 5 0 0 1 5 5 v 18 a 5 5 0 0 1 -5 5 h -12 a 5 5 0 0 1 -5 -5 v -18 a 5 5 0 0 1 5 -5 z"
                  fill="var(--float-thumb-icon)"
                />
                {/* Thumb pointing up */}
                <path
                  d="M 400 72 h 10 a 5 5 0 0 1 5 5 v 13 h -15 v -13 a 5 5 0 0 1 5 -5 z"
                  fill="var(--float-thumb-icon)"
                  transform="rotate(-5, 400, 72)"
                />
              </g>
              {/* Attached Mini Avatar */}
              <use href="#mini-avatar-orange" x="445" y="65" />
            </g>
          </g>

          {/* 3. Right Icon: Comment Dots */}
          <g className="float-wrapper comment">
            <g className="float-hover">
              <g filter="url(#med-shadow)">
                {/* Bubble Body & Tail */}
                <rect
                  x="520"
                  y="100"
                  width="75"
                  height="60"
                  rx="20"
                  fill="var(--float-orange)"
                />
                <path
                  d="M 535 145 L 520 175 L 555 155 Z"
                  fill="var(--float-orange)"
                />

                {/* Comment Dots */}
                <circle cx="542" cy="130" r="5" fill="#fff" />
                <circle cx="557" cy="130" r="5" fill="#fff" />
                <circle cx="572" cy="130" r="5" fill="#fff" />
              </g>
              {/* Attached Mini Avatar */}
              <use href="#mini-avatar-green" x="590" y="98" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
