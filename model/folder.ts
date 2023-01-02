// database table: user_folder
// entity class: Folder

export class Folder {
    client_id: number;
    folder_id: number;
    folder_name: string;
    folder_description: string;
    
    constructor(client_id: number, folder_id: number, folder_name: string, folder_description: string) {
        this.client_id = client_id;
        this.folder_id = folder_id;
        this.folder_name = folder_name;
        this.folder_description = folder_description;
    }
}

// module.exports = Folder;
