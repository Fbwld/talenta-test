const {member}= require(`../../models`);

exports.addMember = async(req,res)=>{
    try {
        const data = req.body

        const createdData = await member.create(data);

        res.send({
            status:"success",
            data:{
                createdData
                }
        })
    } catch (error) {
        console.log(error)
        res.send({
            status:"error",
            message: error.message
        })
    }
}

exports.getMembers = async(req,res)=>{
    try {
        let data = await member.findAll({
            attributes:{
                exclude:['createdAt','updatedAt']
            }
        })
        res.send({
            status:"success",
            data:{
                    data
            }
        })
    } catch (error) {
        console.log(error);
        res.send({
            status: error.name,
            message: error.message
        })
    }
}

exports.getMember = async(req,res)=>{
    try {
        const {id} = req.params

        const datamember = await member.findOne({
            where:{
                id:id
            },
            attributes:{
                exclude:['password','createdAt','updatedAt']
            }
        })
        res.send({
            status:"success",
            data:{
                datamember
            }
        })
    } catch (error) {
        res.send({
            status:"error",
            message:"server error"
        })
    }
}

exports.updateMember = async(req, res) => {
    try {
        const id = req.params.id
        const newData = req.body

        await member.update(newData, {
            where: {
                id
            }
        })

        res.send({
            status: "success",
            message: `Update successfull for user with id: ${id}`,
            data: newData
        })
    } catch (error) {
        console.log(error)
        res.send({
            status:"error",
            message: error.message
        })
    }
}

exports.deleteMember = async(req,res)=>{
    try {
        const {id} = req.params

        await member.destroy({
            where:{
                id
            }
        })
        res.send({
            status:'success',
            message:`Delete user id:${id} finished`
        })
    } catch (error) {
        res.send({
            status:"error",
            message: error.message
        })
    }
}
