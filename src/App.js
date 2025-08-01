import React, { useState, useEffect } from "react";
import NewsCard from "./components/NewsCard";

function App() {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [sportFilter, setSportFilter] = useState("All");
  const [onlyToday, setOnlyToday] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/news");
      const data = await response.json();
      setNews(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching news:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  useEffect(() => {
    let filtered = news;

    if (sportFilter !== "All") {
      filtered = filtered.filter(item => item.sport === sportFilter);
    }

    if (onlyToday) {
      const today = new Date().toDateString();
      filtered = filtered.filter(
        item => new Date(item.published).toDateString() === today
      );
    }

    if (searchText.trim()) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setFilteredNews(filtered);
  }, [news, sportFilter, onlyToday, searchText]);

  const sportsList = [...new Set(news.map(item => item.sport))].filter(Boolean);

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px", textAlign: "center" }}>
      <h1 style={{ marginBottom: "5px" }}>🎉 Celebrate Sports News Bot</h1>
      <h2 style={{ marginTop: 0 }}>🏟 Sports News Feed</h2>

      <input
        type="text"
        placeholder="🔍 Search news..."
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
        style={{
          padding: "6px 10px",
          margin: "10px 0",
          width: "60%",
          fontSize: "14px",
          borderRadius: "6px",
          border: "1px solid #ccc"
        }}
      />

      <div style={{ marginBottom: "15px" }}>
        <label style={{ marginRight: "10px" }}>Filter by Sport:</label>
        <select
          value={sportFilter}
          onChange={e => setSportFilter(e.target.value)}
          style={{ padding: "5px", marginRight: "20px" }}
        >
          <option value="All">All</option>
          {sportsList.map((sport, idx) => (
            <option key={idx} value={sport}>
              {sport}
            </option>
          ))}
        </select>

        <label>
          <input
            type="checkbox"
            checked={onlyToday}
            onChange={() => setOnlyToday(!onlyToday)}
            style={{ marginRight: "5px" }}
          />
          Show only today's news
        </label>
      </div>

      <div style={{ marginTop: "20px" }}>
        {loading ? (
          <p>Loading...</p>
        ) : filteredNews.length === 0 ? (
          <p>No news found.</p>
        ) : (
          filteredNews.map((item, idx) => <NewsCard key={idx} item={item} />)
        )}
      </div>
    </div>
  );
}

export default App;
