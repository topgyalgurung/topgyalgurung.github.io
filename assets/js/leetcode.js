// LeetCode API integration
const LEETCODE_USERNAME = "topgyaltsering3";

class LeetCodeStats {
  static async fetchData() {
    try {
      const response = await fetch(
        `https://leetcode-stats-api.herokuapp.com/${LEETCODE_USERNAME}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching LeetCode data:", error);
      return null;
    }
  }

  static updateStats(data) {
    if (!data) return;

    document.getElementById("leetcode-total").textContent = data.totalSolved;
    document.getElementById("leetcode-easy").textContent = data.easySolved;
    document.getElementById("leetcode-medium").textContent = data.mediumSolved;
    document.getElementById("leetcode-hard").textContent = data.hardSolved;
  }
}

export default LeetCodeStats;
