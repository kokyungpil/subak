export const dynamic = "force-dynamic";

import { supabase } from "@/lib/supabase";

const boards = [
  "오늘 날씨 좋네요",
  "새로운 만화 추천",
  "웹툰 사이트 추천",
  "재밌는거 공유해요",
  "가입 인사합니다!",
];

const boardTabs = ["자유", "질문", "건의", "공지"];

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
];

type Comic = {
  id: number;
  title: string;
  episode?: string | null;
  emoji?: string | null;
};

function ComicCard({ title, episode, emoji }: Comic) {
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

function LoginBox() {
  return (
    <section className="login-box">
      <button>로그인</button>
      <div>
        <a>회원가입</a>
        <span>|</span>
        <a>정보찾기</a>
      </div>
    </section>
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

  const { data } = await supabase
    .from("comics")
    .select("id,title,episode,emoji")
    .order("id", { ascending: false })
    .limit(30);

  const comics: Comic[] =
    data && data.length > 0
      ? data
      : [
          { id: 1, title: "초능력 학원", episode: "18화", emoji: "⚡" },
          { id: 2, title: "게임 속 전생", episode: "20화", emoji: "🎮" },
          { id: 3, title: "아이돌 프로젝트", episode: "12화", emoji: "🎤" },
          { id: 4, title: "좀비 생존기", episode: "25화", emoji: "🧟" },
          { id: 5, title: "메카 라이즈", episode: "16화", emoji: "🤖" },
          { id: 6, title: "구름 위의 마을", episode: "14화", emoji: "☁️" },
        ];

  return (
    <main className="page">
      <div className="top-info-bar2">
        <a
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
        <a>📖<span>최신화</span></a>
        <a>📚<span>만화목록</span></a>
        <a>💬<span>자유게시판</span></a>
        <a>👥<span>커뮤니티</span></a>
        <a>🖊️<span>만화신청</span></a>
        <a>🎧<span>고객센터</span></a>
        </nav>

        <button className="desktop-login">로그인</button>
        <button className="hamburger">☰</button>
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
            여기가 바로
            <br />
            만화천국 마나수박
          </h1>
          <p>귀여운 이모티콘 썸네일로 시작하는 만화 플랫폼 테스트 페이지</p>
        </div>

        <div className="hero-character">
          <img src="/mascot.png" alt="마나수박 캐릭터" />
        </div>
      </section>

      <div className="mobile-only">
        <LoginBox />
      </div>

      <div className="layout">
        <section className="content">
          <div className="section-title">
            <h2>최신화</h2>
            <span>+ 더보기</span>
          </div>

          <div className="dense-grid">
            {comics.slice(0, 6).map((comic) => (
              <ComicCard key={comic.id} {...comic} />
            ))}
          </div>

          <div className="section-title">
            <h2>만화목록</h2>
            <span>+ 더보기</span>
          </div>

          <div className="dense-grid">
            {comics.slice(0, 12).map((comic) => (
              <ComicCard key={`list-${comic.id}`} {...comic} />
            ))}
          </div>

          <section className="board">
            <div className="section-title small">
              <h2>게시판</h2>
              <span>+ 더보기</span>
            </div>

            <div className="board-tabs">
              {boardTabs.map((tab) => (
                <button key={tab}>{tab}</button>
              ))}
            </div>

            {boards.map((text, index) => (
              <p key={text}>
                {text}
                <span>{index + 5}</span>
              </p>
            ))}
          </section>
        </section>

        <aside className="sidebar">
          <div className="desktop-only">
            <LoginBox />
          </div>

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

          <section className="side-box">
            <h3>최근 본 만화</h3>
            <p>최근 본 만화가 없습니다.</p>
          </section>
        </aside>
      </div>
    </main>
  );
}
