const { default: mongoose } = require("mongoose");

const Connect = () => {
  try {
    const con = mongoose.connect(process.env.MONGO_URL);
    console.log("Deu bom");
  } catch (error) {
    console.log("Deu ruim");
  }
};

module.exports = Connect;
