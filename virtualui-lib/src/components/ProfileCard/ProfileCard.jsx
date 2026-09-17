import React, { useState } from "react";

const ProfileCard = ({
  name = "Alex Morgan",
  username = "@alexmorgan",
  role = "Creative Developer",
  bio = "Building beautiful digital experiences with code, curiosity and a little chaos.",
  avatar = "https://i.pravatar.cc/300?img=12",
  coverImage = "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1200&q=80",
  accent = "#8b5cf6",
  secondaryAccent = "#06b6d4",
  location = "New Delhi, India",
  followers = "12.8K",
  following = "482",
  projects = "37",
  verified = true,
  online = true,
  initialFollowing = false,
  onFollow,
  onMessage,
}) => {
  const [userfollowing, setUserFollowing] = useState(initialFollowing);
  const [liked, setLiked] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleFollow = () => {
    setFollowing((prev) => !prev);
    onFollow?.(!following);
  };

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 380,
        maxWidth: "100%",
        position: "relative",
        overflow: "hidden",
        borderRadius: 30,
        color: "#fff",
        fontFamily: "Inter, system-ui, sans-serif",
        background:
          "linear-gradient(145deg, rgba(20,20,32,.98), rgba(7,8,15,.99))",
        border: `1px solid ${
          hovered ? `${accent}80` : "rgba(255,255,255,.09)"
        }`,
        boxShadow: hovered
          ? `0 30px 80px ${accent}25`
          : "0 20px 60px rgba(0,0,0,.35)",
        transform: hovered ? "translateY(-7px)" : "translateY(0)",
        transition: "all 450ms cubic-bezier(.2,.8,.2,1)",
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          width: 180,
          height: 180,
          top: -100,
          right: -60,
          borderRadius: "50%",
          background: accent,
          filter: "blur(80px)",
          opacity: hovered ? 0.25 : 0.12,
          transition: "opacity .4s ease",
          pointerEvents: "none",
        }}
      />

      {/* Cover */}
      <div
        style={{
          height: 145,
          position: "relative",
          overflow: "hidden",
          backgroundImage: `linear-gradient(180deg, transparent 25%, rgba(7,8,15,.95) 100%), url(${coverImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Cover gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(120deg, ${accent}25, transparent 45%, ${secondaryAccent}20)`,
            mixBlendMode: "screen",
          }}
        />

        {/* Profile status */}
        <div
          style={{
            position: "absolute",
            top: 18,
            right: 18,
            display: "flex",
            alignItems: "center",
            gap: 7,
            padding: "7px 11px",
            borderRadius: 999,
            fontSize: 10,
            fontWeight: 800,
            letterSpacing: 0.7,
            background: "rgba(5,5,10,.65)",
            border: "1px solid rgba(255,255,255,.12)",
            backdropFilter: "blur(12px)",
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: online ? "#34d399" : "#64748b",
              boxShadow: online ? "0 0 12px #34d399" : "none",
            }}
          />
          {online ? "ONLINE" : "OFFLINE"}
        </div>
      </div>

      {/* Avatar */}
      <div
        style={{
          position: "absolute",
          top: 92,
          left: 26,
          width: 94,
          height: 94,
          padding: 4,
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${accent}, ${secondaryAccent})`,
          boxShadow: `0 12px 35px ${accent}45`,
          transform: hovered ? "scale(1.05)" : "scale(1)",
          transition: "transform .35s ease",
        }}
      >
        <img
          src={avatar}
          alt={`${name} profile`}
          style={{
            width: "100%",
            height: "100%",
            display: "block",
            objectFit: "cover",
            borderRadius: "50%",
            border: "3px solid #0b0b13",
          }}
        />
      </div>

      {/* Main content */}
      <div style={{ padding: "55px 25px 25px" }}>
        {/* Name + like */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: 25,
                  lineHeight: 1.1,
                  letterSpacing: -0.8,
                  fontWeight: 850,
                }}
              >
                {name}
              </h2>

              {verified && (
                <span
                  title="Verified"
                  style={{
                    width: 20,
                    height: 20,
                    display: "grid",
                    placeItems: "center",
                    borderRadius: "50%",
                    color: "#fff",
                    fontSize: 11,
                    fontWeight: 900,
                    background: `linear-gradient(135deg, ${accent}, ${secondaryAccent})`,
                    boxShadow: `0 4px 15px ${accent}35`,
                  }}
                >
                  ✓
                </span>
              )}
            </div>

            <div
              style={{
                marginTop: 6,
                color: accent,
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              {username}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setLiked((prev) => !prev)}
            aria-label="Like profile"
            style={{
              width: 42,
              height: 42,
              borderRadius: 14,
              border: "1px solid rgba(255,255,255,.08)",
              background: liked
                ? "rgba(244,63,94,.12)"
                : "rgba(255,255,255,.04)",
              color: liked ? "#fb7185" : "#777",
              fontSize: 19,
              cursor: "pointer",
              transition: "all .25s ease",
              transform: liked ? "scale(1.08)" : "scale(1)",
            }}
          >
            {liked ? "♥" : "♡"}
          </button>
        </div>

        {/* Role */}
        <div
          style={{
            marginTop: 10,
            fontSize: 12,
            color: "rgba(255,255,255,.45)",
          }}
        >
          {role}
        </div>

        {/* Bio */}
        <p
          style={{
            margin: "17px 0 15px",
            color: "rgba(255,255,255,.58)",
            fontSize: 13,
            lineHeight: 1.65,
          }}
        >
          {bio}
        </p>

        {/* Location */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
            marginBottom: 22,
            color: "rgba(255,255,255,.38)",
            fontSize: 11,
          }}
        >
          <span style={{ fontSize: 14 }}>⌖</span>
          {location}
        </div>

        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            padding: "15px 5px",
            borderTop: "1px solid rgba(255,255,255,.07)",
            borderBottom: "1px solid rgba(255,255,255,.07)",
          }}
        >
          {[
            ["Followers", followers],
            ["Following", following ? "483" : following],
            ["Projects", projects],
          ].map(([label, value]) => (
            <div
              key={label}
              style={{
                textAlign: "center",
                borderRight:
                  label !== "Projects"
                    ? "1px solid rgba(255,255,255,.07)"
                    : "none",
              }}
            >
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 850,
                }}
              >
                {value}
              </div>

              <div
                style={{
                  marginTop: 4,
                  fontSize: 9,
                  color: "rgba(255,255,255,.32)",
                  textTransform: "uppercase",
                  letterSpacing: 0.7,
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
            marginTop: 20,
          }}
        >
          <button
            type="button"
            onClick={handleFollow}
            style={{
              height: 48,
              border: "none",
              borderRadius: 14,
              cursor: "pointer",
              color: "#fff",
              fontSize: 13,
              fontWeight: 800,
              background: following
                ? "rgba(255,255,255,.07)"
                : `linear-gradient(110deg, ${accent}, ${secondaryAccent})`,
              boxShadow: following ? "none" : `0 10px 25px ${accent}30`,
              transition: "all .25s ease",
            }}
          >
            {following ? "✓ Following" : "+ Follow"}
          </button>

          <button
            type="button"
            onClick={onMessage}
            style={{
              height: 48,
              borderRadius: 14,
              cursor: "pointer",
              color: "#fff",
              fontSize: 13,
              fontWeight: 800,
              background: "rgba(255,255,255,.045)",
              border: "1px solid rgba(255,255,255,.09)",
              transition: "all .25s ease",
            }}
          >
            Message ↗
          </button>
        </div>

        {/* Skills */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 7,
            marginTop: 17,
          }}
        >
          {["React", "UI/UX", "TypeScript", "Creative"].map((skill) => (
            <span
              key={skill}
              style={{
                padding: "6px 9px",
                borderRadius: 8,
                fontSize: 9,
                fontWeight: 700,
                color: "rgba(255,255,255,.48)",
                background: "rgba(255,255,255,.035)",
                border: "1px solid rgba(255,255,255,.055)",
              }}
            >
              #{skill}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};

export { ProfileCard };