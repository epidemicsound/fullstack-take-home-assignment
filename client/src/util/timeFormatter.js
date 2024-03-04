function secondsToHumanFriendlyDuration(length) {
  const hours = Math.floor(length / 3600);
  const minutes = Math.floor((length % 3600) / 60);
  const seconds = length % 60;
  const minutesStr = String(minutes).padStart(2, "0");
  const secondsStr = String(seconds).padStart(2, "0");

  if (hours > 0) {
    return `${String(hours)}:${minutesStr}:${secondsStr}`;
  }
  return `${minutesStr}:${secondsStr}`;
}

export { secondsToHumanFriendlyDuration };
