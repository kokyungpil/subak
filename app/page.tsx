export const dynamic = "force-dynamic";

import { supabase } from "@/lib/supabase";

const boards = [
  "마붕이들 잠깐만...",
  "다들 5월 휴재 뭐 볼거야?",
  "단편 추천 좀 해줘",
  "요즘 작화 좋은 작품 있음?",
  "이모티콘 썸네일 귀엽다",
  "업데이트 오류 제보합니다",
  "재밌는 작품 추천받아요",
  "오늘 올라온 거 뭐 봄?",
];

const boardSections = [
  { title: "마나게시판", icon: "🍉" },
  { title: "유머 / 감상", icon: "💬" },
  { title: "역식자게시판", icon: "📝" },
  { title: "일본게시판", icon: "🇯🇵" },
];

const recentViewed = ["최근 본 만화가 없습니다."];
const weeklyBest = [
  "별빛 헌터 12화",
  "복숭아 기사단 6화",
  "유령 도서관 24화",
  "고양이 탐정 9화",
  "우주 급식실 3화",
  "마법사 인턴 18화",
  "하라하라 선생님",
  "소원의 아스트라",
  "카사네 전기",
  "괴물 메이드",
  "사신의 계약자",
  "용사 재취업",
  "시간 되돌리기",
  "마왕의 하루",
  "천재 마법소녀",
  "학교 괴담",
  "비밀 요리사",
  "로봇 연애",
  "헌터 길드",
  "드래곤 키우기",
];

type Comic = {
  id: number;
  title: string;
  episode?: string | null;
  emoji?: string | null;
};

function ComicCard({ title, episode, emoji }: Comic) {
  return (
    <article className="comic-card compact">
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
  await supabase.rpc("increment_visits");

  const { data: visit } = await supabase
    .from("visits")
    .select("count")
    .eq("id", 1)
    .single();

  const visitCount = visit?.count ?? 0;

  const { data, error } = await supabase
    .from("comics")
    .select("id,title,episode,emoji")
    .order("id", { ascending: false })
    .limit(30);

  const comics: Comic[] =
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
      <div className="top-info-bar2">
        <a
          className="top-info-bar1"
          href="https://open.kakao.com/o/gBTNNssi"
          target="_blank"
          rel="noopener noreferrer"
        >
          💬 오픈채팅 참여하기
        </a>
        <span>방문자수 {visitCount}</span>
      </div>

     <header className="topbar">
  <div className="logo">
    <img src="/logo.png" alt="마나수박" />
  </div>

  <nav className="desktop-nav">
    <a>최신화</a>
    <a>만화목록</a>
    <a>자유게시판</a>
    <a>커뮤니티</a>
    <a>만화신청</a>
    <a>고객센터</a>
  </nav>

  <button className="login-top-btn">로그인</button>
</header>

<nav className="mobile-menu">
  <a>📖<span>최신화</span></a>
  <a>📚<span>만화목록</span></a>
  <a>💬<span>자유게시판</span></a>
  <a>👥<span>커뮤니티</span></a>
  <a>🖊️<span>만화신청</span></a>
  <a>🎧<span>고객센터</span></a>
</nav>

      <section className="hero">
        <div className="hero-text">
          <p className="badge">광고 없는 깔끔한 만화 홈</p>
          <h1>
            여기가 바로 만화천국
            <br />
            마나수박
          </h1>
          <p>귀여운 이모티콘 썸네일로 시작하는 만화 플랫폼 테스트 페이지</p>
          {error && <p style={{ color: "#ff8a8a" }}>DB 연결 확인 필요</p>}
        </div>

        <div className="hero-character">
          <img src="/mascot.png" alt="마나수박 캐릭터" />
        </div>
      </section>

      <div className="layout">
        <section className="content">
          <div className="section-title">
            <h2>최신화</h2>
            <span>+ 더보기</span>
          </div>

          <div className="dense-grid">
            {comics.slice(0, 12).map((comic) => (
              <ComicCard key={comic.id} {...comic} />
            ))}
          </div>

          <div className="board-grid four">
            {boardSections.map((section) => (
              <section className="board mini-board" key={section.title}>
                <div className="section-title small">
                  <h2>{section.title}</h2>
                  <span>+ 더보기</span>
                </div>

                {boards.slice(0, 6).map((text, index) => (
                  <p key={`${section.title}-${text}`}>
                    <b>{section.icon}</b> {text}
                    <span className="reply">+{index + 1}</span>
                  </p>
                ))}
              </section>
            ))}
          </div>

          <div className="section-title">
            <h2>만화목록</h2>
            <span>+ 더보기</span>
          </div>

          <div className="dense-grid">
            {comics.slice(0, 24).map((comic) => (
              <ComicCard key={comic.id} {...comic} />
            ))}
          </div>
        </section>

        <aside className="sidebar">
          <button className="login-btn">로그인하러 가기</button>

          <div className="auth-links">
            <a>회원가입</a>
            <span>|</span>
            <a>정보찾기</a>
          </div>

          <section className="side-box">
            <h3>최근 본 만화</h3>
            {recentViewed.map((item) => (
              <p key={item}>{item}</p>
            ))}
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
