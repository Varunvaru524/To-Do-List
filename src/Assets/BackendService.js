const activities = [
  {
    _id: "5b21ca3eeb7f6fbccd471815",
    title: "Cooking",
    timeStamp: '7/1/2023 2:50:49 am',
    description: 'For Family Relatives',
    dueDate:'2023-01-21',
    tags:'Urgent',
    status:'Open'
  },
  {
    _id: "5b21ca3eeb7f6fbccd471816",
    title: "Read Book",
    timeStamp: '23/12/2022 3:50:49 pm',
    description: 'Read Atomic Habits Book',
    dueDate:'2023-01-20',
    tags:'High Priority',
    status:'Working'
  },
  {
    _id: "5b21ca3eeb7f6fbccd471817",
    title: "Gardening",
    timeStamp: '3/6/2021 1:50:49 pm',
    description: 'Watering the plants',
    dueDate:'2023-01-25',
    tags:'Important',
    status:'Done'
  },
  {
    _id: "5b21ca3eeb7f6fbccd471819",
    title: "Gym",
    timeStamp: '17/10/2022 12:50:49 am',
    description: "Leg day",
    dueDate:'2023-01-25',
    tags:'Urgent',
    status:'Over Due'
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181a",
    title: "Movie Night",
    timeStamp: '15/6/2022 10:03:49 am',
    description: 'New Star war episode releasing',
    dueDate:'2023-01-25',
    tags:'Not Important',
    status:'Open'
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181b",
    title: "Yoga",
    timeStamp: '2/3/2022 2:53:49 am',
    description: 'Should attain Yoga class',
    dueDate:'2023-01-25',
    tags:'Meeting',
    status:'Working'
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181e",
    title: "Meditation",
    timeStamp: '30/8/2021 07:53:49 am',
    description: '15 Min of intense peace',
    dueDate:'2023-02-03',
    tags:'Meeting',
    status:'Done'
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181f",
    title: "Painting",
    timeStamp: '5/5/2022 5:34:49 pm',
    description: 'Caz ill be boored',
    dueDate:'2023-02-03',
    tags:'Urgent',
    status:'Over Due'
  },
  {
    _id: "5b21ca3eeb7f6fbccd471821",
    title: "The Avengers",
    timeStamp: '4/2/2022 6:53:49 pm',
    description: 'New Movie Releasing',
    dueDate:'2023-02-01',
    tags:'Not Important',
    status:'Open'
  }
];

export function getActivities() {
  return activities;
}

export function getActivity(id) {
  return activities.find(a => a._id === id);
}

export function saveActivity(activity) {
  let activityInDb = activities.find(m => m._id == activity._id) || {};
  activityInDb.title = activity.title;
  activityInDb.timeStamp = activity.time;
  activityInDb.description = activity.description;
  activityInDb.dueDate = activity.dueDate;
  activityInDb.tags = activity.tag;
  activityInDb.status = activity.status

  if (!activityInDb._id) {
    activityInDb._id = Date.now().toString();
    activities.unshift(activityInDb);
  }

  return activityInDb;
}

export function deleteActivity(id) {
  let activityInDb = activities.find(a => a._id === id);
  activities.splice(activities.indexOf(activityInDb), 1);
  return activityInDb;
}