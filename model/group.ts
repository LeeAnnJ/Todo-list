// database table: group
// entity class: Group

export class Group {
    group_id: number;
    group_name: string;
    group_description: string;
    group_create_time: Date;
    group_creator: number;
    members_number: number;

    constructor(group_id: number, group_name: string, group_description: string, group_create_time: Date, group_creator: number) {
        this.group_id = group_id;
        this.group_name = group_name;
        this.group_description = group_description;
        this.group_create_time = group_create_time;
        this.group_creator = group_creator;
        this.members_number = 1;
    }

    // get the group_id
    getGroupId(): number {
        return this.group_id;
    }
    
}

// relationship between group and account

export class GroupAccount {   
    group_id: number;
    client_id: number;

    constructor(group_id: number, client_id: number) {
        this.group_id = group_id;
        this.client_id = client_id;
    }
}

// module.exports = { Group, GroupAccount };
