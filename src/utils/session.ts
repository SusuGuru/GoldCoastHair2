export function getSessionId(): string {
  let sessionId = localStorage.getItem("cartSessionId");
  if (!sessionId) {
    sessionId = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    localStorage.setItem("cartSessionId", sessionId);
  }
  return sessionId;
}

export function clearSessionId() {
  localStorage.removeItem("cartSessionId");
}