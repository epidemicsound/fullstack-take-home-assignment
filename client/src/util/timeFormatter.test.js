import { secondsToHumanFriendlyDuration } from "./timeFormatter";

describe("secondsToHumanFriendlyDuration", () => {
  test("converts seconds to human-friendly duration", () => {
    // Test case: 1 hour, 15 minutes, and 30 seconds
    expect(secondsToHumanFriendlyDuration(4530)).toBe("1:15:30");

    // Test case: 2 hours, 0 minutes, and 0 seconds
    expect(secondsToHumanFriendlyDuration(7200)).toBe("2:00:00");

    // Test case: 0 hours, 10 minutes, and 0 seconds
    expect(secondsToHumanFriendlyDuration(600)).toBe("10:00");
  });

  test("handles edge cases", () => {
    // Test case: 0 seconds
    expect(secondsToHumanFriendlyDuration(0)).toBe("00:00");

    // Test case: Negative value
    expect(secondsToHumanFriendlyDuration(-100)).toBe(undefined);
  });
});
