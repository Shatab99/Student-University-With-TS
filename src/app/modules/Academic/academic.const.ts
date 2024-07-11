export const SemesterName: string[] = ['Autumn', 'Summer', 'Fall']
export const SemesterCode: string[] = ['01', '02', '03']
export const SemesterMonth: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
]


type TsemesterNameCodeMapper ={
    [key : string] : string;
}

export const semesterNameCodeMapper :TsemesterNameCodeMapper = {
    Autumn : "01",
    Summer : "02",
    Fall : "03",
}
