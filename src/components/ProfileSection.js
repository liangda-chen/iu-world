import iuProfile from '../assets/iu-profile.jpg';
import iuVideo from '../assets/iu-video.mp4';

export default function ProfileSection({ onStartQuiz }) {
  return (
    <section className="profile-section">
      <h2>IU 簡介</h2>
      <div className="profile-content">
        <img src={iuProfile} alt="IU" className="profile-image" />
        <div className="profile-info">

        <p><strong>李知恩（IU）</strong><br />
        1993年5月16日出生，韓國創作歌手、演員，2008年以《迷兒》出道，憑藉實力派唱功與感性創作深受大眾喜愛，被譽為「國民妹妹」。
        </p>

        <p><strong>代表作品：</strong><br />
        - 音樂：〈Good Day〉、〈Palette〉、〈Blueming〉、〈Love Poem〉、〈LILAC〉、〈eight〉（與防彈少年團 SUGA 合作）<br />
        - 戲劇：〈Dream High〉、〈最佳李純信〉、〈製作人〉、〈月之戀人－步步驚心：麗〉、〈我的大叔〉、〈德魯納酒店〉
        </p>

        <p><strong>綜藝參與：</strong><br />
        - 《孝利家民宿》：展現親民又認真的工作態度<br />
        - 《柳熙烈的寫生簿》：多次登台演唱，並分享創作心得<br />
        - 《無限挑戰》：參與特別企劃演出
        </p>

        <p><strong>成就與影響力：</strong><br />
        - 多次獲得韓國音樂大獎與音源榜冠軍<br />
        - 唱作俱佳，作品常探討成長、孤獨與生活哲理<br />
        - 被譽為「音源女王」、「國民歌手」，影響力遍及亞洲
        </p>
        </div>
      </div>
      <video controls className="profile-video">
        <source src={iuVideo} type="video/mp4" />
        您的瀏覽器不支援影片播放
      </video>
      <button onClick={onStartQuiz} className="start-button">
        開始測驗
      </button>
    </section>
  );
}