const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
        .catch((err) => next(err))
    }
}

export {asyncHandler};


//if we want to handle async function with async await we can do this
// const asyncHandler = (cb) => async(req, res, next) => {
//     try {
//         await cb(req, res, next)
//     } catch (error) {
//         res.status(400).json({
//             message: "Something went wrong",
//             success: true
//         })
//     }
// }

