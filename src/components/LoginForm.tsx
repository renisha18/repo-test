export function LoginForm() {
  return (
    <div className="login-card">
      <input className="field" name="email" />
      <input className="field" name="password" type="password" />
      <button className="btn-primary">Log in</button>
    </div>
  );
}
