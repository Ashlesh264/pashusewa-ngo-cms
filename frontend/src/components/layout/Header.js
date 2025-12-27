function Header(props) {
  return (
    <header className="header">
      <span>Welcome, <strong>{props.user.full_name}</strong></span>
      <div id="google_translate_element"></div>
      <button onClick={props.onLogout} className="logout-btn">Logout</button>
    </header>
  );
}

export default Header;
