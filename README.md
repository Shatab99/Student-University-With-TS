# Student-university Management 


### [Live Link](https://student-university-with-ts.vercel.app/)


## API's Endpoints

### Get me route
**URL**: [/api/v1/users/me]()  
**Method**: `GET`

### Create Course
**URL**: [/api/v1/courses/create-course]()  
**Method**: `POST`

```json 

{
  "title": "Introduction to Programming",
  "prefix": "CS",
  "code": 101,
  "credits": 3
}

```

### Change Status (admin)
**URL**: [/api/v1/admin/update-status/:id]()  
**Method**: `PATCH`

```json 

{
  "status":"blocked"
}

```

### Enroll a course
**URL**: [/api/v1/enrollCourse/create-enroll-course]()  
**Method**: `POST`

```json 

{
  "offeredCourse":"66e1a2f3955615390afd9b0b"
}

```

### Update enrolled Course 
**URL**: [/api/v1/enrollCourse/update-enroll-cours]()  
**Method**: `PATCH`

```json 
{
  "semesterRegistration": "66c1acb4fd8d6d625e61de50",
  "offeredCourse": "66c35b4e2e7f37e8eb47607e",
  "student": "668ab8b0e110fcf37edce601",
  "courseMarks": {
    "classTest1": 8,
    "classTest2": 8,
    "mid": 18,
    "final": 38
  }
}

```

### forget password
**URL**: [/api/v1/auth/forget-password]()  
**Method**: `POST`

```json 
{
  "id":"2025030001"
}

```

### forget password
**URL**: [/api/v1/auth/refresh-token]()  
**Method**: `POST`

### Reset password
**URL**: [/api/v1/auth/reset-password]()  
**Method**: `POST`

```json 
{
  "id":"2025030001"
}

```

### Change password Copy
**URL**: [/api/v1/auth/change-password]()  
**Method**: `POST`

```json 
{
  "oldPassword":"admin1234",
  "password":"admin12345"
}

```

### Get All Semester
**URL**: [/api/v1/academic/all-academic-semesters]()  
**Method**: `GET`

### Log in authentication student
**URL**: [/api/v1/auth/login]()  
**Method**: `POST`

```json 
{
    "id":"2025030001",
  "password":"jdwjdai"
}
```

### Create User (Include form data)
**URL**: [/api/v1/users/create-user]()  
**Method**: `POST`

```json 
{ "password":"password1234", "needsPasswordChange": false, "status":"in-progress", "isDeleted" : false, "student" : { "semesterId":"667da567edb715e91679637b", "departmentId":"6683dff0e828c2fe80e2c190", "name": { "firstName": "Md", "middleName": "Solaman", "lastName": "Chintu" }, "gender":"Male", "dateOfBirth": "2000-01-01", "email": "solaman1@gmail.com", "contactNo": { "studentNumber": "123-456-7890", "emergencyNumber": "098-765-4321" }, "bloodGroup": "O+", "address": { "presentAddress": "1234 Elm Street, Springfield, IL", "permanentAddress": "5678 Oak Avenue, Shelbyville, IL" }, "guardianInfo": { "fatherName": "Robert Doe", "fatherProfession": "Engineer", "motherName": "Jane Doe", "motherProfession": "Doctor" }, "localGuardian": { "Name": "Uncle Ben", "contactNo": "222-333-4444", "address": "789 Pine Road, Capital City, IL" }, "isDeleted": false } }
```


### Create Admin,
**URL**: [/api/v1/users/create-admin]()  
**Method**: `POST`

```json 
{
  "password":"admin1234",
  "needsPasswordChange": false,
  "role": "admin",
  "status": "in-progress",
  "isDeleted": false,
  "admin": {
    "designation": "Principal",
    "name": {
      "firstName": "Md",
      "middleName": "Shahriar",
      "lastName": "Zorina"
    },
    "gender": "Female",
    "dateOfBirth": "2000-01-01",
    "email": "shatabag4749@gmail.com",
    "contactNo": "123-456-7890",
    "emergencyContactNo": "+0987654321",
    "bloodGroup": "O+",
    "presentAddress": "5678 Oak Avenue, Shelbyville, IL",
    "permanentAddress": "456 Secondary Street, City, Country",
    "isDeleted": false
  }
}
```

