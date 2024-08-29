import catchAsync from "../../Utils/catchAsync.global";
import { UserModel } from "../user/user.model";
import { AdminModel } from "./admin.model";
import { generateAdminId } from "./admin.utils";

const createAdmin = catchAsync(async (req, res) => {
    const body = req.body;
    const { admin, ...userData } = body
    const adminId = await generateAdminId();

    //create user 
    const userResult = await UserModel.create({ id: adminId, ...userData })

    const userInfo = await UserModel.findOne({ id: adminId })

    const adminResult = await AdminModel.create({ id: adminId, user : userInfo?._id , ...admin })


    res.send({ adminResult, userResult })
})

export const AdminController = {
    createAdmin
}