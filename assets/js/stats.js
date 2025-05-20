// Main stats management
import LeetCodeStats from "./leetcode.js";
import HackerRankStats from "./hackerrank.js";

class StatsManager {
  static async updateAllStats() {
    const leetcodeData = await LeetCodeStats.fetchData();
    const hackerrankData = await HackerRankStats.fetchData();

    LeetCodeStats.updateStats(leetcodeData);
    HackerRankStats.updateStats(hackerrankData);
  }

  static initialize() {
    // Initial load
    this.updateAllStats();

    // Refresh every 5 minutes
    setInterval(() => this.updateAllStats(), 5 * 60 * 1000);
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  StatsManager.initialize();
});

export default StatsManager;
