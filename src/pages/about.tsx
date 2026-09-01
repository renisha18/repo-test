export function About() {
  return (
    <div className="home-card">
      <img className="home-logo" src="/logo.svg" alt="Relay agent logo" />
      <h1 className="home-title">About Relay</h1>
      <p className="home-blurb">
        Relay is a demo agent that exercises the bug-fix pipeline end to end.
        This page explains what the project is for: it picks up an issue, plans a
        focused change, edits the code, and verifies the result.
      </p>
    </div>
  );
}
