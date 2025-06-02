async function searchTracks() {
  const query = document.getElementById("searchInput").value.trim();
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "🔍 Đang tìm...";

  if (!query) {
    resultsDiv.innerHTML = "❌ Vui lòng nhập từ khóa.";
    return;
  }

  try {
    const response = await fetch(`https://api.deezer.com/search?q=${encodeURIComponent(query)}&output=jsonp`, {
      mode: 'no-cors'
    });

    // Deezer dùng JSONP nên fetch thông thường sẽ không parse được
    // Sử dụng JSONP bằng cách tạo <script> tag thủ công:

    const script = document.createElement("script");
    const callbackName = "deezerCallback_" + Date.now();

    window[callbackName] = function (data) {
      if (!data || !data.data || data.data.length === 0) {
        resultsDiv.innerHTML = "❌ Không tìm thấy kết quả.";
        return;
      }

      resultsDiv.innerHTML = "";
      data.data.slice(0, 5).forEach(track => {
        const div = document.createElement("div");
        div.className = "track";
        div.innerHTML = `
          <strong>${track.title}</strong> - ${track.artist.name}<br/>
          <img src="${track.album.cover_medium}" alt="cover"/><br/>
          <audio controls src="${track.preview}"></audio>
        `;
        resultsDiv.appendChild(div);
      });

      delete window[callbackName];
      script.remove();
    };

    script.src = `https://api.deezer.com/search?q=${encodeURIComponent(query)}&output=jsonp&callback=${callbackName}`;
    document.body.appendChild(script);

  } catch (error) {
    resultsDiv.innerHTML = "⚠️ Có lỗi xảy ra khi gọi API.";
    console.error(error);
  }
}
