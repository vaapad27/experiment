var Db = require('./dboperations');
var PhieuDatPhong = require('./phieudatphong');
const dboperations = require('./dboperations');

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);


router.use((request,response,next)=>{
    console.log('middleware');
    next();
})

////lấy dữ liệu tồn tại từ PhieuDatPhong
router.route("/phieudatphong").get((request,response)=>{
    dboperations.datPhong().then(result => {
        response.json(result[0]);
    })
})

//request đặt phòng
router.route('/phieudatphong').post((request, response) => {
    let formData = request.body;
    let phieuDatPhong = new PhieuDatPhong(
        formData.MaPhieu,
        formData.TenKhachHang,
        formData.SDT,
        formData.Email,
        formData.DiaChi,
        formData.SoNguoiLon,
        formData.SoTreEm,
        formData.NgayDenNhan,
        formData.NgayTra,
        formData.MaLoaiPhong,
        formData.MaDichVu,
        formData.GhiChu
    );

    dboperations.addPhieuDatPhong(phieuDatPhong).then(result => {
        response.status(201).json(result);
    });
});


var port = process.env.PORT || 8090;
app.listen(port);
console.log('PhieuDatPhong API is runnning at ' + port);



