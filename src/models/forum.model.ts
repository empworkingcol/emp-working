interface GeneralForumModel {
  question_title: string;
}

type Answer = {
  response_text: string;
  creation_date: string;
  user: {
    user_name: string;
  }
}

export interface AnswerForumModel {
  response_text: string;
  user_id: string;
  question_id: string;
}

export interface ForumCreateModel extends GeneralForumModel {
  user_id: string;
  question_text: string;
}

export interface ForumGetModel extends GeneralForumModel {
  question_text: string;
  ForumResponse: Answer[];
  creation_date: string;
}

export interface ForumListModel extends GeneralForumModel {
  creation_date: string;
  question_id: string;
  user: {
    user_name: string;
  }
}
