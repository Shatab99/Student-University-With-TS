// /garbage

// let searchTerm = ''
// const query = req.query
// const queryObj = { ...query }

// if (req.query.search) {
//     searchTerm = req.query.search as string
// }

// const searchableFields = ['email', 'name.lastName', 'address.presentAddress']

// const searchOnField = StudentModel.find({
//     $or: searchableFields.map((feild) => ({
//         [feild]: { $regex: searchTerm, $options: 'i' }
//     }))
// })

// // filtering query field

// const excludingFeilds = ['search', 'sort', 'limit','page','fields']

// excludingFeilds.forEach(el => delete queryObj[el])

// let sort = '-createdAt'
// let limit = 10
// let page = 1
// let skip = 0
// let fields = '-__v'

// if (query.limit) {
//     limit = query.limit as unknown as number
// }

// if(query.page){
//     page = Number(query.page);
//     skip = (page-1)*limit
// }

// if (query.sort) {
//     sort = query.sort as string
// }

// if(query.fields){
//     fields = (query.fields as string).split(',').join(" ")
// }

// console.log(fields)

// const result = await searchOnField
//     .find(queryObj)
//     // .populate('semesterId').populate({
//     //     path: "departmentId",
//     //     populate: {
//     //         path: 'facultyId'
//     //     }
//     // })
//     .sort(sort).limit(limit).skip(skip).select(fields);

// res.send(result)