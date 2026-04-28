import { supabase } from "@/lib/supabase";

const comicList = [
  "바이바이바이", "하가네와 와카바", "마카츠키 마오", "귀부인 로자",
  "알흔 파기당한 공작", "카사네 전기", "안기고 싶은 여자", "괴물 메이드",
  "남자애가 되어버린", "소원의 아스트라", "이웃집 릴리짱", "하라하라 선생님",
];

const boards = [
  "마붕이들 잠깐만...",
  "다들 5월 휴재 뭐 볼거야?",
  "단편 추천 좀 해줘",
  "요즘 작화 좋은 작품 있음?",
  "이모티콘 썸네일 귀엽다",
];

const weeklyBest = [
  "별빛 헌터 12화",
  "복숭아 기사단 6화",
  "유령 도서관 24화",
  "고양이 탐정 9화",
  "우주 급식실 3화",
  "마법사 인턴 18화",
];

type Comic = {
  id: number;
  title: string;
  episode?: string | null;
  emoji?: string | null;
};

function ComicCard({ title, episode, emoji }: { title: string; episode?: string | null; emoji?: string | null }) {
  return (
    <article className="comic-card">
      <div className="comic-thumb">{emoji || "🍉"}</div>
      <div className="comic-info">
        <span className="new-badge">New</span>
        <h3>{title}</h3>
        {episode && <p>{episode}</p>}
      </div>
    </article>
  );
}

export default async function Home() {

  // 방문자 +1
await supabase.rpc("increment_visitors");

// 현재 방문자수 가져오기
const { data: visitor } = await supabase
  .from("visitors")
  .select("count")
  .eq("id", 1)
  .single();

const visitorCount = visitor?.count ?? 0;
  
  const { data, error } = await supabase
    .from("comics")
    .select("id,title,episode,emoji")
    .order("id", { ascending: false })
    .limit(6);

  const latestComics: Comic[] =
    data && data.length > 0
      ? data
      : [
          { id: 1, title: "별빛 헌터", episode: "12화", emoji: "🌟" },
          { id: 2, title: "복숭아 기사단", episode: "6화", emoji: "🍑" },
          { id: 3, title: "유령 도서관", episode: "24화", emoji: "👻" },
          { id: 4, title: "우주 급식실", episode: "3화", emoji: "🚀" },
          { id: 5, title: "마법사 인턴", episode: "18화", emoji: "🪄" },
          { id: 6, title: "고양이 탐정", episode: "9화", emoji: "🐱" },
        ];

  return (
    <main className="page">
      <header className="topbar">
        <p style={{ marginTop: "10px", fontWeight: "bold" }}>  👀 방문자수: {visitorCount} </p>
        <div className="logo">🍉 마나수박</div>
        <nav>
          <a>최신화</a>
          <a>만화목록</a>
          <a>게시판</a>
          <a>랭킹</a>
        </nav>
        <button>로그인</button>
      </header>

      <section className="hero">
        <div>
          <p className="badge">광고 없는 깔끔한 만화 홈</p>
          <h1>
            작품에만 집중하는
            <br />
            마나수박
          </h1>
          <p>귀여운 이모티콘 썸네일로 시작하는 만화 플랫폼 테스트 페이지</p>
          {error && <p style={{ color: "#ff8a8a" }}>DB 연결 확인 필요</p>}
        </div>
        <div className="hero-emoji">🍉📚✨</div>
      </section>

      <div className="layout">
        <section className="content">
          <div className="section-title">
            <h2>최신화</h2>
            <span>DB 연동 테스트</span>
          </div>

          <div className="latest-grid">
            {latestComics.map((comic) => (
              <ComicCard
                key={comic.id}
                title={comic.title}
                episode={comic.episode}
                emoji={comic.emoji}
              />
            ))}
          </div>

          <div className="board-grid">
            <section className="board">
              <div className="section-title">
                <h2>마나게시판</h2>
                <span>+ 더보기</span>
              </div>
              {boards.map((text) => (
                <p key={text}>🧡 {text}</p>
              ))}
            </section>

            <section className="board">
              <div className="section-title">
                <h2>유머 / 감상</h2>
                <span>+ 더보기</span>
              </div>
              {boards.map((text) => (
                <p key={text}>💬 {text}</p>
              ))}
            </section>
          </div>

          <div className="section-title">
            <h2>만화목록</h2>
            <span>+ 더보기</span>
          </div>

          <div className="comic-list-grid">
            {comicList.map((title, index) => (
              <ComicCard
                key={title}
                title={title}
                episode={`${index + 1}화`}
                emoji={["🐰", "🌸", "🦊", "🐱", "🪄", "🍓"][index % 6]}
              />
            ))}
          </div>
        </section>

        <aside className="sidebar">
          <button className="login-btn">로그인하러 가기</button>

          <section className="side-box">
            <h3>북마크</h3>
            <p>자료가 없습니다.</p>
          </section>

          <section className="side-box">
            <h3>주간 베스트</h3>
            <ol>
              {weeklyBest.map((item, index) => (
                <li key={item}>
                  <span>{index + 1}</span>
                  {item}
                </li>
              ))}
            </ol>
          </section>
        </aside>
      </div>
    </main>
  );
}
