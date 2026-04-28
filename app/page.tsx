-import Image from "next/image";
+const featuredComics = [
+  { title: "별빛 헌터", episode: "신작 12화", emoji: "🌟" },
+  { title: "복숭아 기사단", episode: "신작 6화", emoji: "🍑" },
+  { title: "유령 도서관", episode: "신작 24화", emoji: "👻" },
+  { title: "우주 급식실", episode: "신작 3화", emoji: "🚀" },
+  { title: "마법사 인턴", episode: "신작 18화", emoji: "🪄" },
+  { title: "고양이 탐정", episode: "신작 9화", emoji: "🐱" },
+];
+
+const bestList = [
+  "원피스",
+  "주술회전",
+  "괴수 8호",
+  "스파이 패밀리",
+  "체인소맨",
+  "블루 록",
+];
 
 export default function Home() {
   return (
-    <div style={{color: "white", background: "black", height: "100vh"}}>
-      <h1>🍉 마나수박 오픈</h1>
 <h1>마나수박 오픈🔥</h1>
-      <p>만화 사이트 테스트 중</p>
-         <h1>🍉 승용 안녕  ~~~ </h1>
-       <p>만화 사이트 테스트 중</p>
+    <main className="subak-page">
+      <header className="hero">
+        <div>
+          <p className="hero__badge">🍉 MANASUBAK</p>
+          <h1>광고 없이, 작품에만 집중하는 홈</h1>
+          <p className="hero__desc">
+            상단 배너를 모두 걷어내고 작품 큐레이션 중심으로 더 깔끔하고 고급스럽게 정리했어요.
+          </p>
+        </div>
+        <button className="hero__cta">지금 둘러보기 →</button>
+      </header>
+
+      <section className="section">
+        <div className="section__title-row">
+          <h2>✨ 오늘의 추천</h2>
+          <span>귀여운 이모티콘 카드 버전</span>
+        </div>
+
+        <div className="comic-grid">
+          {featuredComics.map((comic) => (
+            <article className="comic-card" key={comic.title}>
+              <div className="comic-card__emoji" aria-hidden="true">
+                {comic.emoji}
+              </div>
+              <h3>{comic.title}</h3>
+              <p>{comic.episode}</p>
+            </article>
+          ))}
+        </div>
+      </section>
+
+      <section className="section section--split">
+        <article className="panel">
+          <h2>📚 장르 바로가기</h2>
+          <div className="chips">
+            <span>액션</span>
+            <span>판타지</span>
+            <span>로맨스</span>
+            <span>스릴러</span>
+            <span>개그</span>
+            <span>일상</span>
+          </div>
+        </article>
 
-      MIMI   MIMI
-   
-      
-    </div>
+        <aside className="panel">
+          <h2>🔥 주간 베스트</h2>
+          <ol>
+            {bestList.map((item) => (
+              <li key={item}>{item}</li>
+            ))}
+          </ol>
+        </aside>
+      </section>
+    </main>
   );
 }
 
EOF
)
