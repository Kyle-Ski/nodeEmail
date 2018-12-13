
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('DELETE FROM "review"; ALTER SEQUENCE review_id_seq RESTART WITH 3;')
    .then(function () {
      // Inserts seed entries
      return knex('review').insert([
        {
          id: 1,
          name: 'Jill Jillison',
          description: `The dogs' value to early human hunter-gatherers led to them quickly becoming ubiquitous across world cultures. Dogs perform many roles for people, such as hunting, herding, pulling loads, protection, assisting police and military, companionship, and, more recently, aiding handicapped individuals. This impact on human society has given them the nickname "man's best friend" in the Western world. In some cultures, however, dogs are also a source of meat.`,
          subject: 'Math',
          rating: 4
      },
      {
          id: 2,
          name: 'Bill Williamson',
          description: `The dogs' value to early human hunter-gatherers led to them quickly becoming ubiquitous across world cultures. Dogs perform many roles for people, such as hunting, herding, pulling loads, protection, assisting police and military, companionship, and, more recently, aiding handicapped individuals. This impact on human society has given them the nickname "man's best friend" in the Western world. In some cultures, however, dogs are also a source of meat.`,
          subject: 'Physics',
          rating: 5
      },
      ]);
    });
};
