import { EntitySchema } from "typeorm";

export const Comment = new EntitySchema({
  name: "Comment",
  tableName: "comments",

  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },

    description: {
      type: "text",
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
});
