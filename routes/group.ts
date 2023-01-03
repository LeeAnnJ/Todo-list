// the routers about group is difined here

import express from 'express';

const router = express.Router();

// import group controller
import * as group_controller from '../controller/groupController';

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
router.post('/updateGroupInfo', group_controller.update_group);

// get tasks of group
router.get('/getTasksByGroupId', group_controller.get_tasks_of_group);

module.exports = router;
