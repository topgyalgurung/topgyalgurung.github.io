// HackerRank API integration
const HACKERRANK_USERNAME = "topgyal_gurung71";

class HackerRankStats {
  static async fetchData() {
    try {
      const response = await fetch(
        `https://www.hackerrank.com/rest/hackers/${HACKERRANK_USERNAME}/profile`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Extract relevant data from the response
      return {
        totalSolved: data.totalSolved || 0,
        badges: data.badges || [],
        rank: data.rank || "-",
      };
    } catch (error) {
      console.error("Error fetching HackerRank data:", error);
      // Return default values if the API call fails
      return {
        totalSolved: 0,
        badges: [],
        rank: "-",
      };
    }
  }

  static updateStats(data) {
    if (!data) return;

    try {
      // Update the stats with error handling and fallback values
      const totalElement = document.getElementById("hackerrank-total");
      const badgesElement = document.getElementById("hackerrank-badges");
      const rankElement = document.getElementById("hackerrank-rank");

      if (totalElement) totalElement.textContent = data.totalSolved || 0;
      if (badgesElement) badgesElement.textContent = data.badges?.length || 0;
      if (rankElement) rankElement.textContent = data.rank || "-";
    } catch (error) {
      console.error("Error updating HackerRank stats:", error);
    }
  }
}

export default HackerRankStats;
