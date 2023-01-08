const activities = [
  {
    _id: "5b21ca3eeb7f6fbccd471815",
    title: "Terminator",
    timeStamp: '7/1/2023 2:50:49 am',
    description: 2.5,
    dueDate:'2023-01-21',
    tags:'urgent',
    status:'open'
  },
  {
    _id: "5b21ca3eeb7f6fbccd471816",
    title: "Die Hard",
    timeStamp: '23/12/2022 3:50:49 pm',
    description: 2.5,
    dueDate:'2023-01-20',
    tags:'highPriority',
    status:'working'
  },
  {
    _id: "5b21ca3eeb7f6fbccd471817",
    title: "Get Out",
    timeStamp: '3/6/2021 1:50:49 pm',
    description: 3.5,
    dueDate:'2023-01-25',
    tags:'important',
    status:'done'
  },
  {
    _id: "5b21ca3eeb7f6fbccd471819",
    title: "Trip to Italy",
    timeStamp: '17/10/2022 12:50:49 am',
    description: 3.5,
    dueDate:'2023-01-25',
    tags:'urgent',
    status:'overDue'
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181a",
    title: "Airplane",
    timeStamp: '15/6/2022 10:03:49 am',
    description: 3.5,
    dueDate:'2023-01-25',
    tags:'notImportant',
    status:'open'
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181b",
    title: "Wedding Crashers",
    timeStamp: '02/3/2022 2:53:49 am',
    description: 3.5,
    dueDate:'2023-01-25',
    tags:'meeting',
    status:'working'
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181e",
    title: "Gone Girl",
    timeStamp: '30/8/2021 07:53:49 am',
    description: 4.5,
    dueDate:'2023-02-03',
    tags:'meeting',
    status:'done'
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181f",
    title: "The Sixth Sense",
    timeStamp: '05/5/2022 5:34:49 pm',
    description: 3.5,
    dueDate:'2023-02-03',
    tags:'urgent',
    status:'overDue'
  },
  {
    _id: "5b21ca3eeb7f6fbccd471821",
    title: "The Avengers",
    timeStamp: '4/2/2022 6:53:49 pm',
    description: 3.5,
    dueDate:'2023-02-01',
    tags:'notImportant',
    status:'open'
  }
];

export function getActivities() {
  return activities;
}

export function getActivity(id) {
  return activities.find(a => a._id === id);
}

export function saveActivity(activity) {
  let activityInDb = activity.find(m => m._id === activity._id) || {};
  activityInDb.title = activity.title;
  activityInDb.timeStamp = activity.time;
  activityInDb.description = activity.description;
  activityInDb.dueDate = activity.dueDate;
  activityInDb.tags = activity.tag;
  activityInDb.status = activity.status

  if (!activityInDb._id) {
    activityInDb._id = Date.now();
    activities.push(activityInDb);
  }

  return activityInDb;
}

export function deleteActivity(id) {
  let activityInDb = activities.find(a => a._id === id);
  activities.splice(activities.indexOf(activityInDb), 1);
  return activityInDb;
}
