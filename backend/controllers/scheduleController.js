import Schedule from "../models/schedule.js";

const createSchedule = async (req, res) => {
    console.log("User:", req.user);  // Debugging line
    console.log("Received Data:", req.body); // Debugging line

    const { title, description, startTime, endTime } = req.body;
    if (!title || !startTime || !endTime) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const schedule = await Schedule.create({ user: req.user.id, title, description, startTime, endTime });
    if (!schedule) {
        return res.status(400).json({ message: "Unable to create schedule" });
    }
    res.json(schedule);
};


const getSchedules = async(req,res)=>{
    const userID = req.user.id;
    const schedules = await Schedule.find({user: userID});
    if(!schedules){
        return res.status(400).json({message:"Unable to find any schedules"});
    }
    res.json(schedules); 
}

const deleteSchedule = async(req,res)=>{
    const schedule = await Schedule.findById(req.params.id);
    if(!schedule || schedule.user.toString() != req.user.id){
        return res.status(403).json({ message: "Unauthorized" });
    }

    await schedule.deleteOne();
    res.json({message: "Schedule deleted successfully"});
}

export {createSchedule, getSchedules, deleteSchedule};