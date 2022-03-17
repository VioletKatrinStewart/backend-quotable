const pool = require('../utils/pool');

module.exports = class Profile {
  id;
  name;
  quote;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.quote = row.quote;
  }

  static async insert({ username, quote }) {
    const { rows } = await pool.query(
      `
      INSERT INTO
      profiles (username, quote)
      VALUES
      ($1, $2)
      RETURNING
      *
      `,
      [username, quote]
    );
    return new Profile(rows[0]);
  }
};
