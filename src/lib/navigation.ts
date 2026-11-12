// Whether the current document has finished its first hydration. Anything
// rendered after that arrived by client-side navigation (a click on a Link),
// not by a fresh page load.
//
// HeaderBar — mounted on every page — flips it in an effect, which runs after
// the first render of every component on the page. So a component that reads
// it while rendering sees `false` on a fresh load (server and hydration agree)
// and `true` when it mounts after a navigation. ProjectTransition uses it to
// play only on in-site navigation, never in front of a visitor landing from
// search.
export const documentState = { hydrated: false };

export function markHydrated() {
  documentState.hydrated = true;
}
