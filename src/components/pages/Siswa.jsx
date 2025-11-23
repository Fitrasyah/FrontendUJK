import { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "bootstrap";
import { useNavigate } from "react-router-dom";

export default function Siswa() {
  const [siswa, setSiswa] = useState([]);
  const [loading, setLoading] = useState(true);
  const [kode_siswa, setKode] = useState("");
  const [nama_siswa, setNama] = useState("");
  const [alamat_siswa, setAlamat] = useState("");
  const [tanggal_lahir, setTanggalLahir] = useState("");
  const [jurusan_siswa, setJurusan] = useState("");
  const navigate = useNavigate();

  const fetchData = () => {
    axios
      .get("http://localhost:3000/api/siswa")
      .then((response) => {
        setSiswa(response.data);
      })
      .catch((error) => {
        console.error("Gagal menampilkan data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/siswa", {
        kode_siswa,
        nama_siswa,
        alamat_siswa,
        tanggal_lahir,
        jurusan_siswa,
      })
      .then(() => {
        setKode("");
        setNama("");
        setAlamat("");
        setTanggalLahir("");
        setJurusan("");
        fetchData();
        alert("Data berhasil ditambahkan");
      })
      .catch((error) => {
        console.error("Gagal menyimpan data:", error);
        alert("Gagal menyimpan data");
      })
      .finally(() => {
        const modalEl = document.getElementById("exampleModal");
        const modalInstance = Modal.getOrCreateInstance(modalEl);
        modalInstance.hide();
      });
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Apakah kamu yakin akan menghapus data ini?"
    );
    if (!confirmDelete) return;

    axios
      .delete(`http://localhost:3000/api/siswa/${id}`)
      .then(() => {
        fetchData();
        alert("Data berhasil dihapus");
      })
      .catch((error) => {
        console.error("Gagal menghapus data:", error);
      });
  };

  const handleEdit = (id) => {
    navigate(`/edit-siswa/${id}`);
  };

  const formatTanggal = (tanggal) => {
    return new Date(tanggal).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-100 px-4">

        <h1 className="mb-3 mt-3 text-center fw-bold">Daftar Siswa</h1>

        <button
          type="button"
          className="btn btn-primary w-100 mb-3"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Tambah Siswa
        </button>

        <div className="table-responsive w-100">
          <table className="table table-striped text-center w-100">
            <thead className="table-info">
              <tr>
                <th>No</th>
                <th>Kode Siswa</th>
                <th>Nama Siswa</th>
                <th>Alamat</th>
                <th>Tanggal Lahir</th>
                <th>Jurusan</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {siswa.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.kode_siswa}</td>
                  <td>{item.nama_siswa}</td>
                  <td>{item.alamat_siswa}</td>
                  <td>{formatTanggal(item.tanggal_lahir)}</td>
                  <td>{item.jurusan_siswa}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(item.kode_siswa)}
                      className="btn btn-warning btn-sm me-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.kode_siswa)}
                      className="btn btn-danger btn-sm"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* Modal Tambah */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h1 className="modal-title fs-5">Tambah Siswa</h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body">
              <form onSubmit={handleSubmit}>

                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Kode"
                    value={kode_siswa}
                    onChange={(e) => setKode(e.target.value)}
                    required
                  />
                  <label>Kode Siswa</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nama"
                    value={nama_siswa}
                    onChange={(e) => setNama(e.target.value)}
                    required
                  />
                  <label>Nama Siswa</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Alamat"
                    value={alamat_siswa}
                    onChange={(e) => setAlamat(e.target.value)}
                    required
                  />
                  <label>Alamat</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="date"
                    className="form-control"
                    value={tanggal_lahir}
                    onChange={(e) => setTanggalLahir(e.target.value)}
                    required
                  />
                  <label>Tanggal Lahir</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Jurusan"
                    value={jurusan_siswa}
                    onChange={(e) => setJurusan(e.target.value)}
                    required
                  />
                  <label>Jurusan</label>
                </div>

                <button className="btn btn-primary w-100">
                  Simpan
                </button>

              </form>
            </div>

            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Tutup
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
