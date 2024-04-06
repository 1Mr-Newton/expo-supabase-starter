export function formatTime(seconds: number): string {
  const hours: number = Math.floor(seconds / 3600);
  const minutes: number = Math.floor((seconds % 3600) / 60);
  const remainingSeconds: number = seconds % 60;

  const formattedHours: string = hours < 10 ? "0" + hours : hours.toString();
  const formattedMinutes: string =
    minutes < 10 ? "0" + minutes : minutes.toString();
  const formattedSeconds: string =
    remainingSeconds < 10
      ? "0" + remainingSeconds
      : remainingSeconds.toString();

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

export function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
