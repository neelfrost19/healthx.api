import staffModel from "../models/staff/staffModel.js";
import mongoose from "mongoose";

export class StaffAggregation {

    static async get(id){
        return staffModel.aggregate([
            {
                $match: {_id: new mongoose.Types.ObjectId(id)}
            },
            {
                $lookup: {
                    from: 'roles',
                    let: {roleId: '$roleId',},
                    pipeline: [
                        {
                            $match: {
                                $expr:
                                    {
                                        $eq: ['$_id', '$$roleId'],
                                    },
                            },
                        },
                    ],
                    as: 'roles',
                },
            }
        ])
    }
}
