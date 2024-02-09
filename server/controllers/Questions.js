import Questions from '../models/Questions.js'
import User from '../models/auth.js'
import mongoose from 'mongoose'

export const AskQuestion = async (req,res) => {
    const postQuestionData = req.body;
    const postQuestion = new Questions(postQuestionData);
    console.log(postQuestionData)
    try{
        const data = await User.findById(postQuestionData.userId)
        const sub = data.subscription
        //console.log(sub)
        if(Math.abs(data.quetiontimer - Date.now)>24*60*60*1000){
            await User.findByIdAndUpdate(postQuestionData.userId,{$set:{'quetiontimer':Date.now}})
            if(sub === 0){await User.findByIdAndUpdate(postQuestionData.userId,{$set:{'noOfQuetions':1}})}
            if(sub === 1){await User.findByIdAndUpdate(postQuestionData.userId,{$set:{'noOfQuetions':5}})}
            if(sub === 2){await User.findByIdAndUpdate(postQuestionData.userId,{$set:{'noOfQuetions':1000}})}
        }
        if(data.noOfQuetions>0){
            await User.findByIdAndUpdate(postQuestionData.userId,{$inc:{noOfQuetions:-1}})
            await postQuestion.save();
            const point = await User.findByIdAndUpdate(postQuestionData.userId,{$inc:{point:10}},{new:true})
            res.status(200).json(point)
        }else{
            res.status(200).json('0')
        }
    }catch(error){
        console.log(error)
        res.status(409).json("Couldn't post  new questionm");
    }
}

export const getAllQuestions = async (req,res) =>{
    try{
        const questionList = await Questions.find();
        res.status(200).json(questionList);
    }catch(error){
        res.status(404).json({message: error.message})
    }
}

export const deleteQuestion = async (req,res) => {
    const{id:_id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send("Question Unavailable...")
    }
    try {
        await Questions.findByIdAndRemove(_id);
        res.status(200).json({message: "Sucessfully deleted"})
    } catch (error) {
        res.status(404).json({message : "Error Occurred"})
    }
}

export const voteQuestion = async(req,res) => {
    const {id: _id} = req.params
    const{value,userId} = req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send("Question Unavailable...")
    }
    try {
        const question = await Questions.findById(_id)
        const upIndex = question.upVote.findIndex((id) =>id === String(userId))
        const downIndex = question.downVote.findIndex((id) =>id === String(userId))

        if (value === 'upVote'){
            if(downIndex !== -1){
                question.downVote = question.downVote.filter((id) => id !== String(userId))
            }
            if(upIndex === -1){
                question.upVote.push(userId)
            }else{
                question.upVote.pop(userId)
            }
        }
        else if (value === 'downVote'){
            if(upIndex !== -1){
                question.upVote = question.upVote.filter((id) => id !== String(userId))
            }
            if(downIndex === -1){
                question.downVote.push(userId)
            }else{
                question.downVote.pop(userId)
            }
        }
        await Questions.findByIdAndUpdate(_id,question)
        res.status(200).json({message: "Voted Sucessfully"})

    } catch (error) {
        res.status(404).json({message:"Id not Found"})
    }
}
