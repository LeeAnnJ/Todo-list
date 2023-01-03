"use strict";
// the routers about group is difined here
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// import group controller
const group_controller = __importStar(require("../controller/groupController"));
// get group by id
router.get('/getGroupById', group_controller.get_group_by_id);
// get groups by user id
router.get('/getGroupsByUserId', group_controller.get_user_groups);
// create group
router.post('/createGroup', group_controller.create_group);
// delete group
router.post('/deleteGroup', group_controller.delete_group);
// get the members of group
router.get('/getMembersByGroupId', group_controller.get_members_of_group);
// add member to group
router.post('/addMemberToGroup', group_controller.add_member_to_group);
// delete member from group
router.post('/deleteMemberFromGroup', group_controller.remove_member_from_group);
// get members of group by group id
router.get('/getMembersByGroupId', group_controller.get_members_of_group);
// update group info
router.post('/updateGroupInfo', group_controller.alert_group_info);
// get tasks of group
router.get('/getTasksByGroupId', group_controller.get_tasks_of_group);
module.exports = router;
