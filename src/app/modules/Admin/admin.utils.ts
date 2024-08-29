import { AdminModel } from "./admin.model";

export const generateAdminId = async () => {
    const lastAdmin = await AdminModel.findOne({}, { id: 1, _id: 0 }).sort({ createdAt: -1 }).lean()

    const lastAdminID = lastAdmin?.id ? lastAdmin.id : undefined;
    if (!lastAdminID) {
        return "A-0001"
    }
    const newAdminId = "A-" + ((parseInt(lastAdminID.slice(2, 6)) + 1).toString().padStart(4, '0'))
    return newAdminId;
}