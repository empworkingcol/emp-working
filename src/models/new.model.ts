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
  img_url: string;
  NewComment: Comment[],
  user: {
    user_name: string;
  },
  creation_date: string;
}

export interface NewCommentModel {
  comment_text: string;
  new_id: string;
  user_id: string;
}
