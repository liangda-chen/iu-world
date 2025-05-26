import iuProfile from '../assets/iu-profile.jpg';

export default function ResultSection({ score, onRestart }) {
  return (
    <section className="result-section">
      <h2>測驗結果</h2>
      <img src={iuProfile} alt="IU" className="result-image" />
      <div className="score-display">
        你的得分: <span>{score}</span> / 10
      </div>
      <div className="result-message">
        {score >= 8
          ? '你是真正的 Uaena (IU 粉絲)！'
          : score >= 5
          ? '你對 IU 有一定瞭解！'
          : '看來你需要多聽 IU 的歌了！'}
      </div>
      <button onClick={onRestart} className="restart-button">
        再玩一次
      </button>
    </section>
  );
}