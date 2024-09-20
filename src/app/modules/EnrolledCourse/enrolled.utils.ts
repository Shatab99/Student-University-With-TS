export const calculateGrade = (marks : number) => {
    let result = {
        grade: "F",
        gradePoints: 0
    }

    if (marks >= 0 && marks <= 39) {
        result = {
            grade: "F",
            gradePoints: 0
        }
    }
    else if (marks >= 40 && marks <= 49) {
        result = {
            grade: "D",
            gradePoints: 2.00
        }
    }
    else if (marks >= 50 && marks <= 59) {
        result = {
            grade: "C",
            gradePoints: 2.50
        }
    }
    else if (marks >= 60 && marks <= 69) {
        result = {
            grade: "B",
            gradePoints: 3.00
        }
    }
    else if (marks >= 70 && marks <= 79) {
        result = {
            grade: "A",
            gradePoints: 3.00
        }
    }
    else if (marks >= 80 && marks <= 100) {
        result = {
            grade: "A+",
            gradePoints: 3.00
        }
    }
    else{
        result = {
            grade: "NA",
            gradePoints: 0
        }
    }

    return result
}

