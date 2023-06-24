const mongoose = require("mongoose");

db = mongoose.connect("mongodb+srv://Cluster80360:TlBcUXBUVkFn@cluster80360.qjxcxce.mongodb.net/test", { useNewUrlParser: true })
    .then(() => { console.log('database connect successful!'); })
    .catch(() => { console.log('database connect failed!'); })
