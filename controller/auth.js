const UserModels = require('../model/users')
const GeofanceModels = require('../model/geofance')
const jwt = require('jsonwebtoken');
const Helper = require('../config/helper')
const geolib = require('geolib');

class AuthControllers {
    constructor() {
        this.UserModels = UserModels;
        this.GeofanceModels = GeofanceModels;
    }

    async login(email, password, lat, long) {

        var centerDB = await this.GeofanceModels.findById(1);
        const center = {latitude: parseFloat(centerDB.latitude), longitude: parseFloat(centerDB.longitude)}
        // const center = {latitude: -7.828136, longitude: 112.0369};

        // const userLocation = { latitude: parseFloat(lat), longitude: parseFloat(long) }; //lokasi asli hp -7.848452 112.048183
        const userLocation = { latitude: -7.848432, longitude: 112.048168 }; //lokasi bebas -7.848432, 112.048168
        
        const radius = parseInt(centerDB.radius);
        if (!geolib.isPointWithinRadius(userLocation, center, radius)) {
            return {
                status: 401,
                message: "Lokasi anda berada diluar jangkaun",
                data: {}
            };
        }

        const listUser = await this.UserModels.findAll();
        var mapListUser = new Map();
       
        for (const value of listUser) {
            mapListUser.set(Helper.CreateCompositeKey(value.email, value.password), value);
        }

        const compositeKey = Helper.CreateCompositeKey(email, password);
        const payload = {
            iss: 'system', // Pihak yang mengeluarkan token
            sub: email, // Subjek dari token (misalnya ID pengguna)
            iat: Math.floor(Date.now() / 1000), // Waktu token dikeluarkan (timestamp dalam detik)
            exp: Math.floor(Date.now() / 1000) + (60 * 60), // Waktu kadaluarsa token (1 jam dari sekarang)
        };
        
        // Secret key untuk enkripsi token (disimpan di server Anda, jangan hardcode di client)
        const secretKey = password;
        
        // Generate token JWT dengan waktu kadaluarsa
        const token = jwt.sign(payload, secretKey);
        if (mapListUser.has(compositeKey)) {
            return {
                status: 200,
                message: "Berhasil melakukan login",
                token: token,
                data: mapListUser.get(compositeKey)
            };
        } else {
            return {
                status: 400,
                message: "Gagal melakukan login dikarena email atau password salah",
                token: "",
                data: {}
            };
        }
    }

    async register(name, email, password, nis, user_class, lat, long) {
        var centerDB = await this.GeofanceModels.findById(1);
        const center = {latitude: parseFloat(centerDB.latitude), longitude: parseFloat(centerDB.longitude)}
        const userLocation = { latitude: parseFloat(lat), longitude: parseFloat(long) };
        const radius = parseInt(centerDB.radius);
        if (!geolib.isPointWithinRadius(userLocation, center, radius)) {
            return {
                status: 401,
                message: "Lokasi anda berada diluar jangkaun",
                data: {}
            };
        }
        
        const listUser = await this.UserModels.findAll();
        var mapListUser = new Map();

        for (const value of listUser) {
            mapListUser.set(value.email, value)
        }

        if (mapListUser.has(email)) {
            return {
                status: 400,
                message: "Gagal melakukan pendaftaran dikarenakan email sudah terdaftar"
            }
        }else {
            var role = "member"
            var access_token = ""

            await this.UserModels.create(name, email, password, nis, user_class, role, access_token)
            return {
                status: 200,
                message: "Berhasil melakukan pendaftaran user baru"
            }
        }
    }
}

module.exports = new AuthControllers();