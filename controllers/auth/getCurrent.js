const getCurrent = async(req,res)=>{
    const {name, email} = req.user;
    res.send({name:name, email:email});
}

module.exports = getCurrent;