const { ObjectId } = require('mongodb');
const {getClient } = require('../config/connectDb');
require('dotenv').config();

const dbName = process.env.DB_NAME;
const collection = process.env.DB_NAME_COLLECTION

const getEventById = async(req,res)=>{
    const {id} = req.query.id;

    const filteredEvents = await getClient().db(dbName).collection(collection).find({id:id}).toArray();
    res.status(200).json({data:filteredEvents});
}

const getEventByType = async(req,res)=>{
    const {type,limit,page} = req.query;

    const limitInt = parseInt(limit,10) || 5;
    const pageInt = parseInt(page,10) || 1;

    const skip = (pageInt-1)*limitInt;

    let searchQuery = {};
    if(type==='latest'){
        searchQuery = {}
    }else{
        searchQuery = {type}
    }

    const filterEvents = await getClient().db(dbName).collection(collection)
        .find(query)
        .sort({schedule:-1})
        .skip(skip)
        .limit(limitInt)
        .toArray();

    const totalEvents = await getClient().db(dbName).collection(collection).countDocuments(searchQuery);

    const totalPages = Math.ceil(totalEvents/limitInt);

    res.status(200).json({msg:'Events filetered successfully',data:filterEvents,pagination:{totalEvents,totalPages,currentPage:pageInt,limit:limitInt}})

}
const createEvent = async(req,res)=>{
    const {name,image,tagline,schedule,description,moderator,category,sub_category,rigor_rank} = req.body;

    const newEvent = {
        type:'event',
        name:name,
        tagline:tagline,
        schedule:new Date(schedule).toString(),
        description:description,
        image:image,
        moderator:moderator,
        category:category,
        sub_category:sub_category,
        rigor_rank:rigor_rank,
    }
    const insertEvent = await getClient().db(dbName).collection(collection).insertOne(newEvent);

    res.status(200).json({msg:'Event created successfully',data:insertEvent});
}
const updateEvent = async(req,res)=>{
    const {id} = req.params;
    
    const {name,image,tagline,schedule,description,moderator,category,sub_category,rigor_rank} = req.body;
    const newData = {
        name,
        tagline,
        schedule: new Date(schedule).toLocaleDateString(),
        description,
        image,
        moderator,
        category,
        sub_category,
        rigor_rank,
    }
    
    const updateResult = await getClient().db(dbName).collection(collection).updateOne({_id:new ObjectId(id)},{$set:newData});
    res.status(200).json({msg:'updated event successfully',data:updateResult})
}
const deleteAnEvent = async(req,res)=>{
    const {id} = req.params;
    const deleteResult = await getClient().db(dbName).collection('events').deleteOne({id});

    res.status(200).json({msg:'Event deleted successfully',data:deleteResult});
}


module.exports = {getEventById,getEventByType,createEvent,updateEvent,deleteAnEvent}