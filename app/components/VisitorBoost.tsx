"use client";

import { useEffect, useState } from "react";

const BASE_TOTAL_VISITS = 12840;
const BASE_TODAY_VISITS = 320;

function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

export default function VisitorBoost() {
  const [totalVisits, setTotalVisits] = useState(BASE_TOTAL_VISITS);
  const [todayVisits, setTodayVisits] = useState(BASE_TODAY_VISITS);

  useEffect(() => {
    const todayKey = getTodayKey();
    const savedDate = localStorage.getItem("manasubak-visit-date");
    const savedTotal = Number(localStorage.getItem("manasubak-total-visits") || BASE_TOTAL_VISITS);
    const savedToday = Number(localStorage.getItem("manasubak-today-visits") || BASE_TODAY_VISITS);
    const alreadyVisitedToday = localStorage.getItem(`manasubak-visited-${todayKey}`);

    let nextTotal = savedTotal;
    let nextToday = savedDate === todayKey ? savedToday : BASE_TODAY_VISITS;

    if (!alreadyVisitedToday) {
      nextTotal += 1;
      nextToday += 1;
      localStorage.setItem(`manasubak-visited-${todayKey}`, "true");
    }

    localStorage.setItem("manasubak-visit-date", todayKey);
    localStorage.setItem("manasubak-total-visits", String(nextTotal));
    localStorage.setItem("manasubak-today-visits", String(nextToday));

    setTotalVisits(nextTotal);
    setTodayVisits(nextToday);
  }, []);

  const handleShare = async () => {
    const shareData = {
      title: "마나수박",
      text: "깔끔한 만화 홈, 마나수박에서 최신화를 확인해보세요!",
      url: window.location.href,
    };

    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }

    await navigator.clipboard.writeText(window.location.href);
    alert("링크가 복사됐습니다!");
  };

  return (
    <section className="side-box visitor-box">
      <h3>방문자 현황</h3>
      <div className="visit-stats">
        <div>
          <strong>{totalVisits.toLocaleString()}</strong>
          <span>전체 방문</span>
        </div>
        <div>
          <strong>{todayVisits.toLocaleString()}</strong>
          <span>오늘 방문</span>
        </div>
      </div>
      <button className="share-btn" onClick={handleShare}>친구에게 공유하기</button>
      <p className="visitor-note">공유가 많을수록 방문자가 늘어납니다.</p>
    </section>
  );
}
