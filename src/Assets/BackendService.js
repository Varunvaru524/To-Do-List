const activities = [
  {
    _id: "5b21ca3eeb7f6fbccd471815",
    title: "Terminator",
    timeStamp: '7/1/2023 2:50:49 am',
    description: 2.5,
    dueDate:'date',
    tags:[],
    status:'open'
  },
  {
    _id: "5b21ca3eeb7f6fbccd471816",
    title: "Die Hard",
    timeStamp: '23/12/2022 3:50:49 pm',
    description: 2.5,
    dueDate:'date',
    tags:[],
    status:'working'
  },
  {
    _id: "5b21ca3eeb7f6fbccd471817",
    title: "Get Out",
    timeStamp: '3/6/2021 1:50:49 pm',
    description: 3.5,
    dueDate:'date',
    tags:[],
    status:'done'
  },
  {
    _id: "5b21ca3eeb7f6fbccd471819",
    title: "Trip to Italy",
    timeStamp: '17/10/2022 12:50:49 am',
    description: 3.5,
    dueDate:'date',
    tags:[],
    status:'overDue'
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181a",
    title: "Airplane",
    timeStamp: '15/6/2022 10:03:49 am',
    description: 3.5,
    dueDate:'date',
    tags:[],
    status:'open'
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181b",
    title: "Wedding Crashers",
    timeStamp: '02/3/2022 2:53:49 am',
    description: 3.5,
    dueDate:'date',
    tags:[],
    status:'working'
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181e",
    title: "Gone Girl",
    timeStamp: '30/8/2021 07:53:49 am',
    description: 4.5,
    dueDate:'date',
    tags:[],
    status:'done'
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181f",
    title: "The Sixth Sense",
    timeStamp: '05/5/2022 5:34:49 pm',
    description: 3.5,
    dueDate:'date',
    tags:[],
    status:'overDue'
  },
  {
    _id: "5b21ca3eeb7f6fbccd471821",
    title: "The Avengers",
    timeStamp: '4/2/2022 6:53:49 pm',
    description: 3.5,
    dueDate:'date',
    tags:[],
    status:'open'
  }
];

export function getActivities() {
  return activities;
}

export function getActivity(id) {
  return activities.find(a => a._id === id);
}

// export function saveMovie(movie) {
//   let movieInDb = movies.find(m => m._id === movie._id) || {};
//   movieInDb.name = movie.name;
//   movieInDb.genre = genresAPI.genres.find(g => g._id === movie.genreId);
//   movieInDb.numberInStock = movie.numberInStock;
//   movieInDb.dailyRentalRate = movie.dailyRentalRate;

//   if (!movieInDb._id) {
//     movieInDb._id = Date.now();
//     movies.push(movieInDb);
//   }

//   return movieInDb;
// }

export function deleteActivity(id) {
  let activityInDb = activities.find(a => a._id === id);
  activities.splice(activities.indexOf(activityInDb), 1);
  return activityInDb;
}
