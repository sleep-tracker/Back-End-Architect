
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('sleepData').insert([
    {
      user_id: 3,
      sleepDate: "04/22/2019",
      wakeDate: "04/23/2019",
      sleepTime: "11:45 pm",
      wakeTime: "08:20 am",
      moodBefore: 2,
      moodAfter: 3
    },
    {
      user_id: 3,
      sleepDate: "04/23/2019",
      wakeDate: "04/24/2019",
      sleepTime: "11:45 pm",
      wakeTime: "08:20 am",
      moodBefore: 2,
      moodAfter: 2
    },
    {
      user_id: 3,
      sleepDate: "04/24/2019",
      wakeDate: "04/25/2019",
      sleepTime: "11:45 pm",
      wakeTime: "08:20 am",
      moodBefore: 2,
      moodAfter: 4
    },
    {
      user_id: 4,
      sleepDate: "04/10/2019",
      wakeDate: "04/11/2019",
      sleepTime: "11:45 pm",
      wakeTime: "08:20 am",
      moodBefore: 1,
      moodAfter: 3
    }
  ]);
};
