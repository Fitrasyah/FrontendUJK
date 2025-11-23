import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-primary d-grid gap-0 row-gap-3 mb-3">
      <div className="container-fluid">
        <a className="navbar-brand text-white" link ="#">
          Sistem Data Siswa
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-link text-white" aria-current="page" to="/">
              Data Siswa
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}