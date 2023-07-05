var config = require('./dbconfig');
const sql = require('mssql');
const PhieuDatPhong = require('./phieudatphong');


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
        let insertRoom = await pool.request()
        .input('MaPhieu', sql.VarChar, phieuDatPhong.MaPhieu)
        .input('TenKhachHang', sql.NVarChar, phieuDatPhong.TenKhachHang)
        .input('SDT', sql.VarChar, phieuDatPhong.SDT)
        .input('Email', sql.VarChar, phieuDatPhong.Email)
        .input('DiaChi', sql.NVarChar, phieuDatPhong.DiaChi)
        .input('SoNguoiLon', sql.TinyInt, phieuDatPhong.SoNguoiLon)
        .input('SoTreEm',sql.TinyInt, phieuDatPhong.SoTreEm)
        .input('NgayDenNhan', sql.Date, phieuDatPhong.NgayDenNhan)
        .input('NgayTra', sql.Date, phieuDatPhong.NgayTra)
        .input('MaLoaiPhong', sql.VarChar, phieuDatPhong.MaLoaiPhong)
        .input('MaDichVu', sql.VarChar, phieuDatPhong.MaDichVu)
        .input('GhiChu', sql.NVarChar, phieuDatPhong.GhiChu)
        .output('RESULT', 'Xảy ra lỗi không xác định')

        .execute('INSERT_PhieuDatPhong')
        return insertRoom.recordsets;

    } catch (error) {
        console.log(error);
    }
}

//export module
module.exports ={
datPhong : datPhong,
addPhieuDatPhong: addPhieuDatPhong
}