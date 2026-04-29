import { EntitySchema } from "typeorm";

export const User = new EntitySchema({
  name: "User",
  tableName: "users",

  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },

    name: {
      type: "varchar",
      length: 100,
    },

    username: {
      type: "varchar",
      unique: true,
    },

    email: {
      type: "varchar",
      unique: true,
    },

    password: {
      type: "varchar",
    },

    avatar: {
      type: "text",
      nullable: true,
    },

    createdAt: {
      type: "timestamp",
      createDate: true,
    },

    updatedAt: {
      type: "timestamp",
      updateDate: true,
    },
  },
});
