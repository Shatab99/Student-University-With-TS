import { TSchedule } from "./OfferedCourse.interface";



export const hasTimeConflict = (existingSchedule: TSchedule[], newSchedule: TSchedule) => {

    for (const schedule of existingSchedule) {
        const existingStartTime = new Date(`2000-01-10T${schedule.startTime}`)
        const existingEndTime = new Date(`2000-01-10T${schedule.endTime}`)
        const newStartTime = new Date(`2000-01-10T${newSchedule.startTime}`)
        const newEndTime = new Date(`2000-01-10T${newSchedule.endTime}`)

        // 10:30 12:30 e
        // 11:30 1:30 n
        if (newStartTime < existingEndTime && newEndTime > existingStartTime) {
            return true
        }
    }
    return false;
}