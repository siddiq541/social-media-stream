import { EntitySchema } from "typeorm";

export const Like = new EntitySchema({
  name: "Like",
  tableName: "likes",

  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },

    createdAt: {
      type: "timestamp",
      createDate: true,
    },
  },

  relations: {
    user: {
      type: "many-to-one",
      target: "User",
      joinColumn: true,
      nullable: false,
      onDelete: "CASCADE",
    },

    post: {
      type: "many-to-one",
      target: "Post",
      joinColumn: true,
      nullable: false,
      onDelete: "CASCADE",
    },
  },

  uniques: [
    {
      columns: ["user", "post"],
    },
  ],
});
