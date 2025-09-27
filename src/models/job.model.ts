interface GeneralJobModel {
  offer_title: string;
}

export interface JobCreateModel extends GeneralJobModel {
  offer_text: string;
  city_id: string;
  user_id: string | undefined;
}

export interface JobGetModel extends GeneralJobModel {
  job_offer_id: string;
  user: {
    user_name: string;
  },
  city: {
    city_name: string;
    country: {
      country_name: string;
    }
  },
  creation_date: string;
  offer_text: string;
}