### Log in  admin,
**URL**: [/api/v1/auth/login]()  
**Method**: `POST`

```json 
{
  "id":"A-0001",
  "password":"adtadwdaw"
}
```

### Update Offered Course
**URL**: [/api/v1/offeredCourse/delete-offered-course/:id]()  
**Method**: `DELETE`

```json 
{
  "faculty": "66817b0b1b66a65afab8b602",
  "maxCapacity": 33,
  "days": [
    "Sun",
    "Fri"
  ]
}
```

### Create an Offered Course
**URL**: [/api/v1/offeredCourse/create-offered-cours]()  
**Method**: `POST`

```json 
{
  "faculty": "66817b0b1b66a65afab8b602",
  "maxCapacity": 33,
  "days": [
    "Sun",
    "Fri"
  ]
}
```

### Update semester registration
**URL**: [/api/v1/semesterReg/update-semester-reg/:id]()  
**Method**: `PATCH`

```json 
{
    "academicSemester": "667da567edb715e91679637b",
    "status": "UPCOMING",
    "startDate": "2024-08-01T00:00:00.000Z",
    "endDate": "2024-12-15T00:00:00.000Z",
    "minCredit": 12,
    "maxCredit": 18
}
```

### Create semester Registration
**URL**: [/api/v1/semesterReg/create-semester-reg]()  
**Method**: `POST`

```json 
{
    "academicSemester": "667da567edb715e91679637b",
    "status": "UPCOMING",
    "startDate": "2024-08-01T00:00:00.000Z",
    "endDate": "2024-12-15T00:00:00.000Z",
    "minCredit": 12,
    "maxCredit": 18
}
```

### Add Remove Faculty
**URL**: [/api/v1/courses/removeFaculty/:id]()  
**Method**: `PUT`

```json 
{
  "faculty" : ["66817b0b1b66a65afab8b602"]
}
```

### Update Course
**URL**: [/api/v1/courses/update/:id]()  
**Method**: `PATCH`

```json 
{
  "preRequisiteCourses": [
    {
      "course": "66bcbe2a9e61318eaf907708",
      "isDeleted": true
    }
  ]
}
```

### Delete Course By ID,
**URL**: [/api/v1/courses/delete-course/:id]()  
**Method**: `DELETE`

### Create Course,
**URL**: [/api/v1/courses/create-course]()  
**Method**: `POST`

```json 
{
  "title": "Hyper Text Markup Language",
  "prefix": "HTML",
  "code": 101,
  "credits": 3,
  "preRequisiteCourses": [
    {
      "course": "66bcbe2a9e61318eaf907708",
      "isDeleted":false
    }
  ]
}
```

### Get Single Student,
**URL**: [/api/v1/students/single-student/:id]()  
**Method**: `GET`

### Update Student
**URL**: [/api/v1/students/update-student/:id]()  
**Method**: `PATCH`

```json 
{
  "student":{
    "guardianInfo":{
      "fatherProfession" : "Narcotic Head"
    }
  }
}
```

### Delete User
**URL**: [/api/v1/users/delete-user/:id]()  
**Method**: `DELETE`

```json 
{
  "student":{
    "guardianInfo":{
      "fatherProfession" : "Narcotic Head"
    }
  }
}
```

### Create deparment
**URL**: [/api/v1/department/create-dept]()  
**Method**: `POST`

```json 
{
  "name":"Deparment of EEE",
  "facultyId" : "66817b0b1b66a65afab8b602"
}
```

### Create Faculty
**URL**: [/api/v1/faculty/create-faculty]()  
**Method**: `POST`

```json 
{
  "name":"Deparment of EEE",
  "facultyId" : "66817b0b1b66a65afab8b602"
}
```

### Create Semester
**URL**: [/api/v1/academic/create-academic-semester]()  
**Method**: `POST`

```json 
{
  "name": "Summer",
  "code": "02",
  "year": "2026",
  "startMonth": "September",
  "endMonth": "December"
}

```

---

Any further question , feel free to contact me 👉
 [Linkedin](https://www.linkedin.com/in/md-shahriar-shatab-489811180/) 
 [Portfolio](https://portfolio-rouge-rho-16.vercel.app/) 
 [Instagram](https://www.instagram.com/_shatab_/) 




