export function navigation(path) {
  window.history.pushState({}, '', path);
  const popStateEvent = new PopStateEvent('popstate', { state: {} });
  dispatchEvent(popStateEvent);
}
