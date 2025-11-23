import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
// import '../css/global.css'

export default function EditSiswa() {
  const [loading, setLoading] = useState(true);
  const [nama_siswa, setNama] = useState("");
  const [alamat_siswa, setAlamat] = useState("");
  const [tanggal_lahir, setTanggalLahir] = useState("");
  const [jurusan_siswa, setJurusan] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchDataById();
  }, []);

  const fetchDataById = () => {
    axios
      .get(`http://localhost:3000/api/siswa/${id}`)
      .then((response) => {
        console.log(response.data);
        const myData = response.data;
        setNama(myData["nama_siswa"]);
        setAlamat(myData["alamat_siswa"]);
        // Format tanggal untuk input type="date"
        const tanggal = new Date(myData["tanggal_lahir"])
          .toISOString()
          .split("T")[0];
        setTanggalLahir(tanggal);
        setJurusan(myData["jurusan_siswa"]);
      })
      .catch((error) => {
        console.error("Gagal menampilkan data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3000/api/siswa/${id}`, {
        nama_siswa: nama_siswa,
        alamat_siswa: alamat_siswa,
        tanggal_lahir: tanggal_lahir,
        jurusan_siswa: jurusan_siswa,
      })
      .then((response) => {
        console.log(response);
        alert("Data berhasil diupdate");
        navigate("/");
      })
      .catch((error) => {
        console.error("Gagal mengupdate data:", error);
        alert("Gagal mengupdate data");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container-fluid">
        <h2 className="mb-3 mt-3 text-center">Ubah Data Siswa</h2>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleUpdate}>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingName"
                  placeholder="Nama Siswa"
                  value={nama_siswa}
                  onChange={(e) => setNama(e.target.value)}
                  required
                />
                <label htmlFor="floatingName">Nama Siswa</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingAddress"
                  placeholder="Alamat Siswa"
                  value={alamat_siswa}
                  onChange={(e) => setAlamat(e.target.value)}
                  required
                />
                <label htmlFor="floatingAddress">Alamat Siswa</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="date"
                  className="form-control"
                  id="floatingBirth"
                  placeholder="Tanggal Lahir"
                  value={tanggal_lahir}
                  onChange={(e) => setTanggalLahir(e.target.value)}
                  required
                />
                <label htmlFor="floatingBirth">Tanggal Lahir</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingMajor"
                  placeholder="Jurusan Siswa"
                  value={jurusan_siswa}
                  onChange={(e) => setJurusan(e.target.value)}
                  required
                />
                <label htmlFor="floatingMajor">Jurusan Siswa</label>
              </div>

              <button className="btn btn-primary w-100 mb-2">
                Simpan Perubahan
              </button>
              <button
                type="button"
                className="btn btn-secondary w-100"
                onClick={() => navigate("/")}
              >
                Kembali
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}