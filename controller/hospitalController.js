const { Types } = require("mongoose");
const hospitalModel = require("../model/Hospital");
const doctorModel = require("../model/Doctor");

module.exports.getAllDocsList = async (req, res) => {
    try {
        const { tokenData } = req.body;

        const details = await hospitalModel.findById({
            _id: tokenData.hospitalId,
        });
        const doctors = await doctorModel
            .find({
                hospitalId: Types.ObjectId(tokenData.hospitalId),
            })
            .populate("userId", { _id: -1 });

        return res
            .status(200)
            .json({ status: true, data: { details, doctors } });
    } catch (e) {
        const response = e.message || "Internal Server Error!";
        return res.status(400).json({ message: response });
    }
};
