interface GeneralNewModel {
  new_title: string;
  new_text: string;
}

type Comment = {
  comment_text: string;
  creation_date: string;
  user: {
    user_name: string;
  }
}

export interface NewCreateModel extends GeneralNewModel {
  file: File;
  user_id: string;
}

export interface NewGetModel extends GeneralNewModel {
  new_id: string;
  NewComment: Comment[],
  user: {
    user_name: string;
  },
  creation_date: string;
}
