var config = require('./dbconfig');
const sql = require('mssql');


async function datPhong(){
    try{
        let pool = await sql.connect(config);
        let products = await pool.request().query("SELECT * from PhieuDatPhong");
        return (await products).recordsets;
    }
    catch (error){
        console.log(error);

    }
}


//room booking đến db
async function addPhieuDatPhong(phieuDatPhong) {
    try {
        let pool = await sql.connect(config);
        let query =
            `INSERT INTO PhieuDatPhong (MaPhieu, TenKhachHang, SDT, Email, DiaChi, SoNguoiLon, SoTreEm, NgayDenNhan, NgayTra, MaLoaiPhong, MaDichVu, GhiChu)
            VALUES ('${phieuDatPhong.MaPhieu}', '${phieuDatPhong.TenKhachHang}', '${phieuDatPhong.SDT}', '${phieuDatPhong.Email}', '${phieuDatPhong.DiaChi}',
            '${phieuDatPhong.SoNguoiLon}', '${phieuDatPhong.SoTreEm}', '${phieuDatPhong.NgayDenNhan}', '${phieuDatPhong.NgayTra}', '${phieuDatPhong.MaLoaiPhong}',
            , '${phieuDatPhong.MaDichVu}', '${phieuDatPhong.GhiChu}')`;

        let result = await pool.request().query(query);
        return result;
    } catch (error) {
        console.log(error);
    }
}

//export module
module.exports ={
datPhong : datPhong,
addPhieuDatPhong: addPhieuDatPhong
}