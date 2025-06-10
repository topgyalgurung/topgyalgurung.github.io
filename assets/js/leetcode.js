// LeetCode API integration
const LEETCODE_USERNAME = "topgyaltsering3";

class LeetCodeStats {
  static async fetchData() {
    try {
      const response = await fetch(
        `https://leetcode-stats.herokuapp.com/${LEETCODE_USERNAME}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        totalSolved: data.totalSolved || 0,
        easySolved: data.easySolved || 0,
        mediumSolved: data.mediumSolved || 0,
        hardSolved: data.hardSolved || 0,
        acceptanceRate: data.acceptanceRate || 0,
        ranking: data.ranking || 0,
      };
    } catch (error) {
      console.error("Error fetching LeetCode data:", error);
      return {
        totalSolved: 0,
        easySolved: 0,
        mediumSolved: 0,
        hardSolved: 0,
        acceptanceRate: 0,
        ranking: 0,
      };
    }
  }

  static updateStats(data) {
    if (!data) return;

    try {
      // Update the stats with error handling and fallback values
      const elements = {
        "leetcode-total": data.totalSolved,
        "leetcode-easy": data.easySolved,
        "leetcode-medium": data.mediumSolved,
        "leetcode-hard": data.hardSolved,
      };

      for (const [id, value] of Object.entries(elements)) {
        const element = document.getElementById(id);
        if (element) {
          element.textContent = value || 0;
        }
      }
    } catch (error) {
      console.error("Error updating LeetCode stats:", error);
    }
  }
}

export default LeetCodeStats;
